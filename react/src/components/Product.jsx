import React from "react";
import Loading from "./Loading";
import InfoPage from "./InfoPage";
import ProductItems from "./ProductItems";
import { Button, Toolbar, Typography } from "@material-ui/core";
import { schema } from '../schema';

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
            error: false,
            editMode: false,
            newProduct: false
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (!id) {
            // this is create new product = make empty product
            this.setState({
                data: [{ ...schema }],
                newProduct: true,
                editMode: true
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
            editMode: !this.state.editMode,
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
        // check if data has id, if not then create one 

        const url = this.state.newProduct ? URL : URL + '/' + data._id;
        debugger;
        fetch(url, {
            method: this.state.newProduct ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    this.setState({ error: true })
                } else {
                    window.location = '/products/skip/0/limit/200';
                }
            })
            .catch((error) => this.setState({ error }));
    }

    render() {
        const { data, error, editMode, newProduct } = this.state;

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
        let title = 'Product';
        if (editMode) {
            title = 'Edit product';
        }
        if (newProduct) {
            title = 'New product';
        }

        return (
            <div style={{
                flexGrow: 1,
                padding: 10,
            }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button onClick={this.changeMode.bind(this)} variant="contained" color="primary">{editMode ? 'Cancel' : 'Edit'}</Button>
                </Toolbar>
                <ProductItems
                    editMode={editMode}
                    product={data[0]}
                    handleSave={this.handleSave}
                    handleDelete={this.handleDelete}
                    newProduct={newProduct}
                />
            </div>
        );
    }
};

export default Product;
