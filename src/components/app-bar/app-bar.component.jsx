import {AppBar, createTheme, Grid, Toolbar, Typography} from "@mui/material";
import {UserContextMenu} from "../user-context-menu/user-context-menu.component";
import React from "react";
import {Button} from "../button/button.component";

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
                <UserContextMenu auth={props.auth} user={props.user} setUser={props.setUser} isAdmin={props.isAdmin}/>
            </Grid>

        </Toolbar>
    </AppBar>
)
