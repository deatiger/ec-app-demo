import React from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    full: {
        marginBottom: 16,
    },
    half: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 16,
        minWidth: 130,
        width: 'calc(50% - 16px)'
    }
})

const TextInput = (props) => {
    const classes = useStyles();
    const textStyle = props.fullWidth ? classes.full : classes.half;

    return (
        <TextField
            className={textStyle}
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