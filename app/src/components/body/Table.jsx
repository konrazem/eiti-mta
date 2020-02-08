import React from 'react';
import MUIDataTable from "mui-datatables";
import { UserConsumer } from '../../context';

const Table = props => {

  function getKeys(arr, index = 0) {
    // if arr are iterable array and contains object at index place with keys return this keys if not return empty array
    // NOTE: will set columns by first arr element!
    // check if object (if string can return string letters)
    if (typeof arr[index] === 'object') {
      return Object.keys(arr[index])
    }

    return [];
  }

  function getData(arr) {
    var res = [];

    arr.map((obj, index) => {
      if (typeof obj === 'object') {
        res.push(Object.values(obj));
      } else {
        res.push([]);
      }
    });

    return res;
  }

  const products = props.data.products || []; //if undefined empty array


  const columns = Array.isArray(products) ? getKeys(products) : [];


  const data = Array.isArray(products) ? getData(products) : [[]];




  return (
    <UserConsumer>
      {context => {

        const options = {
          filterType: 'dropdown', //link navigate to product
          rowHover: false,
          responsive: 'scroll',
          downloadOptions: { filename: 'products.csv', separator: ',' },
          textLabels: context.text.table.textLabels
        };

        return (<div>

          <MUIDataTable
            title={context.text.table.title}
            data={data}
            columns={columns}
            options={options}
          />

        </div>)
      }}
    </UserConsumer>
  )
}


export default Table; 