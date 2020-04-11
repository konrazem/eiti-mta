import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Grid,
    ListItemText,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
export default function Product(props) {
    const classes = useStyles();
    const secondary = true;
    return (
        <div className={classes.root}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                    Product page
                </Typography>
                <div className={classes.demo}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Name: awoepnfpwe fnweofnwefaewf"
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                    </List>
                </div>
            </Grid>
        </div>
    );
}
