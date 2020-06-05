import React, {useState} from 'react';
import IconButton        from '@material-ui/core/IconButton';
import AssignmentIcon    from '@material-ui/icons/Assignment';
import Tooltip           from '@material-ui/core/Tooltip';
import CopyToClipBoard   from 'react-copy-to-clipboard';
import {
    FormControl,
    Input,
    InputAdornment,
    InputLabel
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStlyes = makeStyles({
    root: {
        marginBottom: 32,
        width: '100%'
    }
})

const TextWithCopyButton = (props) => {
    const classes = useStlyes()
    const [input,   setInput]   = useState(props.text);
    const [openTip, setOpenTip] = useState(false);

    const handleChangeText = (e) => {
        setInput(e.target.value);
    };

    const handleCloseTip = () => {
        setOpenTip(false);
    };

    const handleClickButton = () => {
        setOpenTip(true);
    };

    return (
        <FormControl
            className={classes.root}
            variant='standard'
        >
            <InputLabel htmlFor="standard-adornment-password">{props.label}</InputLabel>
            <Input
                disabled={props.isEditable}
                fullWidth
                onChange={handleChangeText}
                type='text'
                value={input}
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip
                            arrow
                            open={openTip}
                            onClose={handleCloseTip}
                            disableHoverListener
                            placement='top'
                            title='Copied!'
                        >
                            <CopyToClipBoard text={input}>
                                <IconButton
                                    disabled={input === ''}
                                    onClick={handleClickButton}
                                >
                                    <AssignmentIcon />
                                </IconButton>
                            </CopyToClipBoard>
                        </Tooltip>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default TextWithCopyButton;