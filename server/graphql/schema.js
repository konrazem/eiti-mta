const { buildSchema } = require ('graphql');

const schema = buildSchema(`

  type Price {
    amountMax: Float!
    condition: String 
    currency: String
    isSale: String
    merchant: String    
    shipping: String
    sourceURLs: String
  }
 
  
  type Product {
    _id: String
    name: String
    price: Float
    currency: String
    brand: String
    condition: String
    isSale: String
    merchant: String
    shipping: String
    ean: String
    asins: String
    upc: String # The GraphQL specs limit the Integer type size to 32 bits. To be compliant, larger ints have to be treated as floats to prevent errors in query results. However not all upc numbers are float some are string and that cos error!!
    weight: String
    categories: String
    dateAdded: String
    dateUpdated: String
    keys: String
    manufacturer: String
    manufacturerNumber: String
    primaryCategories: String
    sourceURLs: String
  }

  type Region {
    id: String
    name: String
    currency: String
    products: [Product]
  }

  type User { 
    id: ID!
    name: String
    email: String!
    role: String!
  }

  type Query {
    count: Float # if bigger set than 32-bit
    user(id: ID): User
    users: [User]
    product(id: String!): [Product]
    products(skip: Int, limit: Int): [Product]
  }

  type Mutation {
    product(id: ID!): Product!
  }

`);

module.exports = schema;