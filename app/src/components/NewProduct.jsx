import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import { gql } from "apollo-boost";
import ProductEmptyItems from "./ProductEmptyItems";

/**
 * @class NewProduct
 * @extends {React.Component}
 * @description
 */
class NewProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            res: {}, // graphql result that contains loaded info
            error: false,
        };
    }

    handleSaveClick() {
        console.log("handle save");
    }

    render() {
        const style = {
            flexGrow: 1,
            padding: 10,
        };

        return (
            <div style={style}>
                <ProductEmptyItems
                    handleSaveClick={this.handleSaveClick}
                />
            </div>
        );
    }
}

export default NewProduct;
