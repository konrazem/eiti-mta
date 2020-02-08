import React, { useState } from 'react';
import MainMenu from './MainMenu';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { UserConsumer } from '../../context';


const useStyles = makeStyles(theme => ({ //makeStyles(styles, [options])
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  priceListTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    fontStyle: "italic",
    backgroundColor: theme.palette.primary.light
  },
}));

/**
 * Header
 * 
 * @export
 * @param {*} props
 * @returns
 * @readonly 
 *  * keepMounted - Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Popper.
 *  anchorEl - to which ele menu have to stick 
 * anchorOrigin - point on the anchor where the popover's anchorEl will attach to. This is not used when the anchorReference is 'anchorPosition'.
  point on the Popover which will attach to the anchor's origin.
 */
const Header = props => {

  const classes = useStyles();
  // anchor element is app bar icon
  return (<div className={classes.root}>
    <UserConsumer>
      {context => {

        const title = `${process.env.NODE_ENV} 1.0.2 ${context.text.app_name}`;


        return (
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="subtitle1" className={classes.title}>{title}</Typography>
              <MainMenu text={context.text} />
            </Toolbar>
          </AppBar>
        )
      }}

    </UserConsumer>
  </div>);
}

export default Header;