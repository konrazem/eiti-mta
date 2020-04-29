import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import ProductItems from "./ProductItems";
import ProductToolbarDelete from "./ProductToolbarDelete";


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
            disabled: true, // not edit mode on init
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
        console.log(this.state.disabled);
        
        this.setState({
            disabled: !this.state.disabled,
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
        const { data, error, disabled } = this.state;

        if (error) {
            return <InfoPage text="Error while fetching the product." />;
        }

        if (!data) {
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

        const style = {
            root: {
                flexGrow: 1,
                padding: 10,
            }
        };
        return (
            <div style={style.root}>
                <ProductToolbarDelete
                    title="Prduct data"
                    btnText
                    handleEditClick={this.handleEditClick.bind(this)}
                    handleDeleteClick={this.handleDeleteClick}
                />
                <ProductItems
                    disabled={disabled}
                    product={data[0]}
                />
            </div>
        );
    }
}

export default Product;
