import {auth as initializedAuth, DownloadData, UploadData} from "../../lib/firebase.util";
import Login from "../login/login.page";
import React, {useState} from "react";
import {Button} from "../../components/button/button.component";
import {Redirect} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Grid} from "@mui/material";

let downloadedData = false;

const loadData = async (setTasks, setUsername) => {

        if(!downloadedData)
        {
            downloadedData = true
        }
        else {return}
        try {
            let downloadedContent = await DownloadData()
            setTasks(downloadedContent[0])
            setUsername(downloadedContent[1])
        }
        catch{}

}

export function Home(props) {

    const [username, setUsername] = useState()
    const [tasks, setTasks] = useState()

    let loggedIn = (props.user !== undefined)

    if(loggedIn)
    {
        loadData(setTasks,setUsername)
    }

    //<Button title={"ClickMe"} onClick={()=>{console.log(props.user)}}/>
    if (loggedIn) {
        return (
            <div>
                <pre/>
                <Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Welcome {username}
                        </Typography>
                    </Grid>
                </Grid>
                <pre/>

                <Button title={"View Tasks"} backgroundColor={"#e24076"}/>

            </div>
        )
    } else {
        return (
            <Redirect to={"/login"}/>
        )
    }


}
