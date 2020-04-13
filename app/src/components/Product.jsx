import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import { gql } from "apollo-boost";
import ProductStaticItems from "./ProductStaticItems";
import ProductDynamicItems from "./ProductDynamicItems";

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
            editMode: false,
        };
    }

    /**
     * @name componentDidMount
     * @memberof Product
     */
    componentDidMount() {
        const id = this.props.history.location.pathname.split("/")[2];
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
            .catch((error) => {
                console.log(error);
                this.setState({ id, error });
            });
    }

    handleEditClick() {
        // turn on editMode
        console.log("turn on edit mode");
        this.setState({
            editMode: true,
        });
    }

    handleCancelClick() {
        // turn off editMode
        console.log("turn off edit mode");
        this.setState({
            editMode: false,
        });
    }

    handleDeleteClick() {
        console.log("handle delete");
    }

    handleSaveClick() {
        console.log("handle save");
    }

    /**
     * @name render
     * @returns
     * @memberof Product
     */
    render() {
        // const { loading, data, networkStatus, rates } = this.state.res;
        const { loading, data } = this.state.res;

        if (this.state.error) {
            return <InfoPage text="Error while fetching the product." />;
        }

        if (typeof loading === "undefined") {
            return (
                <Loading
                    text="Loading products' data..."
                    changePrice={this.changePrice}
                />
            );
        }

        if (!data.product.length) {
            return <InfoPage text="Product was not found." />;
        }

        // Here we have product to work with. We can be in the edit mode or not.
        const product = data.product[0];

        let items = null;

        if (this.state.editMode) {
            // if edit mode it on
            items = (
                <ProductDynamicItems
                    product={product}
                    handleCancelClick={this.handleCancelClick.bind(this)}
                    handleSaveClick={this.handleSaveClick}
                />
            );
        } else {
            items = (
                <ProductStaticItems
                    product={product}
                    handleEditClick={this.handleEditClick.bind(this)}
                    handleDeleteClick={this.handleDeleteClick}
                />
            );
        }

        const style = {
            flexGrow: 1,
            padding: 10,
        };
        return <div style={style}> {items} </div>;
    }
}

export default Product;
