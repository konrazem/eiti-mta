const mongoose = require('mongoose');

/**
 * Model of all data for analysis
 */
const ProductsSchema = new mongoose.Schema({
    id: String,
    prices: {
        amountMax: { type: Number, required: true },
        condition: String,
        currency: String,
        isSale: String,
        merchant: String,
        shipping: String,
        sourceURLs: String,
    },
    asins: String,
    brand: String,
    categories: String,
    dateAdded: String,
    dateUpdated: String,
    ean: String,
    imageURLs: String,
    keys: String,
    manufacturer: String,
    manufacturerNumber: String,
    name: String,
    primaryCategories: String,
    sourceURLs: String,
    upc: Number,
    weight: String
}, {
    timestamps: { createdAt: 'dateUpdated' }
});

const ProductsModel = mongoose.model('products', ProductsSchema); 
module.exports = ProductsModel;
 