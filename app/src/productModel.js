export const settings = [
  {
      type: "text",
      id: "name-input",
      label: "Name",
      defaultValue: "",
      helperText: "Product name",
  },
  {
      type: "text",
      id: "name-price",
      label: "Price",
      defaultValue: "",
      helperText: "Product price",
  },
  {
      type: "text",
      id: "brand-input",
      label: "Brand",
      defaultValue: "",
      helperText: "Product brand",
  },
  {
      type: "text",
      id: "condition-input",
      label: "Condition",
      defaultValue: "",
      helperText:
          "The condition of the product in cases where it is being sold at this price",
  },
  {
      type: "text",
      id: "for-sale-input",
      label: "Is for sale",
      defaultValue: "",
      helperText: "If product is for sale",
  },
  {
      type: "text",
      id: "merchant-input",
      label: "Merchant",
      defaultValue: "",
      helperText:
          "The merchant and/or website selling at this price.",
  },
  {
      type: "text",
      id: "shipping-input",
      label: "Shipping",
      defaultValue: "",
      helperText:
          "The shipping conditions associated with this price.",
  },
  {
      type: "text",
      id: "ean-input",
      label: "EAN",
      defaultValue: "",
      helperText: "",
  },

  {
      type: "text",
      id: "asins-input",
      label: "Asins",
      defaultValue: "",
      helperText:
          "A list of ASINs (Amazon identifiers) used for this price"
  },
  {
      type: "text",
      id: "weight-input",
      label: "Weight",
      defaultValue: "",
      helperText: "",
  },
  {
      type: "text",
      id: "categories-input",
      label: "Categories",
      defaultValue: "",
      helperText:
          "A list of category keywords used for this product in many sources.",
  },
  {
      type: "date",
      id: "date-added-input",
      label: "Date added",
      defaultValue: "",
      helperText:
          "The date this product was added as first to the product database.",
  },
  {
      type: "date",
      id: "date-updated-input",
      label: "Date updated",
      defaultValue: "",
      helperText:
          "The most recent date this product was last updated or viewed by our system.",
  },
  {
      type: "text",
      id: "manufacturer-input",
      label: "Manufacturer",
      defaultValue: "",
      helperText: "The producer of this price."
  },
  {
      type: "text",
      id: "manufacturer-number-input",
      label: "Manufacturer number",
      defaultValue: "",
      helperText: "",
  },
  {
      type: "text",
      id: "primary-categories-input",
      label: "Primary categories",
      defaultValue: "",
      helperText:
          "A list of standardized categories to which this product belongs.",
      margin: "normal.",
  },
  {
      type: "text",
      id: "upc-input",
      label: "UPC",
      defaultValue: "",
      helperText: "",
  },
  {
      type: "text",
      id: "keys-input",
      label: "Keys",
      defaultValue: "",
      helperText:
          "A list of Internal Datafiniti identifiers for this price."
  },
  {
      type: "url",
      id: "urls-input",
      label: "Source URLs",
      defaultValue: "",
      helperText:
          "A list of URLs used to generate data for this price."
  },
];



export const schema = {
    name: "",
    price: "",
    currency: "",
    brand: "",
    condition: "",
    isSale: "",
    merchant: "",
    shipping: "",
    ean: "",
    asins: "",
    upc: "",  
    weight: "",
    categories: "",
    dateAdded: "",
    dateUpdated: "",
    keys: "",
    manufacturer: "",
    manufacturerNumber: "",
    primaryCategories: "",
    sourceURLs: "",
};



export default {  schema,  settings };