import React from 'react';
import Loading from '../Loading';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { Button, TextField } from '@material-ui/core/';
import { countQuery } from '../../graphql/queries';


import { Card, CardActions, CardHeader } from '@material-ui/core';

const text = {
  submit: "Submit",
  records_title: "Select number of records out of:",
}



const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
}));



const Settings = props => {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    skip: 0, limit: 100
  });
  const { loading, error, data } = useQuery(countQuery);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      // alert(`skip: ${values.skip} limit: ${values.limit}`)
      props.setSettings(values);
    }
  }

  //NOTE : no max limit for skip and limit
  const handleChange = name => event => {
    setValues({ ...values, [name]: (event.target.value < 0) ? 0 : event.target.value });
  };

  return (
    <Card className={classes.card}>
      <CardHeader title={text.records_title} subheader={data.count} />
      <CardActions>


        <form onSubmit={handleSubmit}>
          <div className={classes.container}>

            <TextField
              id="outlined-number"
              label="Start from:"
              value={values.skip}
              onChange={handleChange('skip')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-number"
              label="End on:"
              value={values.limit}
              onChange={handleChange('limit')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
              placeholder="0"
            />


          </div>

          <Button className={classes.button} color="primary" type="submit">
            {text.submit}
          </Button>

        </form>



      </CardActions>
    </Card>

  );
}


export default Settings;