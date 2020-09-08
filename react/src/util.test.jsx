import React from 'react';
import util from './util';

test("Check if form settings are extracted from products array.", () => {
  const product = {
    "_id": "AVpgakmD1cnluZ0-1KHz",
    "name": "Sunpak - Universal Travel Power Adapter for Select Electronic Devices - White",
    "price": 12.99,
    "currency": "USD",
    "brand": "Sunpak",
    "condition": "new",
    "isSale": "FALSE",
    "merchant": "Bestbuy.com",
    "shipping": "",
    "ean": "",
    "asins": "B000JC5T82",
    "upc": 90729130492,
    "weight": "2.1 pounds",
    "cacategories": "Camera Chargers & Adapters,Travel Accessories,Digital Camera Accessories,Chargers,Cell Phones,Luggage,Cell Phone Accessories,Camera Batteries & Power,Mobile,Travel Adapters Transformers,Cameras & Camcorders,Accessories,Power Accessories,Best Buy,Home",
    "dateAdded": "2015-10-17T19:18:38Z",
    "dateUpdated": "2018-06-13T20:13:04Z",
    "keys": "sunpak/traveladapt,090729130492,universalpoweradapterwhite/suutvladpt,universalpoweradapterwhite/400982907933,universalpoweradapterwhite/b000jc5t82,sunpakuniversaltravelpoweradapterforselectelectronicdeviceswhite/8870923,universalpoweradapterwhite/8870923",
    "manufacturer": "Sunpak",
    "manufacturerNumber": "TRAVEL-ADAPT",
    "primaryCategories": "Electronics",
    "sourceURLs": "https://www.bestbuy.com/site/sunpak-universal-travel-power-adapter-for-select-electronic-devices-white/8870923.p%253FskuId%253D8870923"
  };

  expect(util.genSettings(product)).toEqual([
    {
      "defaultValue": "AVpgakmD1cnluZ0-1KHz",
      "label": "_id",
      "id": "_id",
      "type": "text"
    },
    {
      "defaultValue": "Sunpak - Universal Travel Power Adapter for Select Electronic Devices - White",
      "label": "name",
      "id": "name",
      "type": "text"
    },
    {
      "defaultValue": 12.99,
      "label": "price",
      "id": "price",
      "type": "text"
    },
    {
      "defaultValue": "USD",
      "label": "currency",
      "id": "currency",
      "type": "text"
    },
    {
      "defaultValue": "Sunpak",
      "label": "brand",
      "id": "brand",
      "type": "text"
    },
    {
      "defaultValue": "new",
      "label": "condition",
      "id": "condition",
      "type": "text"
    },
    {
      "defaultValue": "FALSE",
      "label": "isSale",
      "id": "isSale",
      "type": "text"
    },
    {
      "defaultValue": "Bestbuy.com",
      "label": "merchant",
      "id": "merchant",
      "type": "text"
    },
    {
      "defaultValue": "",
      "label": "shipping",
      "id": "shipping",
      "type": "text"
    },
    {
      "defaultValue": "",
      "label": "ean",
      "id": "ean",
      "type": "text"
    },
    {
      "defaultValue": "B000JC5T82",
      "label": "asins",
      "id": "asins",
      "type": "text"
    },
    {
      "defaultValue": 90729130492,
      "label": "upc",
      "id": "upc",
      "type": "text"
    },
    {
      "defaultValue": "2.1 pounds",
      "label": "weight",
      "id": "weight",
      "type": "text"
    },
    {
      "defaultValue": "Camera Chargers & Adapters,Travel Accessories,Digital Camera Accessories,Chargers,Cell Phones,Luggage,Cell Phone Accessories,Camera Batteries & Power,Mobile,Travel Adapters Transformers,Cameras & Camcorders,Accessories,Power Accessories,Best Buy,Home",
      "label": "cacategories",
      "id": "cacategories",
      "type": "text"
    },
    {
      "defaultValue": "2015-10-17",
      "label": "dateAdded",
      "id": "dateAdded",
      "type": "date"
    },
    {
      "defaultValue": "2018-06-13",
      "label": "dateUpdated",
      "id": "dateUpdated",
      "type": "date"
    },
    {
      "defaultValue": "sunpak/traveladapt,090729130492,universalpoweradapterwhite/suutvladpt,universalpoweradapterwhite/400982907933,universalpoweradapterwhite/b000jc5t82,sunpakuniversaltravelpoweradapterforselectelectronicdeviceswhite/8870923,universalpoweradapterwhite/8870923",
      "label": "keys",
      "id": "keys",
      "type": "text"
    },
    {
      "defaultValue": "Sunpak",
      "label": "manufacturer",
      "id": "manufacturer",
      "type": "text"
    },
    {
      "defaultValue": "TRAVEL-ADAPT",
      "label": "manufacturerNumber",
      "id": "manufacturerNumber",
      "type": "text"
    },
    {
      "defaultValue": "Electronics",
      "label": "primaryCategories",
      "id": "primaryCategories",
      "type": "text"
    },
    {
      "defaultValue": "https://www.bestbuy.com/site/sunpak-universal-travel-power-adapter-for-select-electronic-devices-white/8870923.p%253FskuId%253D8870923",
      "label": "sourceURLs",
      "id": "sourceURLs",
      "type": "text"
    }
  ]);
});

test("Check if data are extracted from form inputs.", function () {
  const ele1 = <input aria-invalid="false" id="_id" name="_id" type="text" class="MuiInputBase-input MuiInput-input" value="AVpgakmD1cnluZ0-1KHz"></input>;
  const ele2 = <input aria-invalid="false" id="name" name="name" type="text" class="MuiInputBase-input MuiInput-input" value="Sunpak - Universal Travel Power Adapter for Select Electronic Devices - Black"></input>;

  const product = {
    "_id": "AVpgakmD1cnluZ0-1KHz",
    "name": "Sunpak - Universal Travel Power Adapter for Select Electronic Devices - Black"
  };

  expect(util.getResult([ele1, ele2], product)).toEqual({
    "_id": "AVpgakmD1cnluZ0-1KHz",
    "name": "Sunpak - Universal Travel Power Adapter for Select Electronic Devices - Black"
  });
});

test("Test if the product is fetched correctly", () => {
  return util.fetchProduct("AVpe9FXeLJeJML43zHrq")
    .then(data => {
      console.log(data);
      expect(data[0]._id).toBe("AVpe9FXeLJeJML43zHrq");
    });
});




test("Test if the products is removed correctly", () => {
  // here check if there is product to delete
  return util.deleteProduct("AV2Z1Efc-jtxr-f39lm6")
    .then(res => {
      console.log(res);
      expect(res.status).toBe(200);
    });
});



test("Test if the products is added correctly", () => {

  const data = {
    "_id": 'abc_' + Math.random().toString(36).substr(2, 9),
    "name": "Portable Bluetooth Wireless Speaker, Blue",
    "price": "24.99",
    "currency": "USD",
    "brand": "iLive",
    "condition": "New",
    "isSale": "TRUE",
    "merchant": "Walmart.com",
    "shipping": "Expedited",
    "ean": "",
    "asins": "B00GTFHUIU,B00XIMSU9A",
    "upc": "47323023217",
    "weight": "7.2 ounces",
    "cacategories": "Smart Home,Smart Electronics,Bluetooth Speakers,Electronics,Home Audio & Theater,Home Audio,All Home Speakers,Speaker Systems,Audio,Bluetooth & Wireless Speakers,Stereos",
    "dateAdded": "2015-10-17",
    "dateUpdated": "2018-02-27",
    "keys": "portablebluetoothwirelessspeakerred/b00ximsu9a,portablebluetoothwirelessspeakerred/5370196,portablebluetoothwirelessspeakerred/b00gtfhuiu,iliveblue/isb23r,portablebluetoothwirelessspeakerred/552707200,047323023217,ilive/isb23r",
    "manufacturer": "Ilive Blue",
    "manufacturerNumber": "ISB23R",
    "primaryCategories": "Electronics",
    "sourceURLs": "https://www.walmart.com/ip/iLive-ISB23R-Speaker-System-Battery-Rechargeable-Wireless-Speaker-s-Red/36907837"
  };

  return util.createProduct(data)
    .then(res => {
      console.log(res);
      expect(res.status).toBe(200);
    });
});

test("Test if the products is updated correctly", () => {
  const data = {
    "_id": "AVpe9FXeLJeJML43zHrq",
    "name": "Portable Bluetooth Wireless Speaker, Blue",
    "price": "24.99",
    "currency": "PLN",
    "brand": "iLive",
    "condition": "New",
    "isSale": "TRUE",
    "merchant": "Walmart.com",
    "shipping": "Expedited",
    "ean": "",
    "asins": "B00GTFHUIU,B00XIMSU9A",
    "upc": "47323023217",
    "weight": "7.2 ounces",
    "cacategories": "Smart Home,Smart Electronics,Bluetooth Speakers,Electronics,Home Audio & Theater,Home Audio,All Home Speakers,Speaker Systems,Audio,Bluetooth & Wireless Speakers,Stereos",
    "dateAdded": "2015-10-17",
    "dateUpdated": "2018-02-27",
    "keys": "portablebluetoothwirelessspeakerred/b00ximsu9a,portablebluetoothwirelessspeakerred/5370196,portablebluetoothwirelessspeakerred/b00gtfhuiu,iliveblue/isb23r,portablebluetoothwirelessspeakerred/552707200,047323023217,ilive/isb23r",
    "manufacturer": "Ilive Blue",
    "manufacturerNumber": "ISB23R",
    "primaryCategories": "Electronics",
    "sourceURLs": "https://www.walmart.com/ip/iLive-ISB23R-Speaker-System-Battery-Rechargeable-Wireless-Speaker-s-Red/36907837"
  };

  return util.updateProduct(data)
    .then(res => {
      expect(res.status).toBe(200);
    });
});