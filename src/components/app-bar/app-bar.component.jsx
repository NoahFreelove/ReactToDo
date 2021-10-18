import {AppBar, createTheme, Grid, IconButton, Link, Toolbar, Typography} from "@mui/material";
import {UserContextMenu} from "../user-context-menu/user-context-menu.component";
import React from "react";
import {Button} from "../button/button.component";
import {useHistory} from "react-router-dom";

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

export function Appbar  (props){
    let history = useHistory()
    return (
        <AppBar position="static" alignitems="center" theme={theme} color={"primary"}>
            <Toolbar>
                <Grid container direction="column">
                    <Grid item>
                        <Button title={"ToDo"}
                                backgroundColor={"rgba(255,255,255,0)"}
                                variant="text"
                                onClick={() => (history.push("/"))}
                                sx={{fontSize:"18px"}}
                        >

                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <UserContextMenu auth={props.auth} user={props.user} setUser={props.setUser} isAdmin={props.isAdmin}/>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
