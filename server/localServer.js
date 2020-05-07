const express = require("express");
const mongoose = require("mongoose"); 
const cors = require("cors");
const routes = require('./routes');
const bodyParser = require("body-parser");

require("dotenv").config(); // to load env vars from .env file like DB_URL
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
