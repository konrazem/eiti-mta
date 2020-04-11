import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto",
    },
}));

const NotFound = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root}>
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="center"
                >
                    <h2>Page not found.</h2>
                </Box>
            </Paper>
        </div>
    );
};

export default NotFound;
