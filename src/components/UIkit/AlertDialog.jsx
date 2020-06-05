import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from "react-redux";

const AlertDialog = (props) => {
    const dispatch = useDispatch();

    return (
        <div>
            <Dialog
                open={props.clicked}
                onClose={() => props.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose()} color="primary" autoFocus>
                        いいえ
                    </Button>
                    <Button onClick={() => {
                        dispatch(props.function(props.id))
                        props.handleClose()   // Close dialog after dispatching redux-action
                    }} color="primary">
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog