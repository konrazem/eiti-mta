const Products = require('../mongoose/models/Products');

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

  products: ({ skip, limit }) => {

    const { group } = require('../mongoose/aggregation');
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