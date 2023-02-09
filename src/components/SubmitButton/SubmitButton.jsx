import React from 'react';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const bodyColor = '#202124';
const customGray = '#979797';

const useStyles = makeStyles(theme => ({
    buttonStyles : {
        color: "white",
        backgroundColor: bodyColor,
        border: '2px solid #F0F0F0',
        borderRadius: '15px',
        width: '300px',
        "&:hover": {
            backgroundColor: customGray
        },
        "&& .MuiTouchRipple-child": {
            backgroundColor: bodyColor
        }
    }
}));
function SubmitButton(props) {
    const classes = useStyles();

    return (
        <Button
            className={classes.buttonStyles}
            type={"submit"}
            variant="contained"
            onClick={props.onClick}
        >
            {props.buttonText}
        </Button>
    );
}

export default SubmitButton;