import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Paper,
    Button,
    TextField,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
    },
}));

export default function Settings({ skip, limit, count }) {
    // const [values, setValues] = React.useState();
    const classes = useStyles();
    const [_skip, setSkip] = React.useState(skip);
    const [_limit, setLimit] = React.useState(limit);


    const handleSubmit = () => {
        window.location = `/products/skip/${_skip}/limit/${_limit}`;
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid item>
                        <Typography variant="h6">
                            There are {count} products in database. You can portion this data with skip and limit values below or change URL.
                        </Typography>
                    </Grid>
                    <Grid container item spacing={2} justify="flex-end">
                        <Grid item>
                            <TextField
                                id="textfiled-skip"
                                label={skip.toString()}
                                placeholder="How many to skip"
                                onChange={e => setSkip(e.target.value)}
                                type="number"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="textfield-limit"
                                label={limit.toString()}
                                placeholder="How many to load"
                                onChange={e => setLimit(e.target.value)}
                                type="number"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-end"
                    >
                        <Grid item>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
