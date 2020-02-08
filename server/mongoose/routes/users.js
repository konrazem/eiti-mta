const router = require('express').Router();
const Users = require('../models/Users'); //Users model = collection

router.route('/').get((req, res) => {
    Users.find()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json('Error: ', err);
        });
});

module.exports = router;