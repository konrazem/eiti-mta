import React, { useRef } from "react";
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
            res: {},
            error: false,
            loading: false
        };
    }
    


    handleSaveClick() {
        console.log("handle save");
        // get product input fields

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
