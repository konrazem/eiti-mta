function convertToSchema(data) {
    return {
        "id": data._id,
        "prices": {
            "amountMax": data.price,
            "condition": data.condition,
            "currency": data.currency,
            "isSale": data.isSale,
            "merchant": data.merchant,
            "shipping": data.shipping,
            "sourceURLs": data.sourceURLs
        },
        "asins": data.asins,
        "brand": data.brand,
        "categories": data.categories,
        "dateAdded": data.dateAdded,
        "dateUpdated": data.dateUpdated,
        "ean": data.ean,
        "imageURLs":  data.imageURLs,
        "keys":  data.keys,
        "manufacturer": data.manufacturer,
        "manufacturerNumber": data.manufacturerNumber,
        "name": data.name,
        "primaryCategories": data.primaryCategories,
        "sourceURLs": data.sourceURLs,
        "upc": data.upc,
        "weight": data.weight
    }
}

module.exports = convertToSchema;