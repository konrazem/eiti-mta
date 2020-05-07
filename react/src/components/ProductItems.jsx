import React from "react";
import { genSettings } from '../util';
import {
    List,
    ListItem,
    Grid,
    Button,
    ButtonGroup,
    TextField
} from "@material-ui/core";




export default function ProductItems({ product, editMode, handleSave, handleDelete, newProduct }) {
    const handleSubmit = e => {
        e.preventDefault();
        const elements = e.target.elements;
        let result = { ...product };
        const keys = Object.keys(result);

        for (const key of keys) {
            if (elements.hasOwnProperty(key)) {
                result[key] = elements[key].value || "";
            }
        }
        handleSave(result);
    }
    const config = genSettings(product);
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

    return (<Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <form id="product-form" onSubmit={handleSubmit}>
                <List dense={true}>
                    {config.map((item, index) => {
                        return (
                            <ListItem style={style} key={'prod-' + index}>
                                <TextField
                                    id={item.id}
                                    label={item.label}
                                    name={item.label}
                                    style={{ margin: 8 }}
                                    defaultValue={item.defaultValue}
                                    fullWidth
                                    disabled={!editMode}
                                    margin="normal"
                                    type={item.type}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button type="submit" disabled={!editMode}>save</Button>
                    <Button disabled={newProduct} onClick={handleDelete}>delete</Button>
                </ButtonGroup>
            </form>
        </Grid>
    </Grid>);
}

