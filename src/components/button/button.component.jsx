import React from "react";
import './button.component.css'
import {Button as MButton} from '@mui/material'

export const Button = ({ title, type, variant = "contained", backgroundColor = "#363a44", ...props }) => (
    <MButton
        style={{backgroundColor:backgroundColor}}
        variant={variant}
        type={type}
        { ...props }
    >
        {title}
    </MButton>
)
