const Product = require("./mongoose/Product.model");
const { group } = require("./mongoose/aggregation");
const schema = require("./graphql/schema");
const graphqlHTTP = require("express-graphql");
const root = require("./graphql/root");
// const express = require('express');
const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/", (req, res) => {
    const file = require("path").join(__dirname, "index.html");
    res.status(200).sendFile(file);
});

router.get("/token", (req, res) => {
    // token will be in response header
    let msg = { success: false };
    if (req.authInfo) {
        msg = { success: true };
    }
    res.status(200).json(msg);
});

router.get("/user", (req, res) => {
    const info = req.authInfo || {
        id: "jan.kowalski@example.com",
        name: {
            givenName: "Jan",
            familyName: "Kowalski",
        },
    };

    res.status(200).json(info);
});

router.get("/product", (req, res) => {
    const id = req.query.id;

    Product.aggregate([
        group,
        {
            $match: {
                _id: id,
            },
        },
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error: ", err));
});

// create product
router.post("/product", (req, res) => {
    // create id
    let input = req.body;
    input._id = new mongoose.Types.ObjectId();
    input.id = input._id; // input._id;

    const prod = new Product(input);

    prod.save(function (err, data) {
        if (err) {
            res.status(400).json({
                msg: "**Error**   While adding new Product",
                err: err,
            });
        } else {
            res.status(200).json(data);
        }
    });
});

//update product
router.put("/product", (req, res) => {
    Product.updateMany(
        {
            id: req.body.id,
        }, req.body,
        function (err, result) {
            if (err) {
                res.status(400).send(
                    `**Error**  While trying to remove many products with id ${req.body.id}`
                );
            } else {
                res.status(200).json(result);
            }
        }
    );
});

// delete product
router.delete("/product", (req, res) => {
    // as there are many products with the same id we need to removeMany by this id
    Product.deleteMany(
        {
            id: req.body.id 
        },
        function (err, result) {
            if (err) {
                res.status(400).send(
                    `**Error**  While trying to remove many products with id ${req.body.id}`
                );
            } else {
                res.status(200).json(result);
            }
        }
    );
});

router.get("/products", (req, res) => {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 100;

    Product.aggregate([
        group,
        {
            $sort: {
                price: 1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json("Error: ", err));
});

router.use(
    "/graphql",
    graphqlHTTP((req) => {
        return {
            schema: schema,
            rootValue: root,
            graphiql: true,
            customFormatErrorFn: (error) => ({
                message: error.message,
            }),
        };
    })
);

module.exports = router;
