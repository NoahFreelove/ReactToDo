import React from "react";
import './clock.component.css';
import {Typography} from "@mui/material";

export const Clock = ({ displayDate }) => (
    <div>
        <Typography component="h1" variant="h6">It's {displayDate}</Typography>
    </div>
)
