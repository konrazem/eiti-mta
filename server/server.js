/**
 * @author kgrzyb
 * @copyright Politechnika Warszawska 2020
 * 
 * Detect environment. If 'prod' use xsuaa service. 
 * Use cors only for requests to the database with given whitelist!
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const ProductsModel = require('./mongoose/models/Products');
const products = require('./resources/products.json'); // for local testing without database
const mongoose = require('mongoose'); 
const path = require('path');
const schema = require('./graphql/schema');
const root = require('./graphql/root');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec')
const passport = require('passport'); // to use JWTStrategy a plugin to authenticate requests
const bodyParser = require('body-parser');
const cors = require('cors');

// require('dotenv').config() // to load environment vars from .env file like DATABASE_URL



//**************** 
// ENV
//**************** 
const NODE_ENV = process.env.NODE_ENV; // prod or development like in React
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "http://localhost:2701"; // use Atlas db if not localhost
// TODO: add all apps names best - pass object, add xsuaa service name!


// **************
// APP SETTINGS
// **************
const app = express();
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  // app.use( bodyParser() );  // DEPRACTICATED use direct methods like bodyParser.urlencoded() or bodyParser.json() 

const whitelist = [
  "https://eiti-router.cfapps.eu10.hana.ondemand.com/",
  "https://eiti-app-build.cfapps.eu10.hana.ondemand.com/",
  "http://localhost:3000",
  "http://localhost:3001",
  // add itself to white list ??!
  "http://localhost:" + PORT,
  "https://eiti-server.cfapps.eu10.hana.ondemand.com/"
];
const corsOptions = {
  origin: function(origin, callback) {
    // check index of origin in whitelist, if not -1 there is index for origin
    if ((whitelist.indexOf(origin) !== -1 ) || !origin ) {
      // If you do not want to block REST tools or server-to-server requests.
      
      callback(null, true); // if false pause() the socket. null as buffer bytes data?
    } else {
      // there is no such orgin in whitelist 
      callback(new Error(`Konrad origin ${origin} is not allowed by CORS :(`))
    }
  }
}



// *******************************
// MONGO
// *******************************
mongoose.connect( DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 0,
  keepAlive: true
});

//check connection
const conn = mongoose.connection;
conn.on('error', (err) =>  console.log(err) ); // check if URL founded 
conn.on('disconnected', () => console.log('Mongo Disconnected :('));
conn.on('connected', () => console.log('Mongo Connected :)'));




// *******************************
// AUTH
// *******************************
if (NODE_ENV === 'prod') {

  const services = xsenv.getServices({ 
    xsuaa: { 
      name: "eiti-ser-xsuaa"
    } 
  });


  console.log("xsenv services: ", services);
  
  const jwts = new xssec.JWTStrategy( services.xsuaa );
  passport.use(jwts);
  app.use( passport.initialize() );
  app.use( passport.authenticate('JWT',  { session: false }) ); //authenticate() is used as route middleware to authenticate requests. here JWT token?

}





// *******************************
//  API
// *******************************
// default
app.get('/', (req, res) => {
  // requested not by UI app
  const file = path.join(__dirname, './resources/index.html');
  
  res.status(200).sendFile(file);

});

// Return local products do not auth!!
app.get('/api/v1/local/products', (req, res) => {
  res.status(200).json(products);
});



app.get('/api/v1/user', (req, res) => {
  //If JWT token is present in the request and it is successfully verified, following objects are created:
  if (NODE_ENV === 'prod'){

    res.status(200).json(req.authInfo); 
  } else { 
    // trying to get info about user that do not exists
    res.status(400).send('This is development environment');
  }

});

// this REST not GraphQL!
app.get('/api/v1/products', cors(corsOptions), (req, res) => {
  // NOTE: req.query is always defined. If no query given Number({}) => NaN || 0 => 0
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 100;
  // NOTE: check if user have rigths to view products. This is defined in xs-sequrity descriptor of xsuaa service. 
  
  const auth = true
  
  if (NODE_ENV === 'prod') {
    // in case if dev env
    auth = req.authInfo.checkScope('$XSAPPNAME.Display');
  }

  const { group } = require('./mongoose/aggregation');

  if (auth) {
    ProductsModel.aggregate([ group, {
        '$sort': {
          'price': 1
        }
      }, {
        '$skip': skip
      }, {
        '$limit': limit
      }
    ])
    .then(data =>  { 
      res.status(200).json(data)
    }) 
    .catch(err =>  res.status(400).json('Error: ', err));

  } else {
    res.status(403).send('Not authorize');
  }

}); //get('/api/products'


// this is not REST but GraphQl. All methods are in graphql directory
app.use('/api/v1/graphql', cors(corsOptions), graphqlHTTP( req => {

  /**
   * Custom context note: By implementing a custom context building function we access the network request and build  context object, and add currentUser to it. After that resolvers getting called by the GraphQL engine. However by default, the express request is passed as the GraphQL contex. 
   * The 403 header is returned by default when GraphQL requests are not authenticated
   */
  const auth = true
  
  if (NODE_ENV === 'prod') {
    // in case if dev env
    auth = req.authInfo.checkScope('$XSAPPNAME.Display');
  }

  if (auth) { 
    return {
      schema: schema, 
      rootValue: root,
      graphiql: NODE_ENV === 'prod' ? false : true, // do not use graphiql on prod
      customFormatErrorFn: (error) => ({
        message: error.message,
        details: config.isProduction ? null : error.stack
      })
    }

  } else {
    res.status(404).send('Forbidden');

  }
 
})); 




app.listen(PORT, () => console.log(`eiti-router listen on port ${PORT}`))
