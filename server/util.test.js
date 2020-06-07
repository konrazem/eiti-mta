const converToSchema = require('./util');

test('Testing  deaggreagation of products data.', function () {
  const body = {
    _id: '5edd591fc6677e4eec9a9dcc',
    name: 'Konrad TEST 1',
    price: '21.32',
    currency: 'PLN',
    brand: 'test',
    condition: 'new',
    isSale: 'yes',
    merchant: 'Konrad',
    shipping: 'yes',
    ean: '120983',
    asins: '019298831',
    upc: '192084',
    weight: '12',
    categories: 'nowy',
    dateAdded: '2020-06-09',
    dateUpdated: '2020-06-16',
    keys: 'test',
    manufacturer: 'konrad',
    manufacturerNumber: '1',
    primaryCategories: 'kornad',
    sourceURLs: 'http://example.com'
  };

  const result = {
    id: '5edd591fc6677e4eec9a9dcc',
    prices:
    {
      amountMax: '21.32',
      condition: 'new',
      currency: 'PLN',
      isSale: 'yes',
      merchant: 'Konrad',
      shipping: 'yes',
      sourceURLs: 'http://example.com'
    },
    asins: '019298831',
    brand: 'test',
    categories: undefined,
    dateAdded: '2020-06-09',
    dateUpdated: '2020-06-16',
    ean: '120983',
    imageURLs: undefined,
    keys: 'test',
    manufacturer: 'konrad',
    manufacturerNumber: '1',
    name: 'Konrad TEST 1',
    primaryCategories: 'kornad',
    sourceURLs: 'http://example.com',
    upc: '192084',
    weight: '12'
  };

  expect(converToSchema(body)).toEqual(result);
});