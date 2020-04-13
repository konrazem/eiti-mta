import React from "react";
import AlertDialog from './AlertDialog';
import { getDateFromStr } from "../util";
import {
    List,
    ListItem,
    Grid,
    ListItemText,
    TextField,
    Paper,
    AppBar,
    Button,
    ButtonGroup,
    Toolbar,
    Typography,
} from "@material-ui/core";

export default function ProductDynamicItems({
    product,
    handleSaveClick,
    handleCancelClick,
}) {
    
    const _dateUpdated = getDateFromStr(product.dateUpdated);
    const _dateAdded = getDateFromStr(product.dateAdded);
    const style = {
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        bar: {
            boxShadow: "none",
        },
    };

    return (
        <React.Fragment>
            <div style={style.root}>
                <AppBar position="static" color="inherit" style={style.bar}>
                    <Toolbar>
                        <Typography variant="h6" style={style.title}>
                            Edit Product
                        </Typography>
                        <ButtonGroup
                            color="primary"
                            aria-label="outlined primary button group"
                        >
                            <Button onClick={handleCancelClick}>Cancel</Button>
                            <AlertDialog
                                text="Save"
                                title="Are you sure you want to save changes?"
                                handleAgree={handleSaveClick}
                            />
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <List dense={true}>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Id"
                                    secondary={product._id}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="price-input"
                                    label="Price"
                                    style={{ margin: 8 }}
                                    defaultValue={product.price}
                                    helperText={product.currency}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="name-input"
                                    label="Name"
                                    style={{ margin: 8 }}
                                    defaultValue={product.name}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="brand-input"
                                    label="Brand"
                                    style={{ margin: 8 }}
                                    defaultValue={product.brand}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="condition-input"
                                    label="Condition"
                                    style={{ margin: 8 }}
                                    defaultValue={product.condition}
                                    helperText="The condition of the product in cases where it is being sold at this price."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="for-sale-input"
                                    label="Is for sale"
                                    style={{ margin: 8 }}
                                    defaultValue={product.isSale}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="merchant-input"
                                    label="Merchant"
                                    helperText="The merchant and/or website selling at this price."
                                    style={{ margin: 8 }}
                                    defaultValue={product.merchant}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="shipping-input"
                                    label="Shipping"
                                    helperText="The shipping conditions associated with this price."
                                    style={{ margin: 8 }}
                                    defaultValue={product.shipping}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="ean-input"
                                    label="EAN"
                                    style={{ margin: 8 }}
                                    defaultValue={product.ean}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="asins-input"
                                    label="Asins"
                                    style={{ margin: 8 }}
                                    defaultValue={product.isSale}
                                    helperText="A list of ASINs (Amazon identifiers) used for this product."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="weight-input"
                                    label="Weight"
                                    style={{ margin: 8 }}
                                    defaultValue={product.weight}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="categories-input"
                                    label="Categories"
                                    style={{ margin: 8 }}
                                    defaultValue={product.categories}
                                    helperText="A list of category keywords used for this product in many sources."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper>
                        <List dense={true}>
                            {/* DATES */}
                            <ListItem style={style}>
                                {/* expect yyyy-MM-dd */}
                                <TextField
                                    id="date-added-input"
                                    label="Date added"
                                    style={{ margin: 8 }}
                                    defaultValue={_dateAdded}
                                    fullWidth
                                    margin="normal"
                                    type="date"
                                    helperText="The date this product was added as first to the product database."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    id="date-updated-input"
                                    label="Date updated"
                                    style={{ margin: 8 }}
                                    defaultValue={_dateUpdated}
                                    fullWidth
                                    type="date"
                                    margin="normal"
                                    helperText="The most recent date this product was last updated or viewed by our system."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <TextField
                                    id="manufacturer-input"
                                    label="Manufacturer"
                                    style={{ margin: 8 }}
                                    defaultValue={product.manufacturer}
                                    fullWidth
                                    margin="normal"
                                    helperText="The producer of this product.."
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <TextField
                                    id="manufacturer-number-input"
                                    label="Manufacturer number"
                                    style={{ margin: 8 }}
                                    defaultValue={product.manufacturerNumber}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <TextField
                                    id="primary-categories-input"
                                    label="Primary categories"
                                    style={{ margin: 8 }}
                                    defaultValue={product.primaryCategories}
                                    fullWidth
                                    helperText="A list of standardized categories to which this product belongs."
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <TextField
                                    id="upc-input"
                                    label="UPC"
                                    style={{ margin: 8 }}
                                    defaultValue={product.upc}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <TextField
                                    id="keys-input"
                                    label="Keys"
                                    style={{ margin: 8 }}
                                    defaultValue={product.keys}
                                    helperText="A list of Internal Datafiniti identifiers for this product."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <TextField
                                    id="urls-input"
                                    label="Source URLs"
                                    style={{ margin: 8 }}
                                    defaultValue={product.sourceURLs}
                                    helperText="A list of URLs used to generate data for this product."
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
