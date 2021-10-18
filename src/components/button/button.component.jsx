import React from "react";
import {Button as MButton} from '@mui/material'

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

