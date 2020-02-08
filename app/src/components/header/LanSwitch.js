import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'; 


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }, 
}));

const LanSwitch = props => {

  const classes = useStyles(); 


 return (<div className={classes.root}>
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={props.lan} onChange={props.changeLan} aria-label="login switch" />}
        label={props.lan ? 'English' : 'Polski'}
      />
    </FormGroup>
 </div> )

}

export default LanSwitch;