import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {signOut} from "../../reducks/users/operations";
import {useDispatch, useSelector} from "react-redux";
import {getUserId, getUserRole} from "../../reducks/users/selectors";
import {push} from "connected-react-router"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const HeaderMenu = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    const userRole = getUserRole(selector);
    const isAdministrator = (userRole === "administrator")

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectMenu = (path) => {
        dispatch(push(path));
        handleClose();
    };

    return (
        <>
            <IconButton>
                <ShoppingCartIcon />
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {isAdministrator && (
                    <MenuItem onClick={() => selectMenu('/product/edit')}>商品の登録</MenuItem>
                )}
                <MenuItem onClick={() => selectMenu('/user/profile/' + userId)}>プロフィール</MenuItem>
                <MenuItem onClick={() => dispatch(signOut())}>ログアウト</MenuItem>
            </Menu>
        </>
    );
};

export default HeaderMenu;