import React from "react";
import {
    AppBar,
    Button,
    ButtonGroup,
    Toolbar,
    Typography,
} from "@material-ui/core";


/**
 * @name ProductBar
 * @export
 * @param {*} { btn1, handleBtn1, btn2, handleBtn2 }
 * @returns
 */
export default function ProductBar({ btn1, handleBtn1, btn2, handleBtn2 }) {
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
        <div style={style.root}>
            <AppBar position="static" color="inherit" style={style.bar}>
                <Toolbar>
                    <Typography variant="h6" style={style.title}>
                        Product Info
                    </Typography>
                    <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={handleBtn1}>{btn1}</Button>
                        <Button onClick={handleBtn2}>{btn2}</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
}
