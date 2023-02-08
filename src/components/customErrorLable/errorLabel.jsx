import React from 'react';
import {Typography} from "@mui/material";

function ErrorLabel(props) {
    const errorStyles ={
        color:"red",
        marginLeft: '60px',
    }
    return (
        <Typography sx={errorStyles}>
            {props.errorMassage}
        </Typography>
    );
}

export default ErrorLabel;