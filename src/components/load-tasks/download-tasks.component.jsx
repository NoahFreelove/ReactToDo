import {
    Alert,
    IconButton, Tooltip
} from "@mui/material";
import React, {useState} from "react";
import LoadTaskIcon from "@mui/icons-material/CloudDownload";

export function LoadTasks(props){


    const [downloadedTasks, setDownloadedTasks] = useState();
    const handleClick = () => {
        setDownloadedTasks(true)
        setTimeout(hideAlert, 3000)
        props.loadTasks()
    };

    const hideAlert = () => {
        setDownloadedTasks(false)
    }


    return (
        <div>
            <Tooltip title="Download Tasks">
            <IconButton onClick={handleClick} sx={{ position: 'absolute', bottom: 16, right: 96, color: "#FFFFFF", width: 64, height: 64}} style={{ backgroundColor: '#9d2850' }}>
                <LoadTaskIcon/>
            </IconButton>
            </Tooltip>
            <pre/>
            {downloadedTasks? <Alert icon={<LoadTaskIcon/>} severity="success"
                                   sx={{ position: 'absolute', bottom: 16, color: "#000000", width: 200, height: 32}}
            >Downloaded Tasks</Alert> : null}
        </div>
    );

}
