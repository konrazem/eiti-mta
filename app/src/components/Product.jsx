import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import ProductItems from "./ProductItems";
import AlertDialog from "./AlertDialog";
import { Button, ButtonGroup, Toolbar, Typography } from "@material-ui/core";// import ProductToolbarDelete from "./ProductToolbarDelete";
import { schema } from '../productModel';
import { makeEmptyProduct } from '../util';

const URL = 'http://localhost:5000/product';


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
            newProduct: false
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (!id) {
            // this is create new product = make empty product
            const emptyProduct = makeEmptyProduct(schema);
            this.setState({
                data: [emptyProduct],
                newProduct: true,
                disabled: false
            });
        } else {
            // check product

            fetch(URL + '/' + id)
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
    }

    changeMode() {
        // turn on editMode
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    handleDelete() {
        const id = this.props.match.params.id;
        fetch(URL + '/' + id, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    this.setState({ error: true })
                } else {
                    window.location = '/product/' + id;
                }
            })
            .catch((error) => this.setState({ error }));
    }

    handleSave(data) {
        // add new product
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                debugger;
                if (!res.ok) {
                    this.setState({ error: true })
                } else {
                    window.location = '/product/' + data.id;
                }
            })
            .catch((error) => this.setState({ error }));
    }

    render() {
        const { data, error, disabled, newProduct } = this.state;

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
        return (
            <div style={{
                flexGrow: 1,
                padding: 10,
            }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {disabled ? 'Product data' : 'Edit product'}
                    </Typography>
                    <Button onClick={this.changeMode.bind(this)} variant="contained" color="primary">{disabled ? 'Edit' : 'Cancel'}</Button>
                </Toolbar>
                <ProductItems
                    disabled={disabled}
                    product={data[0]}
                    handleSave={this.handleSave}
                    newProduct={newProduct}
                />
            </div>
        );
    }
};

export default Product;
