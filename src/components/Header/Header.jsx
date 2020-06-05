import React                       from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar                      from '@material-ui/core/AppBar';
import Toolbar                     from '@material-ui/core/Toolbar';
import {useDispatch, useSelector}  from "react-redux";
import {getSignedIn}               from "../../reducks/users/selectors";
import logo                        from "../../assets/img/icons/logo.png";
import {HeaderMenu}                from "./index";
import {push}                      from "connected-react-router"

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        iconButtons: {
            margin: '0 0 0 auto'
        },
    }),
);

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar>
                    <a
                        className="u-text__link"
                        onClick={() => dispatch(push('/'))} role="button">
                        <img alt="Playground Logo" src={logo} />
                    </a>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenu />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header