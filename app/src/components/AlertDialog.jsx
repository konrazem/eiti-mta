import React, { forwardRef, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Slide
} from '@material-ui/core';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const URL = 'http://localhost:5000/product';


const  AlertDialog = forwardRef( ({ text, title, token }, ref) => {
    // ref is takend from parent component. Name  should be like 'getRef' not 'forwardRef'
    const [open, setOpen] = React.useState(false);
    const [response, setResponse ] = React.useState(false); 
    
    React.useEffect(() => { 
        console.log(ref);
        const data = getObjsFromRef(ref);
        debugger;
        createProduct(URL, data)
            .then((res) => {
                debugger;
                setResponse(res);
            })
            .catch((err) => {
                debugger;
                setResponse(err);
            });
    });



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function createProduct(url = '', data = {}) {
        const res = await fetch({
            url: URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // "X-Csrf-Token": token,
            },
            body: JSON.stringify(data),
        });
        
        return res.json()

    };
    
    function getValueFromInputRef(prop) {
        if(prop.current && prop.current.getElementsByTagName) {
            return prop.current.getElementsByTagName('input')[0].value;
        }

        return null
    };

    function getObjsFromRef(ref) {
        return {
            price: getValueFromInputRef(ref.price),
            asins: getValueFromInputRef(ref.asins),
            brand: getValueFromInputRef(ref.brand),
            categories: getValueFromInputRef(ref.categories),
            dateAdded: getValueFromInputRef(ref.dateAdded),
            dateUpdated: getValueFromInputRef(ref.dateUpdated),
            ean: getValueFromInputRef(ref.ean),
            imageURLs: getValueFromInputRef(ref.imageURLs),
            keys: getValueFromInputRef(ref.keys),
            manufacturer: getValueFromInputRef(ref.manufacturer),
            manufacturerNumber: getValueFromInputRef(ref.manufacturerNumber),
            name: getValueFromInputRef(ref.name),
            primaryCategories: getValueFromInputRef(ref.primaryCategories),
            sourceURLs: getValueFromInputRef(ref.sourceURLs),
            upc: getValueFromInputRef(ref.upc),
            weight: getValueFromInputRef(ref.weight),
        };
    };

    const handleAgree = () => {

    };

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
            >
                {text}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleAgree} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default AlertDialog;
