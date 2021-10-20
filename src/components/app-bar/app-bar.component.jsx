import {AppBar, createTheme, Grid, Toolbar, Avatar} from "@mui/material"; // eslint-disable-line no-unused-vars
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
    if(props.downloadedContent !== undefined){
        return (
            <AppBar position="static" theme={theme} color={"primary"}>
                <Toolbar>
                    <Grid container spacing={2} direction="row">
                        <Grid item xs={5.5}>
                            <Button title={"ToDo"}
                                    backgroundColor={"rgba(255,255,255,0)"}
                                    variant="text"
                                    onClick={() => (history.push("/"))}
                                    sx={{fontSize:"18px"}}
                            >

                            </Button>
                        </Grid>
                        <Grid item xs={5.5}>
                            {(props.downloadedContent.length===4)?
                                (props.downloadedContent[1] === '')?
                                    null :
                                    (props.downloadedContent[3].avatar === '')?
                                        <Avatar sx={{ backgroundColor: "#1a71c9"}}>{props.downloadedContent[1].charAt(0)}</Avatar> :
                                        <Avatar><img src={props.downloadedContent[3].avatar} alt={"avatar"}/></Avatar>
                                :
                                null}
                        </Grid>
                        <Grid item xs={1}>
                            <UserContextMenu auth={props.auth} user={props.user} setUser={props.setUser} isAdmin={props.isAdmin}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
    else {
        return (
            <AppBar position="static" theme={theme} color={"primary"}>
                <Toolbar>
                    <Grid container spacing={2} direction="row">
                        <Grid item xs={5.5}>
                            <Button title={"ToDo"}
                                    backgroundColor={"rgba(255,255,255,0)"}
                                    variant="text"
                                    onClick={() => (history.push("/"))}
                                    sx={{fontSize:"18px"}}
                            >

                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <UserContextMenu auth={props.auth} user={props.user} setUser={props.setUser} isAdmin={props.isAdmin}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }

}
