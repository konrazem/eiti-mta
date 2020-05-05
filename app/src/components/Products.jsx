import React from "react";
import Loading from "./Loading";
import Settings from "./Settings";
import InfoPage from "./InfoPage";
import MUIDataTable from "mui-datatables";
import columns from '../columns';
import { Grid } from "@material-ui/core";

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            error: false
        };
    }

    componentDidMount() {
        // make error proof on url
        let skip = parseInt(this.props.match.params.skip);
        let limit = parseInt(this.props.match.params.limit);
        if (isNaN(skip) || isNaN(limit)) {
            this.setState({ error: true });
        } else {
            const host = 'http://localhost:5000';
            fetch(`${host}/products?skip=${skip}&limit=${limit}`)
                .then(res => {
                    if (!res.ok) {
                        this.setState({ error: true });
                    } else {
                        return res.json()
                    }
                })
                .then(data => {
                    this.setState({ data })
                })
                .catch(err => {
                    this.setState({ error: true });
                })
        }
    }

    render() {

        if (this.state.error) {
            return <InfoPage text="Error while loading products. Possible reason: server is not running / skip and limit must be a number and limit > 0. Please check URL or contact with developer." />
        }
        if (!this.state.data) {
            return <Loading text="Loading products..." />;
        }


        const { skip, limit, count, products } = this.state.data;
        let table = {
            title: `Products(${count})`,
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
                    window.location = "/product/" + rowData[0]; // navigate to product page
                },

                // customToolbar: function() {
                //     // add extra elements to the Toobar and not replace it!
                //     return <Settings skip={skip} limit={limit} />
                // }
                // customToolbarSelect: function() {
                //     return <Button />
                // }
            },
            rows: Array.isArray(products) && products,
            // NOTE: That order must be same as in client.queries. If not then different labels for different data!
            columns: columns,
        };
        // show Settings tool only when count is grater then 
        const LATENCY_FACTOR = 200;
        const settings = count > LATENCY_FACTOR ? <Settings skip={skip} limit={limit} count={count} /> : null;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    {settings}
                </Grid>
                <Grid item xs={12} md={12}>
                    <MUIDataTable
                        title={table.title}
                        columns={table.columns}
                        options={table.options}
                        data={table.rows}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Products;
