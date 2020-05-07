// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';

const userQuery = gql`
  {
    user
  }
`;

// unique products count query 
const countQuery = gql`
  {
    count
  }
`;

const productsQuery = gql(`
   query($skip: Int!, $limit: Int!){
    products(skip: $skip, limit: $limit) {
        name 
        price  
        currency
        brand 
        condition 
        isSale
        merchant
        shipping
        ean 
        asins 
        upc 
        weight  
        cacategories 
        dateAdded 
        dateUpdated 
        keys 
        manufacturer 
        manufacturerNumber 
        primaryCategories 
        sourceURLs
      }
   }
`)





export  { userQuery, countQuery, productsQuery };