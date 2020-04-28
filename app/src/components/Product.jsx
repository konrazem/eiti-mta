import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import ProductStaticItems from "./ProductStaticItems";
import ProductDynamicItems from "./ProductDynamicItems";

/**
 * @class Product
 * @extends {React.Component}
 * @description
 */
class Product extends React.Component { 

    constructor(props) {
        super(props);

        this.state = {
            res: null,
            error: null, 
            editMode: false,
        };
    }

    componentDidMount() {
        const idInUrl = this.props.history.location.pathname.split("/")[2];
        fetch("http://localhost:5000/product/" + idInUrl)
            .then((res) => res.json())
            .then((data) => this.setState({ data }))
            .catch((error) => this.setState({ error }));
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


    render() {
        // const { loading, data, prod, networkStatus, rates } = this.state.res;
        // const { loading, data } = this.state.res;
        // console.log("networkStatus: ", networkStatus);
        const { data, error } = this.state;

        if (error) {
            return <InfoPage text="Error while fetching the product." />;
        }
        
        if(!data) {
            // need to check timeout
            return (
                <Loading
                    text="Loading products' data..."
                    changePrice={this.changePrice}
                />
            );
        }
 
        if (!data.length) {
            return <InfoPage text="Product was not found." />;
        }


        const product = data[0];

        if (this.state.editMode) {
            // if edit mode it on
            return (
                <div
                    style={{
                        flexGrow: 1,
                        padding: 10,
                    }}
                >
                    <ProductDynamicItems
                        product={product}
                        handleCancelClick={this.handleCancelClick.bind(this)}
                        handleSaveClick={this.handleSaveClick}
                    />
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        flexGrow: 1,
                        padding: 10,
                    }}
                >
                    <ProductStaticItems
                        product={product}
                        handleEditClick={this.handleEditClick.bind(this)}
                        handleDeleteClick={this.handleDeleteClick}
                    />
                </div>
            );
        }

    }
}

export default Product;
