import React from "react";
import {
    List,
    ListItem,
    Grid,
    ListItemText,
    TextField,
    Paper
} from "@material-ui/core";

export default function ProductItems({
    product,
    disabled,
    handleSaveClick,
    handleCancelClick,
}) {
    function getDateFromStr(str) {
        var def = "0000-00-00";
        if (!str) {
            return def;
        }

        const date = new Date(str.toString()); // try to conver to Date
        if (date.toString() === "Invalid Date") {
            return def;
        }

        // we have valid date
        // we need to return format yyyy-MM-dd
        return date.toISOString().split("T")[0];
    }

    function genConfig(product) {
        return [
            {
                type: "text",
                id: "name-input",
                label: "Name",
                defaultValue: product.name,
                helperText: "Product name",
            },
            {
                type: "text",
                id: "brand-input",
                label: "Brand",
                defaultValue: product.brand,
                helperText: "Product brand",
            },
            {
                type: "text",
                id: "condition-input",
                label: "Condition",
                defaultValue: product.condition,
                helperText:
                    "The condition of the product in cases where it is being sold at this price",
            },
            {
                type: "text",
                id: "for-sale-input",
                label: "Is for sale",
                defaultValue: product.isSale,
                helperText: "If product is for sale",
            },
            {
                type: "text",
                id: "merchant-input",
                label: "Merchant",
                defaultValue: product.merchant,
                helperText:
                    "The merchant and/or website selling at this price.",
            },
            {
                type: "text",
                id: "shipping-input",
                label: "Shipping",
                defaultValue: product.shipping,
                helperText:
                    "The shipping conditions associated with this price.",
            },
            {
                type: "text",
                id: "ean-input",
                label: "EAN",
                defaultValue: product.ean,
                helperText: "",
            },

            {
                type: "text",
                id: "asins-input",
                label: "Asins",
                defaultValue: product.asins,
                helperText:
                    "A list of ASINs (Amazon identifiers) used for this product.",
            },
            {
                type: "text",
                id: "weight-input",
                label: "Weight",
                defaultValue: product.weight,
                helperText: "",
            },
            {
                type: "text",
                id: "categories-input",
                label: "Categories",
                defaultValue: product.categories,
                helperText:
                    "A list of category keywords used for this product in many sources.",
            },
            {
                type: "date",
                id: "date-added-input",
                label: "Date added",
                defaultValue: getDateFromStr(product.dateAdded),
                helperText:
                    "The date this product was added as first to the product database.",
            },
            {
                type: "date",
                id: "date-updated-input",
                label: "Date updated",
                defaultValue: getDateFromStr(product.dateUpdated),
                helperText:
                    "The most recent date this product was last updated or viewed by our system.",
            },
            {
                type: "text",
                id: "manufacturer-input",
                label: "Manufacturer",
                defaultValue: product.manufacturer,
                helperText: "The producer of this product.",
            },
            {
                type: "text",
                id: "manufacturer-number-input",
                label: "Manufacturer number",
                defaultValue: product.manufacturerNumber,
                helperText: "",
            },
            {
                type: "text",
                id: "primary-categories-input",
                label: "Primary categories",
                defaultValue: product.primaryCategories,
                helperText:
                    "A list of standardized categories to which this product belongs.",
                margin: "normal.",
            },
            {
                type: "text",
                id: "upc-input",
                label: "UPC",
                defaultValue: product.upc,
                helperText: "",
            },
            {
                type: "text",
                id: "keys-input",
                label: "Keys",
                defaultValue: product.keys,
                helperText:
                    "A list of Internal Datafiniti identifiers for this product.",
            },
            {
                type: "url",
                id: "urls-input",
                label: "Source URLs",
                defaultValue: product.sourceURLs,
                helperText:
                    "A list of URLs used to generate data for this product.",
            },
        ];
    }

    const config = genConfig(product);
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
                            {config.map((prod, index) => {
                                return (
                                    <ListItem style={style} key={prod.id}>
                                        <ProductItem
                                            type={prod.type}
                                            s
                                            id={prod.id}
                                            label={prod.label}
                                            defaultValue={prod.defaultValue}
                                            helperText={product.helperText}
                                            disabled={disabled}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const ProductItem = ({
    id,
    label,
    defaultValue,
    helperText,
    type,
    disabled,
}) => {
    const [val, setVal] = React.useState(defaultValue);

    const handleChange = e => {
        e.preventDefault();
        setVal(e.target.value);
    }

    return (
        <TextField
            id={id}
            label={label}
            style={{ margin: 8 }}
            defaultValue={val}
            onChange={handleChange}
            helperText={helperText}
            fullWidth
            disabled={disabled}
            margin="normal"
            type={type}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};
