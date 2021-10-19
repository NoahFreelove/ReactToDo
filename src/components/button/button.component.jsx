import React from "react";
import {Button as MButton} from '@mui/material'
import PropTypes from "prop-types";

export function Button ({title, type, variant = "contained", backgroundColor = "#363a44", ...props}){
        return (
            <MButton
                style={{backgroundColor:backgroundColor, color:"#FFFFFF"}}
                variant={variant}
                type={type}
                { ...props }
            >
                    {title}
            </MButton>
        )
}
Button.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    backgroundColor: PropTypes.string
}
/*export const Button= ( title, type, variant = "contained", backgroundColor = "#363a44", ...props ) =>
 (
        <MButton
            style={{backgroundColor:backgroundColor}}
            variant={variant}
            type={type}
            { ...props }
        >
            {title}
        </MButton>
    )*/

