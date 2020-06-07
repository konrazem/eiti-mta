import React from "react";
import HeaderMenu from "./HeaderMenu";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
    priceListTitle: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        fontStyle: "italic",
        backgroundColor: theme.palette.primary.light,
    },
}));


export default function Header() {

    const classes = useStyles();
    // anchor element is app bar icon
    const env = process.env.NODE_ENV === "development" ? "Development" : "Production";

    const title = "EITI App - " + env;

    return (
        <div className={classes.root} data-testid="Header">
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="subtitle1" className={classes.title}>
                        {title}
                    </Typography>
                    <HeaderMenu />
                </Toolbar>
            </AppBar>
        </div>
    );
};
