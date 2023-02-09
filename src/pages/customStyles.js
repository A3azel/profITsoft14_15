 import {alpha} from "@mui/material";

const bodyColor = '#202124';
const selectedElement = '#309CDD';
const customWhite = '#F0F0F0';
const customGray = '#979797';
const errorColor = '#B30909FF';

export const customStyles = {
    fieldStyles : {
        marginBottom: 2,
        marginLeft: '20px',
        width: '300px',
        borderRadius: '15px',
        '& label.Mui-focused': {
            color: selectedElement,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: selectedElement,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: customWhite,
            },
            '&:hover fieldset': {
                borderColor: selectedElement,
            },
            '&.Mui-focused fieldset': {
                boxShadow: `${alpha(selectedElement, 0.25)} 0 0 0 0.4rem`,
                borderColor: selectedElement,
            },
        },
        '& fieldset': {
            borderRadius: '15px',
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: customWhite
        },
    },

    errorFieldStyles : {
        marginBottom: 2,
        marginLeft: '20px',
        width: '300px',
        borderRadius: '15px',
        boxShadow: `${alpha(errorColor, 0.25)} 0 0 0 0.4rem`,
        borderColor: errorColor,
        '& label.Mui-focused': {
            color: selectedElement,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: errorColor,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: customWhite,
            },
            '&:hover fieldset': {
                borderColor: errorColor,
            },
            '&.Mui-focused fieldset': {
                borderColor: errorColor,
            },
        },
        '& fieldset': {
            borderRadius: '15px',
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: customWhite
        },
    },

    labelStyles : {
        color: customGray,
        fontsize: 10,
        marginBottom: '1px',
        fontFamily: 'Bold',
        marginLeft: '20px'
    },

    buttonStyles : {
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
    },

    beckButton : {
        backgroundColor: bodyColor,
        border: '2px solid #F0F0F0',
        borderRadius: '15px',
        width: '300px',
        "&:hover": {
            backgroundColor: '#b71c1c'
        },
        "&& .MuiTouchRipple-child": {
            backgroundColor: bodyColor
        }
    },

    paper: {
        position: "relative",
        margin: '10% 15% 10% 15%',
        padding: '50px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: bodyColor,
        boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
        "&:hover": {
            boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
        }
    },

    tablePaper: {
        position: "relative",
        margin: '5% 5% 5% 5%',
        padding: '50px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
        "&:hover": {
            boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
        }
    }
}