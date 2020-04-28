const Product = require("../mongoose/Product.model");
const { group } = require('../mongoose/aggregation');

// The root provides a resolver function for each API endpoint
const root = {
    /**************** COUNT ******************* */
    count: () => {
        const promise_count = Product.aggregate([
            {
                $group: {
                    _id: "$id",
                },
            },
        ]).count("count").exec();

        return promise_count
            .then((data) => {
                return data[0].count;
            })
            .catch((err) => err); // ??
    },

    /***************** GET PRODUCT ************** */

    product: ({ id }) => {
        console.log(id);
        // get given product with max price
        return Product.aggregate([
            group,
            {
                $match: {
                    _id: id,
                },
            },
        ]).exec();
    },

    /***************** GET PRODUCTs ************** */
    products: ({ skip, limit }) => {
        // not required skip and limit
        // here pass token to auth graphql ? https://graphql.org/graphql-js/authentication-and-express-middleware/
        return Product.aggregate([
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
        ]).exec();
    },

    /***************** ADD PRODUCT ************** */
    createProduct: ({input}) => {
      var id = require("crypto").randomBytes(10).toString("hex");
      //https://mongoosejs.com/docs/api.html#model_Model-save

      const newProduct = new Product({ ...input, id });

      return newProduct.save({id, input}).exec();

    }

};

module.exports = root;
