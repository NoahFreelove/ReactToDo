/* eslint-disable */
import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Input} from "../../components/input/input.component";
import {UploadData} from "../../lib/firebase.util";
import {Button} from "../../components/button/button.component";
import {Alert} from "@mui/material";

export function Settings(props){
    const loggedIn = (props.user !== undefined)
    const [settings, setSettings] = useState({avatar:""})
    const [avatarURL, setAvatarURL] = useState()
    const [username, setUsername] = useState()
    const [savedSettings, setSavedSettings] = useState()

    function ChangeAvatar(e)
    {
        setAvatarURL(e.target.value)
    }

    function ChangeUsername(e)
    {
        if(e.target.value.toString().length > 25)
        {
            setUsername(username)
        }
        else {
            setUsername(e.target.value)
        }
    }

    function HandleSaveSettings()
    {
        setSavedSettings(true)
        SaveSettings().then((r) => r? setSavedSettings(false):setSavedSettings(true))
    }

    async function SaveSettings()
    {
        try {
            settings.avatar = avatarURL
            await UploadData(1,
                [props.downloadedContent[0]],
                username,
                props.downloadedContent[2],
                settings)
        }catch (e)
        {
            console.log(e)
        }

    }
    useEffect(()=>{
        props.ReDownloadContent()
        setAvatarURL(props.downloadedContent[3].avatar)
        setUsername(props.downloadedContent[1])

        setSettings({avatar: props.downloadedContent[3]})
    },[])
    if(loggedIn)
    {
        return(
            <div>
                <Typography variant="h4">
                Settings
                </Typography>
                <pre/>
                <Typography variant={"body1"}>
                    Set Avatar (64x64 works best)
                    <Input style={{width: 400}}
                           type="input"
                           placeholder={"Avatar URL"}
                           onChange={ChangeAvatar}
                           variant="outlined"
                           value={avatarURL}
                    />
                </Typography>

                <Typography variant={"body1"}>
                    Set Username (Keep to 25 characters)
                    <Input style={{width: 400}}
                           type="input"
                           placeholder={"Avatar URL"}
                           onChange={ChangeUsername}
                           variant="outlined"
                           value={username}
                    />
                </Typography>

                <Button title={"Save Settings"} backgroundColor={"#48ce53"} onClick={HandleSaveSettings}/>
                {savedSettings? <Alert severity={"success"} >Your Settings Were Saved</Alert> : null}
            </div>
        )
    }
    else {
        return(
            <Redirect to={"/login"}/>
        )
    }
}

export default Settings
