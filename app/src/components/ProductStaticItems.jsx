import React from "react";
import AlerDialog from './AlertDialog';
import { getDateFromStr } from "../util";

import {
    List,
    ListItem,
    Grid,
    ListItemText,
    Paper,
    AppBar,
    Button,
    ButtonGroup,
    Toolbar,
    Typography,
} from "@material-ui/core";

/**
 * @name ProductStaticItems
 * @export
 * @param {*} {
 *     product,
 *     handleDeleteClick,
 *     handleEditClick,
 * }
 * @returns
 */
export default function ProductStaticItems({
    product,
    handleDeleteClick,
    handleEditClick,
}) {
    const _dateUpdated = getDateFromStr(product.dateUpdated);
    const _dateAdded = getDateFromStr(product.dateAdded);

    const style = {
        input: {
            wordBreak: "break-all",
        },
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
                            Product data
                        </Typography>
                        <ButtonGroup
                            color="primary"
                            aria-label="outlined primary button group"
                        >
                            <Button onClick={handleEditClick}>Edit</Button>
                            <AlerDialog
                                text="Delete"
                                title="Are you sure you want to delete this product?"
                                handleAgree={handleDeleteClick}
                             />
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <List dense={true}>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Id"
                                    secondary={product._id}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Price"
                                    secondary={
                                        product.price + " " + product.currency
                                    }
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Name"
                                    secondary={product.name}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Brand"
                                    secondary={product.brand}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Condition"
                                    secondary={product.condition}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Is for sale"
                                    secondary={product.isSale}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Merchant"
                                    secondary={product.merchant}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Shipping"
                                    secondary={product.shipping}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="EAN"
                                    secondary={product.ean}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Asins"
                                    secondary={product.asins}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Weight"
                                    secondary={product.weight}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Categories"
                                    secondary={product.categories}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper>
                        <List dense={true}>
                            {/* DATES */}
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Date added"
                                    secondary={_dateAdded}
                                />
                            </ListItem>
                            <ListItem>
                                {/* <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date updated"
                                value={product.dateUpdated ? new Date(product.dateUpdated).toLocaleDateString() : "00"}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            /> */}

                                <ListItemText
                                    primary="Date updated"
                                    secondary={_dateUpdated}
                                />
                            </ListItem>
                            {/* /DATES */}

                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Manufacturer"
                                    secondary={product.manufacturer}
                                />
                            </ListItem>
                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Manufacturer number"
                                    secondary={product.manufacturerNumber}
                                />
                            </ListItem>

                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Primary categories"
                                    secondary={product.primaryCategories}
                                />
                            </ListItem>

                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="UPC"
                                    secondary={product.upc}
                                />
                            </ListItem>

                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Keys"
                                    secondary={product.keys}
                                />
                            </ListItem>

                            <ListItem style={style.input}>
                                <ListItemText
                                    primary="Source URLs"
                                    secondary={product.sourceURLs}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
