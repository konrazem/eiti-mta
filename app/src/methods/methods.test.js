import { setColumnsOptions } from './methods';

const filters = [{
    label: "Modified Name",
    name: "Name",
    options: {
      filter: true,
    },
  },
  {
    name: "Title",
    options: {
      filter: true,
    },
  },
  {
    name: "Location",
    options: {
      filter: true,
    },
  },
  {
    name: "Age",
    options: {
      filter: true,
    },
  },
  {
    name: "Salary",
    options: {
      filter: true,
    },
  }
];

const columns = ["Name", "Title", "Location", "Age", "Salary"];

test("setColumnsOptions test...", () => {
    expect(setColumnsOptions(columns, filters)).toStrictEqual(filters);
});

