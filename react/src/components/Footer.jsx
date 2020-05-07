import React from 'react';
import Box from '@material-ui/core/Box';

export default () => {

  const emoji = <span role='img' aria-label='emoji'>⭐</span>;

  return (<div className="footer">
    <Box fontWeight="light" textAlign="center" fontStyle="italic" fontSize="" m={1}>
      {emoji} Copyrights © Konrad Grzyb 2019 {emoji}
    </Box>
  </div>)
};