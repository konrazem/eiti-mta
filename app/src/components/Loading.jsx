import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { UserConsumer } from '../context';

export default props => {

  return (
    <UserConsumer>
      {context => (<div>

        <Box component="span" m={1} display="flex" justifyContent="center">

          <CircularProgress disableShrink />
        </Box>
        <Box component="span" m={1} display="flex" justifyContent="center">
          <p>{context.text.loading}</p>
        </Box>

      </div>)}
    </UserConsumer>)
}
