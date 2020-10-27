const express = require("express");
const xsenv = require("@sap/xsenv");
const xssec = require("@sap/xssec");
const passport = require("passport"); // to use JWTStrategy a plugin to authenticate requests
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes');

const app = express();
// require("dotenv").config(); // to load environment vars from .env file like DB_URL

 
/**
 * Settings
 */
const corsOptions = {
    origin: function (origin, callback) {
        const whitelist = ["http://localhost:3000", "http://localhost:5000", process.env.WHITE_APP];
        // check index of origin in whitelist, if not -1 there is index for origin
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // If you do not want to block REST tools or server-to-server requests.

            callback(null, true); // if false pause() the socket. null as buffer bytes data?
        } else {
            // there is no such orgin in whitelist
            callback(
                new Error(`Konrad origin ${origin} is not allowed by CORS :(`)
            );
        }
    },
};
app.use(cors(corsOptions));


/**
 * Mongo
 */
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 0,
    keepAlive: true,
}, function(err) {
        if (err) {
            console.log("**Error** while connecting to MongoDB: ", err);
        } else {
            console.log("**Info**  Connected to MongoDB!");
        }
    }
);



/**
 * Auth
 */
const services = xsenv.getServices({
    xsuaa: {
        name: "eiti-ser-xsuaa",
    },
});

console.log("xsenv services: ", services);

const jwts = new xssec.JWTStrategy(services.xsuaa);
passport.use(jwts);
app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false })); //authenticate() is used as route middleware to authenticate requests. here JWT token?



/**
 * Routing
 */

app.use('/', routes);
app.use('/user', routes);
app.use('/token', routes);
app.use('/graphql', routes);
app.use('/product', routes);
app.use('/products', routes);



const PORT = process.env.PORT || '5000';
// const PORT = '5000';
app.listen(PORT, () =>
    console.log(`**Info**  Express server running on port ${PORT}`)
);
