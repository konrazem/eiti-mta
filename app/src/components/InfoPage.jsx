import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Error from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto",
    },
}));

export default function InfoPage({ text }) {
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
                    <Error />
                </Box>
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="center"
                >
                    <p>{text}</p>
                </Box>
            </Paper>
        </div>
    );
}
