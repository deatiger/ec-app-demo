import React, {useCallback, useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {db} from "../../firebase";
import {getUserRole} from "../../reducks/users/selectors";

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const ClosableDrawer = (props) => {
    const { container } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state  => state);
    const userRole = getUserRole(selector);
    const isAdministrator = (userRole === "administrator");

    const selectMenu = (event, path) => {
        dispatch(push(path));
        props.onClose(event, false);
    };

    const [searchKeyword, setSearchKeyword] = useState(""),
          [filters, setFilters] = useState([
              {func: selectMenu, label: "すべて",    id: "all",    value: "/"              },
              {func: selectMenu, label: "メンズ",    id: "male",   value: "/?gender=male"  },
              {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"},
          ]);

    const menus = [
        {func: selectMenu, label: "商品登録",    icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon/>,   id: "history",  value: "/order/history"},
        {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ];

    useEffect(() => {
        db.collection('categories').orderBy("order", "asc").get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const category = snapshot.data()
                    list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
                })
                setFilters(prevState => [...prevState, ...list])
            });
    },[])

    const inputSearchKeyword = useCallback((event) => {
        setSearchKeyword(event.target.value)
    }, [setSearchKeyword])

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <div
                    onClose={(e) => props.onClose(e, false)}
                    onKeyDown={(e) => props.onClose(e, false)}
                >
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false} label={"キーワードを入力"} multiline={false}
                            onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            ((isAdministrator && menu.id === "register") || menu.id !== "register") && (
                                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} />
                                </ListItem>
                            )
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    );
}

export default ClosableDrawer