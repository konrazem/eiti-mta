import React from "react";
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import { gql } from "apollo-boost";
import {
    List,
    ListItem,
    Grid,
    ListItemText,
    Typography,
} from "@material-ui/core";




/**
 * @class Product
 * @extends {React.Component}
 * @description 
 */
class Product extends React.Component {
    /**
     *Creates an instance of Products.
     * @param {*} props
     * @memberof Product
     */
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            res: {}, // loaded is in res
            error: false,
        };
    }


    /**
     * @name componentDidMount
     * @memberof Product
     */
    componentDidMount() {

        const id = "AVpgMuGwLJeJML43KY_c";

        // musisz pobrać id z linku!
        this.props.client
            .query({
                query: gql`
                    # Definition Schema language DSL. 
                    # You need "id" if not String then it is hard to detect this problem.
                    {
                        product(id: "${id}") {
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
            .then((res) => {
                this.setState({ id, res });
            })
            .catch(error => {
                console.log(error);
                this.setState({ id, error });
            });

    }

    /**
     * @name render
     * @returns
     * @memberof Product
     */
    render() {
        const { loading, data, networkStatus, rates } = this.state.res;

        if (this.state.error) {
            return <ErrorPage text="Error while fetching the product." />
        }

        if (typeof loading === "undefined") {
            return <Loading text="Loading product data..." />;
        }
        const items = data.product[0] ? <ProductItem product={data.product[0]} /> : null;

        return (
            <div>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6"> Product page </Typography>

                    <div className="eiti-products"> {items} </div>

                </Grid>
            </div>
        );

    }
};

function ProductItem(props) {
    const product = props.product;
    const style = {
        wordBreak: "break-all"
    };

    
    return (
        <List dense={true}>
            <ListItem style={style} >

                <ListItemText primary="Id" secondary={product._id} />

            </ListItem>
            <ListItem style={style} >

                <ListItemText primary="Name" secondary={product.name} />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Price"
                    secondary={product.price + " " + product.currency}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText primary="Brand" secondary={product.brand} />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Condition"
                    secondary={product.condition}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Is for sale"
                    secondary={product.isSale}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText primary="Merchant" secondary={product.merchant} />

            </ListItem>
            <ListItem style={style} >

                <ListItemText primary="Shipping" secondary={product.shipping} />

            </ListItem>
            <ListItem style={style} >


                <ListItemText primary="EAN" secondary={product.ean} />
            </ListItem>
            <ListItem style={style} >


                <ListItemText primary="Asins" secondary={product.asins} />
            </ListItem>
            <ListItem style={style} >

                <ListItemText primary="Weight" secondary={product.weight} />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Categories"
                    secondary={product.categories}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Date added"
                    secondary={product.dateAdded}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Date updated"
                    secondary={product.dateUpdated}
                />

            </ListItem>
            <ListItem style={style} >

                <ListItemText
                    primary="Manufacturer"
                    secondary={product.manufacturer}
                />

            </ListItem>
            <ListItem style={style} >
                <ListItemText
                    primary="Manufacturer number"
                    secondary={product.manufacturerNumber}
                />
            </ListItem>

            <ListItem style={style} >
                <ListItemText primary="Primary categories" secondary={product.primaryCategories} />
            </ListItem>

            <ListItem style={style} >
                <ListItemText primary="UPC" secondary={product.upc} />
            </ListItem>

            <ListItem style={style} >
                <ListItemText primary="Keys" secondary={product.keys} />
            </ListItem>

            <ListItem style={style} >
                <ListItemText primary="Source URLs" secondary={product.sourceURLs} />
            </ListItem>
        </List>
    );

}
export default Product