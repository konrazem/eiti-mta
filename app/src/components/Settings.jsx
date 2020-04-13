import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Avatar,
    Typography,
    Paper,
    Button,
    TextField,
} from "@material-ui/core/";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
    },
}));

export default function Settings({ skip, limit }) {
    // const [values, setValues] = React.useState();
    const classes = useStyles();
    const TextFieldSkip = useRef(null);
    const TextFieldLimit = useRef(null);
    const handleSubmit = () => {
        // get ref values
        const skip = TextFieldSkip.current.getElementsByTagName("input")[0]
            .value;
        const limit = TextFieldLimit.current.getElementsByTagName("input")[0]
            .value;

        if (parseInt(skip) || skip === "0") {
            // NOTE: if(0) === false
            if (parseInt(limit)) {
                // if limit === '0' do NOT navigate. Moreover do not use history as table component will not render!
                const url = `/products/skip/${skip}/limit/${limit}`;
                window.location = url;
            }
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid
                        item
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                    >
                      
                        <Grid item>
                          <Typography variant="h5">
                            Information about fetching data
                          </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                There may be lots of records to fetch which can slow down application. That is why 200 records are downloaded by default. In order to fetch more or less products from the
                                database plase change skip/limit values in URL
                                or below. Skip is a value of how many products
                                to omit in the database. Limit is a number of
                                products to fetch from the database starting
                                from skip value. For example if in database
                                there are 1000 records and user set skip to 200
                                and limit to 1000, then 800 records will be
                                retrievd from the database.
                            </Typography>
                            <Typography variant="body1">
                                For example if in database
                                there are 1000 records and user set skip to 200
                                and limit to 1000, then 800 records will be
                                retrievd from the database.
                            </Typography>
                            <Typography variant="caption">
                              *You can check current skip and limit values in URL, in the placeholders inputs or in the table below.
                            </Typography>
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
                            <TextField
                                ref={TextFieldSkip}
                                id="textfiled-skip"
                                placeholder={skip}
                                label="skip"
                                type="number"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="textfield-limit"
                                ref={TextFieldLimit}
                                label="limit"
                                placeholder={limit}
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
