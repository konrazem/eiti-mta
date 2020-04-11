import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import { UserConsumer } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
}));

const Loading = (props) => {
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


                    <CircularProgress disableShrink />


                </Box>
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="center"
                >


                    <p>{props.text}</p>


                </Box>
            </Paper>
        </div>
    );
};

export default Loading;
