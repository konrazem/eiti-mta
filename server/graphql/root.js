const Products = require('../mongoose/models/Products');
const { group } = require("../mongoose/aggregation");

// The root provides a resolver function for each API endpoint
const root = {
  count: () => {

    const promise_count = Products.aggregate([
      {
        '$group': {
          '_id': '$id'
        }
      }
    ]).count('count').exec();

    return promise_count.then(data => {

      return data[0].count;
    }).catch(err => err) // ??
  },

  product: ({ id }) => {
    // get given product with max price 
    return Products.aggregate([
        group,
        {
            '$match': {
                '_id': id,
            },
        }
    ]).exec();

  },
  products: ({ skip, limit }) => {
    // not required skip and limit
    // here pass token to auth graphql ? https://graphql.org/graphql-js/authentication-and-express-middleware/
    return Products.aggregate([ group, {
      '$sort': {
        'price': 1
      }
    }, {
        '$skip': skip
      }, {
        '$limit': limit
      }
    ]).exec();
  },

};

module.exports = root;