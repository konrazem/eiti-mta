const router = require('express').Router();
const Products = require('../models/Products'); //products model = collection


// // get users
// app.get('/users', function (req, res) {
//   var isAuthorized = req.authInfo.checkScope('$XSAPPNAME.Display');
//   if (isAuthorized) {
//     res.status(200).json(users);
//   } else {
//     res.status(403).send('Forbidden');
//   }
// });
/**
 * SKIP : 0 LIMIT : 100 
 */
router.route('/').get((req, res) => {
    Products.aggregate([
      {
        '$group': {
          '_id': '$id', 
          'name': {
            '$first': '$name'
          }, 
          'price': {
            '$max': '$prices.amountMax'
          }, 
          'currency': {
            '$first': '$prices.currency'
          }, 
          'brand': {
            '$first': '$brand'
          }, 
          'condition': {
            '$first': '$prices.condition'
          }, 
          'isSale': {
            '$first': '$prices.isSale'
          }, 
          'merchant': {
            '$first': '$prices.merchant'
          }, 
          'shipping': {
            '$first': '$prices.shipping'
          }, 
          'ean': {
            '$first': '$ean'
          }, 
          'asins': {
            '$first': '$asins'
          }, 
          'upc': {
            '$first': '$upc'
          }, 
          'weight': {
            '$first': '$weight'
          }, 
          'cacategories': {
            '$first': '$categories'
          }, 
          'dateAdded': {
            '$first': '$dateAdded'
          }, 
          'dateUpdated': {
            '$first': '$dateUpdated'
          }, 
          'keys': {
            '$first': '$keys'
          }, 
          'manufacturer': {
            '$first': '$manufacturer'
          }, 
          'manufacturerNumber': {
            '$first': '$manufacturerNumber'
          }, 
          'primaryCategories': {
            '$first': '$primaryCategories'
          }, 
          'sourceURLs': {
            '$first': '$prices.sourceURLs'
          }
        }
      }, {
        '$sort': {
          'price': 1
        }
      }, {
        '$skip': 0
      }, {
        '$limit': 12
      }
    ])
    .then(data =>  res.json(data))
    .catch(err =>  res.status(400).json('Error: ', err));
});
 

module.exports = router;