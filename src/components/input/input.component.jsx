import React from "react";
import { TextField } from "@mui/material";

export const Input = ({labelText, autoFocus, ...props}) => (
    <div>
        <TextField
            variant="outlined"
            fullWidth
            autoFocus={autoFocus}
            {...props}
        />
    </div>
)
