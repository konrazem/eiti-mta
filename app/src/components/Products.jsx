import React from "react";
import { getArrOfArrsOfObjsVals } from "../util";
import Loading from "./Loading";
import MUIDataTable from "mui-datatables";
import { gql } from "apollo-boost";

class Products extends React.Component {
    /**
     *Creates an instance of Products.
     * @param {*} props
     * @memberof Products
     */
    constructor(props) {
        super(props);

        this.state = {
            res: {}, // res from graphql products query
            count: 0, // how many products
            err: false,
        };
    }


    /**
     *
     *
     * @memberof Products
     */
    componentDidMount() {
        // we need to set Header to fetch Token first?
        const skip = this.props.match.params.skip;
        const limit = this.props.match.params.limit;

        this.props.client
            .query({
                query: gql`
                    # Definition Schema language DSL
                    {
                        products(skip: ${skip}, limit: ${limit}) {
                            _id
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
                            weight
                            categories
                            dateAdded
                            dateUpdated
                            manufacturer
                            manufacturerNumber
                            primaryCategories
                            upc
                            keys
                            sourceURLs
                        }
                    }
                `,
            })
            .then((products) => {
                this.props.client
                    .query({
                        query: gql`
                            # Definition Schema language DSL
                            {
                                count
                            }
                        `,
                    })
                    .then((count) => {
                        this.setState({
                            res: products,
                            count: count,
                        });
                    });
            })
            .catch((err) => {
                this.setState({ err });
            });
    }

    /**
     *
     *
     * @returns
     * @memberof Products
     */
    render() {
        const { loading, data, networkStatus, rates } = this.state.res;
        const history = this.props.history;

        if (typeof loading === "undefined") {
            return <Loading text="Loading products..." />;
        }

        // we have data. Check if there is any product
        const products = data.products;

        /**
         * Table settings for MUI Datatable
         */
        let table = {
            title: `Products`,
            options: {
                serverSide: false, // Enable remote data source! I do not want to rely on this.
                pagination: true,
                filter: false, // no filter as there are to much data
                filterType: "dropdown", // if filter set to false this has no effect

                rowsPerPage: 50,
                rowsPerPageOptions: [10, 20, 50, 100, 400],

                rowHover: true, // Enable/disable hover style over rows
                responsive: "scroll", // responsive for mobile
                selectableRowsOnClick: false, // most important. Only when false onRowClick is working!
                caseSensitive: true, // Enable/disable case sensitivity for search
                selectableRows: "none", // 'single', 'multiple'
                disableToolbarSelect: false,
                // onRowClick: function (rowData, rowMeta) {
                onRowClick: function (rowData, rowMeta) {
                    // Callback function that triggers when row(s) are selected. DO NOT HAVE EFFECT WHEN selectableRowsOnClick is true
                    // rowMeta: { dataIndex: number, rowIndex: number }
                    // Get ID and navigate to product

                    const ID = rowData[0];
                    console.log("Selected ID: " + ID);
                    history.push("/product/" + ID); // navigate to product page
                },

                // customToolbarSelect: function() {
                //     return <div><button>edit</button></div>
                // }
            },
            rows: [],
            // NOTE: That order must be same as in client.queries. If not then different labels for different data!
            columns: [
                {
                    name: "_id",
                    label: "ID",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "name",
                    label: "Name",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "price",
                    label: "Price",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "currency",
                    label: "Currency",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "brand",
                    label: "Brand",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "condition",
                    label: "Condition",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "isSale",
                    label: "For Sale",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "merchant",
                    label: "Merchant",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "shipping",
                    label: "Shipping",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "ean",
                    label: "EAN",
                    options: {
                        filter: false,
                        sort: true,
                        display: true,
                    },
                },
                {
                    name: "asins",
                    label: "Asins",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "weight",
                    label: "Weight",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "categories",
                    label: "Categories",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "dateAdded",
                    label: "Added Date",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "dateUpdated",
                    label: "Update Date",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "manufacturer",
                    label: "Manufacturer",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },
                {
                    name: "manufacturerNumber",
                    label: "Manufacturer Number",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },

                {
                    name: "primaryCategories",
                    label: "Primary Categories",
                    options: {
                        filter: false,
                        sort: true,
                        display: false,
                    },
                },

                /** SHOW ONLY ON PRODUCT PAGE */
                {
                    name: "upc",
                    label: "UPC",
                    options: {
                        filter: false,
                        sort: true,
                        display: "false",
                        viewColumns: false,
                    },
                },
                {
                    name: "keys",
                    label: "Keys",
                    options: {
                        filter: false,
                        sort: true,
                        display: "false",
                        viewColumns: false,
                    },
                },
                {
                    name: "sourceURLs",
                    label: "URL",
                    options: {
                        filter: false,
                        sort: true,
                        display: "false",
                        viewColumns: false,
                    },
                },
            ],
        };

        table.rows = Array.isArray(products)
            ? getArrOfArrsOfObjsVals(products)
            : [[]];

        return (
            <MUIDataTable
                title={table.title}
                columns={table.columns}
                options={table.options}
                data={table.rows}
            />
        );
    }
}

export default Products;
