const group = {
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
};

module.exports = { 'group': group }