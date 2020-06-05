import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        marginBottom: 16
    }
})

const TextInput = (props) => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.root}
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    );
};

export default TextInput;