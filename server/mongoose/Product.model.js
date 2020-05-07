const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Product", Schema({
        _id: Schema.Types.ObjectId,
        id: {
            type: String,
            required: true,
            validate: {
                validator: function (id) {
                    return id.length > 0;
                },
                message: "Empty id is not allowed.",
            },
        },
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
        weight: String,
    })
); 
 