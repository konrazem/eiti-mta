import React from 'react';
import Table from './Table'; 
import Loading from '../Loading';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { productsQuery } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const Products = props => {
  const classes = useStyles();
  const skip = parseInt(props.settings.skip);
  const limit = parseInt(props.settings.limit);

  const { loading, error, data } = useQuery(productsQuery, {
    variables: {
      skip: skip, limit: limit,
    }
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (<Paper className={classes.root}>
        <Table data={data} />
    </Paper>)
}


export default Products;