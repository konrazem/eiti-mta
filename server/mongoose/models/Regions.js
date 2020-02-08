const mongoose = require('mongoose');

// define collection structure
const RegionsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    currency: { type: String, required: true }
});

// 'regions' name of mongo collection
const Regions = mongoose.model('regions', RegionsSchema); 

module.exports = Regions;