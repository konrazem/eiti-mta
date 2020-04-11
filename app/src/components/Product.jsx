import React from "react";
import Loading from './Loading';
import { gql } from "apollo-boost";
import {
    List,
    ListItem,
    Grid,
    ListItemText,
    Typography,
} from "@material-ui/core";

/**
 *
 *
 * @export
 * @param {*} props
 * @returns
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
            res: {},
            err: false,
        };
    }

    componentDidMount() {
        
        const ID = "EFAwefEfaewfEWF";

        // musisz pobrać id z linku!
         this.props.client
             .query({
                 query: gql`
                    # Definition Schema language DSL
                    {
                        product(id: ${ID}) {
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
                 this.setState({ res });
             });

    }

    render() {
        const { loading, data, networkStatus, rates } = this.state.res;

        if (typeof loading === "undefined") {
            return <Loading text="Loading product data..." />;
        }
        const secondary = true;

        return (
            <div>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6"> Product page </Typography>

                    <List dense={true}>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </div>
        );
    }
}


export default Product