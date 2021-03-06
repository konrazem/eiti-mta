const Product = require("./mongoose/Product.model");
const { group } = require("./mongoose/aggregation");
const mongoose = require("mongoose");
const router = require("express").Router();
const convertToSchema = require('./util');


router.get("/", (req, res) => {
    res.status(200).json('Get Token Call');
});

// router.get("/token", (req, res) => {
//     // token will be in response header
//     let msg = { success: false };
//     if (req.authInfo) {
//         msg = { success: true };
//     }
//     res.status(200).json(msg);
// });

router.get("/user", (req, res) => {
    // need to return name surname and email
    if (req.authInfo) { 
        res.status(200).json({
            email: req.authInfo.id,
            name: req.authInfo.name.givenName,
            surname: req.authInfo.name.familyName
        });
    } else { 
        res.status(501).json('No auth info given');
        return;
    }
});

router.get("/product/:id", (req, res) => {
    const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Read');
    if (!isAuthorized) {
      res.status(403).json('Forbidden');
      return;
    }


    const id = req.params.id;

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
    const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Create');
    if (!isAuthorized) {
      res.status(403).json('Forbidden');
      return;
    }

    // create id
    const input = req.body.prices ? req.body : convertToSchema(req.body);
    console.log(convertToSchema(req.body));
    input._id = new mongoose.Types.ObjectId();
    input.id = input._id;
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


//The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.
router.put("/product/:id", (req, res) => {
    const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Update');
    if (!isAuthorized) {
      res.status(403).json('Forbidden');
      return;
    }


    const data = req.body.prices ? req.body : convertToSchema(req.body);
    console.log(convertToSchema(req.body));
    const id = req.params.id;
    Product.updateMany({ id }, data,
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
router.delete("/product/:id", (req, res) => {
    const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Delete');
    if (!isAuthorized) {
      res.status(403).json('Forbidden');
      return;
    }

    const id = req.params.id;

    // as there are many products with the same id we need to removeMany by this id
    Product.deleteMany({ id },
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
    const isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Read');
    if (!isAuthorized) {
      res.status(403).json('Forbidden');
      return;
    }

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const promiseCount = Product.aggregate([
        {
            $group: {
                _id: "$id",
            },
        },
    ]).count("count").exec();

    const promiseProducts = Product.aggregate([
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
            $limit: limit, //limit === 0 ? 1 : limit, // MongoError: the limit must be positive
        },
    ]);


    promiseProducts.then((products) => {

        return promiseCount.then( data => {
            let count = 0
            if(data.length) {
                count = data[0].count;
            }
            return { products, count, skip, limit };
        });
    })
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).json(err)
    });
});

module.exports = router;
