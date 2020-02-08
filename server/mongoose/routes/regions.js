const router = require('express').Router();
const Regions = require('../models/Regions'); //regions model = collection

router.route('/').get((req, res) => {
    Regions.find()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json('Error: ', err);
        });
});



module.exports = router;