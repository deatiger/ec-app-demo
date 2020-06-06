import React                       from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar                      from '@material-ui/core/AppBar';
import Toolbar                     from '@material-ui/core/Toolbar';
import IconButton                  from '@material-ui/core/IconButton';
import SearchIcon                  from '@material-ui/icons/Search';
import {useDispatch, useSelector}  from "react-redux";
import {getSignedIn}               from "../../reducks/users/selectors";
import logo                        from "../../assets/img/icons/logo.png";
import {HeaderMenu}                from "./index";
import {push}                      from "connected-react-router"
import {TextInput} from "../UIkit";

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
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    const [searchKeyword, setSearchKeyword] = React.useState("");

    const inputSearchKeyword = React.useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar>
                    <a
                        className="u-text__link"
                        onClick={() => dispatch(push('/'))} role="button">
                        <img alt="Logo" src={logo} />
                    </a>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
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