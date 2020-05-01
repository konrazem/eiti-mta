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


const AlertDialog = forwardRef(({ text, title, handleAgree }) => {
    const [open, setOpen] = React.useState(false);

    const onClick = () => {
        setOpen(!open);
    };


    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onClick}
            >
                {text}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClick}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onClick} color="primary">
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
