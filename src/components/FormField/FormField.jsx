import React from 'react';
import {Container, Typography} from "@mui/material";

const customWhite = '#F0F0F0';
function FormField(props) {

    const typographyStyles ={
        color: customWhite,
        fontSize: 36,
        marginBottom: 2,
        fontFamily: 'Bold',
        textAlign: 'center',
    }

    return (
        <Container>
            <Typography sx={typographyStyles}>
                {props.title}
            </Typography>
        </Container>
    );
}

export default FormField;