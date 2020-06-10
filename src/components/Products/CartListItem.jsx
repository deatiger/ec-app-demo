import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const CartListItem = (props) => {

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <img src={props.product.images[0]} alt="商品のTOP画像" />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
    );
}

export default CartListItem