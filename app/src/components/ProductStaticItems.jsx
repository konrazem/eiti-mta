import React from "react";
import ProductBar from "./ProductBar";
import { convertStrToDate } from "../util";

import { List, ListItem, Grid, ListItemText, Paper } from "@material-ui/core";



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
    const _dateUpdated = convertStrToDate(product.dateUpdated);
    const _dateAdded = convertStrToDate(product.dateAdded);
    const style = {
        wordBreak: "break-all",
    };

    return (
        <React.Fragment>
            <ProductBar
                btn1="Edit"
                handleBtn1={handleEditClick}
                btn2="Delete"
                handleBtn2={handleDeleteClick}
            />
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
                                <ListItemText
                                    primary="Price"
                                    secondary={
                                        product.price + " " + product.currency
                                    }
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Name"
                                    secondary={product.name}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Brand"
                                    secondary={product.brand}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Condition"
                                    secondary={product.condition}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Is for sale"
                                    secondary={product.isSale}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Merchant"
                                    secondary={product.merchant}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Shipping"
                                    secondary={product.shipping}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="EAN"
                                    secondary={product.ean}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Asins"
                                    secondary={product.asins}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Weight"
                                    secondary={product.weight}
                                />
                            </ListItem>
                            <ListItem style={style}>
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
                            <ListItem style={style}>
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

                            <ListItem style={style}>
                                <ListItemText
                                    primary="Manufacturer"
                                    secondary={product.manufacturer}
                                />
                            </ListItem>
                            <ListItem style={style}>
                                <ListItemText
                                    primary="Manufacturer number"
                                    secondary={product.manufacturerNumber}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <ListItemText
                                    primary="Primary categories"
                                    secondary={product.primaryCategories}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <ListItemText
                                    primary="UPC"
                                    secondary={product.upc}
                                />
                            </ListItem>

                            <ListItem style={style}>
                                <ListItemText
                                    primary="Keys"
                                    secondary={product.keys}
                                />
                            </ListItem>

                            <ListItem style={style}>
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
