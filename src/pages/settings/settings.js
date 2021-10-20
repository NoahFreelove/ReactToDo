/* eslint-disable */
import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {Input} from "../../components/input/input.component";// eslint-disable-line no-unused-vars
import {ArrayToMap, UploadData} from "../../lib/firebase.util";// eslint-disable-line no-unused-vars
import {Button} from "../../components/button/button.component";
import {Alert} from "@mui/material";

export function Settings(props){
    const loggedIn = (props.user !== undefined)
    const [settings, setSettings] = useState({avatar:""})
    const [avatarURL, setAvatarURL] = useState()
    const [savedSettings, setSavedSettings] = useState()

    function ChangeAvatar(e)// eslint-disable-line no-unused-vars
    {
        setAvatarURL(e.target.value)
    }

    function HandleSaveSettings()
    {
        console.log(avatarURL)

        setSavedSettings(true)
        SaveSettings().then((r) => r? setSavedSettings(false):setSavedSettings(true))
    }
    async function SaveSettings()// eslint-disable-line no-unused-vars
    {
        try {
            settings.avatar = avatarURL
            await UploadData(1,
                [props.downloadedContent[0]],
                props.downloadedContent[1],
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
                    Set Avatar
                    <Input style={{width: 400}}
                           type="input"
                           placeholder={"Avatar URL"}
                           onChange={ChangeAvatar}
                           variant="outlined"
                           labelText={settings.avatar}

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
