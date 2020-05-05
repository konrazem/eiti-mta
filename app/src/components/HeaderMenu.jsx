import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
    IconButton,
    Menu,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@material-ui/core";

//ICONS
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PageviewIcon from "@material-ui/icons/Pageview";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


/**
 * Material-UI Menu
 */
const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));


/**
 * StyledMenuItem
 */
const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
        link: {

        }
    },
}))(MenuItem);


/**
 * HeaderMenu
 *
 * @export
 * @param {*} props
 * @returns
 */
const HeaderMenu = (props) => {
    // anchor element is app bar icon
    const [anchorEl, setAnchorEl] = useState(null);
    function handleOpenMenu(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
    }

    const menu_items = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            link: '/'
        },
        {
            text: 'Products',
            icon: <PageviewIcon />,
            link: '/products/skip/0/limit/200'
        },
        {
            text: 'Add product',
            icon: <AddIcon />,
            link: '/product'
        },
        {
            text: 'Profile',
            icon: <AccountCircle />,
            link: '/profile'
        },
        {
            text: 'Logout',
            icon: <ExitToAppIcon />,
            link: '/logout'
        },
    ];

    return (
        <div>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="menu-appbar"
                onClick={handleOpenMenu}
            >
                <MenuIcon />
            </IconButton>

            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {menu_items.map((item, index) => <StyledMenuItem onClick={() => window.location = item.link} key={'menu-item-' + index}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </StyledMenuItem>)}

            </StyledMenu>
        </div>
    );
};

export default HeaderMenu;
