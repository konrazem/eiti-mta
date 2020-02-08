const router = require('express').Router();
const ProductsModel = require('../models/Products'); //products model = collection

// @route   GET api/products
// @desc    get first 2 products
router.route('/').get((req, res) => {
    // get paramiters for skip and limit 
    ProductsModel.find({}, null, { limit: 2 })
        .then(data =>  res.json(data))
        .catch(err =>  res.status(400).json('Error: ', err));
});

// search by _id !!! not id in schema
router.route('/:id').get((req, res) => {
    ProductsModel.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete
router.route('/:id').delete((req, res) => {
    ProductsModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
 

module.exports = router;