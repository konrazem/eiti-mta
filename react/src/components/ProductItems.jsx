import React from "react";
import { genSettings, getResult } from '../util';
import {
    List,
    ListItem,
    Grid,
    Button,
    ButtonGroup,
    TextField
} from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




export default function ProductItems({ product, editMode, handleSave, handleDelete, newProduct }) {
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [result, setResult] = React.useState({});

    const handleClickOpen = (data) => {
        setResult(data);
        setOpen(true);
    };
    
    const handleClickOpenDelete = (data) => {
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    
    const handleAgree = () => {
        handleSave(result);
        setOpen(false);
    }

    const handleAgreeDelete = () => {
        handleDelete();
        setOpenDelete(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const elements = e.target.elements;
        const data = getResult(elements, product);

        handleClickOpen(data);
        // TODO: show modal 
        // handleSave(result);
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



    return (<div><Grid container spacing={2}>
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
                    <Button disabled={newProduct} onClick={handleClickOpenDelete}>delete</Button>
                </ButtonGroup>
            </form>
        </Grid>
    </Grid>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Do you want to save changes?"}</DialogTitle>
            {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to save changes of edited product? .
          </DialogContentText>
            </DialogContent> */}
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
          </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                    Agree
          </Button>
            </DialogActions>
        </Dialog>


        {/* DELETE DIALOG */}
        <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Do you want to delete this product?"}</DialogTitle>
            {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to save changes of edited product? .
          </DialogContentText>
            </DialogContent> */}
            <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                    Disagree
          </Button>
                <Button onClick={handleAgreeDelete} color="primary" autoFocus>
                    Agree
          </Button>
            </DialogActions>
        </Dialog>

    
    </div>);
}

