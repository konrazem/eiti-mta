import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import ProductItems from "./ProductItems";

import AlertDialog from "./AlertDialog";
import { Button, ButtonGroup, Toolbar, Typography } from "@material-ui/core";// import ProductToolbarDelete from "./ProductToolbarDelete";
const URL = 'http://localhost:5000/product/';

/**
 * @class Product
 * @extends {React.Component}
 * @description
 */
class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
            disabled: true, // not edit mode on init
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id
        fetch(URL + id)
            .then((res) => {
                if (!res.ok) {
                    this.setState({ error: true });
                } else {
                    return res.json()
                }
            })
            .then((data) => {
                this.setState({ data })
            })
            .catch((error) => this.setState({ error }));
    }

    changeMode() {
        // turn on editMode
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    handleDelete() {
        const id = this.props.match.params.id
        fetch(URL + id, {
            method: 'DELETE'
        })
            .then(res => {
                debugger;

                if (!res.ok) {
                    this.setState({ error: true })
                } else {
                    window.location = '/product/' + id;
                }
            })
            .catch((error) => this.setState({ error }));


    }

    handleSave() {

        // here store data , get token etc...
        alert("handle save");
    }

    render() {
        const { data, error, disabled } = this.state;

        if (error) {
            return <InfoPage text="Error while fetching the product." />;
        }

        if (!data) {
            // TODO: check timeout
            return (
                <Loading
                    text="Loading products' data..."
                    changePrice={this.changePrice}
                />
            );
        }

        if (!data.length) {
            return <InfoPage text="Product was not found or product was deleted." />;
        }

        const style = {
            root: {
                flexGrow: 1,
                padding: 10,
            }
        };

        let toolbar = <ProductToolbarDelete
            onChangeMode={this.changeMode.bind(this)}
            onDelete={this.handleDelete.bind(this)}
        />;


        if (!disabled) {
            toolbar = <ProductToolbarSave
                onChangeMode={this.changeMode.bind(this)}
                onSave={this.handleSave.bind(this)}
            />
        }

        return (
            <div style={style.root}>



                {toolbar}


                <ProductItems
                    disabled={disabled}
                    product={data[0]}
                />
            </div>
        );
    }
};


const ProductToolbarDelete = ({ onChangeMode, onDelete, }) => <Toolbar>
    <Typography variant="h6" style={{ flexGrow: 1 }}>
        Products' data
    </Typography>
    <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
    >
        <Button onClick={onChangeMode}>Edit</Button>
        <AlertDialog
            text="Delete"
            title="Do you want to delete this product?"
            handleAgree={onDelete.bind(this)}
        />
    </ButtonGroup>
</Toolbar>

const ProductToolbarSave = ({ onChangeMode, onSave }) => {
    return (
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                Edit mode
            </Typography>
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
            >
                <Button onClick={onChangeMode}>Cancel</Button>
                <AlertDialog
                    text="Save"
                    title="Do you want to save changes?"
                    handleAgree={onSave.bind(this)}
                />
            </ButtonGroup>
        </Toolbar>
    );
}


export default Product;
