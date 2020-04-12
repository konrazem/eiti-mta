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
    function handleLogout() {
        window.location = "/logout";
    }
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
                <Link to="/">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </StyledMenuItem>
                </Link>

                <Link to="/add">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add product" />
                    </StyledMenuItem>
                </Link>

                <Link to="/profile">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                </Link>


                <StyledMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
};

export default HeaderMenu;
