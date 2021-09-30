import {AppBar, createTheme, Grid, Toolbar, Typography} from "@mui/material";
import {UserContextMenu} from "../user-context-menu/user-context-menu.component";
import React from "react";

const theme = createTheme({
    palette: {
        primary: {
            light: '#f8bbd0',
            main: '#ec407a',
            dark: '#880e4f',
            contrastText: '#fff',
        },
    },
});

export const Appbar = (props)=>(
    <AppBar position="static" alignitems="center" theme={theme} color={"primary"}>
        <Toolbar>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6">{'ToDo List'}</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <UserContextMenu/>
            </Grid>

        </Toolbar>
    </AppBar>
)
