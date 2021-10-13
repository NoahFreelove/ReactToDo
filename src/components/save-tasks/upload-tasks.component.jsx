import {
    Alert,
    IconButton, Tooltip
} from "@mui/material";
import React, {useState} from "react";

import UploadTaskIcon from "@mui/icons-material/CloudUpload";
import ErrorIcon from "@mui/icons-material/Error";

import {UploadData} from "../../lib/firebase.util";

export function UploadTasks(props){
    const [uploadedTasks, setUploadedTasks] = useState();
    const [failedUpload, setFailedUpload] = useState(false);
    const handleClick = () => {
        UploadData(1, props.username, props.isAdmin, [props.tasks], props.db, props.auth).then( r => setFailedUpload(!r))
        setUploadedTasks(true)
        setTimeout(hideAlert, 3000)
    };

    const hideAlert = () => {
        setUploadedTasks(false)
        setFailedUpload(false)

    }
    return (
        <div>
            <Tooltip title="Save Tasks">
            <IconButton onClick={handleClick} sx={{ position: 'absolute', bottom: 16, right: 176, color: "#FFFFFF", width: 64, height: 64}} style={{ backgroundColor: '#9d2850' }}>
                <UploadTaskIcon/>
            </IconButton>
            </Tooltip>
            <pre/>
            {(uploadedTasks && !failedUpload)? <Alert icon={<UploadTaskIcon/>} severity="success"
                                   sx={{ position: 'absolute', bottom: 16, color: "#000000", width: 200, height: 32}}
            >Uploaded Tasks</Alert> : null}

            {failedUpload? <Alert icon={<ErrorIcon/>} severity="error"
                                   sx={{ position: 'absolute', bottom: 16, color: "#000000", width: 200, height: 32}}
            >Failed To Upload Tasks</Alert> : null}

        </div>
    );

}
