import React, {useState} from "react";
import RemoveIcon from '@mui/icons-material/Delete';
import {Card, IconButton} from "@mui/material";
import {Grid} from "@material-ui/core";


export function Task ({name, deadline, expires ,expired, id, removeHandler}){

    const [raised, setRaised] = useState()

    const handleMouseOver = () =>{
        setRaised(true)
    }

    const handleMouseLeave = () =>{
        setRaised(false)
    }

    return(
        <div>
            <pre className="space"/>
            <Grid container justifyContent="center" alignItems="center">
                <Card onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
                      style={{background: expired ? "#ff0055" : "#f86fa0", width:"700px", alignContent:"center"}} raised={raised}>
                        {expired? `${name} Deadline Reached!` : `Complete: ${name}`} {expires? `before ${deadline}` : ``}
                    <IconButton onClick={() => removeHandler(id)}
                                sx={{color: "#FFFFFF", width: 32, height: 32}
}                               style={{ backgroundColor: 'transparent' }}>
                        <RemoveIcon/>
                    </IconButton>
                </Card>
            </Grid>
        </div>
)
}
