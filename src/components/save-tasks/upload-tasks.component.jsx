import {
    Alert,
    IconButton, Tooltip
} from "@mui/material";
import React, {useState} from "react";

import UploadTaskIcon from "@mui/icons-material/CloudUpload";

export function UploadTasks(props){
    const [uploadedTasks, setUploadedTasks] = useState();
    const handleClick = () => {
        setUploadedTasks(true)
        setTimeout(hideAlert, 3000)
        props.uploadData(1,props.username,[props.tasks])
    };

    const hideAlert = () => {
        setUploadedTasks(false)
    }
    return (
        <div>
            <Tooltip title="Save Tasks">
            <IconButton onClick={handleClick} sx={{ position: 'absolute', bottom: 16, right: 176, color: "#FFFFFF", width: 64, height: 64}} style={{ backgroundColor: '#9d2850' }}>
                <UploadTaskIcon/>
            </IconButton>
            </Tooltip>
            <pre/>
            {uploadedTasks? <Alert icon={<UploadTaskIcon/>} severity="success"
                                   sx={{ position: 'absolute', bottom: 16, color: "#000000", width: 200, height: 32}}
            >Uploaded Tasks</Alert> : null}

        </div>
    );

}
