import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core'; 
import { UserConsumer } from '../context';


const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing(2)
    },
}));

const NotFound = props => {

    const classes = useStyles();
    // anchor element is app bar icon
    return (<div className={classes.root}>
      <UserConsumer>
        { context => { 

          return (
            <Typography variant="h4" gutterBottom>
                {context.text.not_found}
            </Typography>
          )
        }}
  
      </UserConsumer>
    </div>);
  }
export default NotFound;
