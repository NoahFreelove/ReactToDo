import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from "@mui/material";
import {useHistory} from "react-router-dom";
function ShowAccount(handleClose){
    if((window.location.href.split("=")[1] === undefined))
    {
        return(<div/>)
    }
    else {
        return(
            <div>
                <MenuItem className={"profile"} onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </div>
        )
    }
}

export function UserContextMenu (){

    let history = useHistory()

    let signedIn = (window.location.href.split("=")[1] === undefined)

    let options =  signedIn? "Sign In" : "Sign Out"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        if(event.currentTarget.className.includes("profile"))
        {
            console.log("view profile")
        }
        else if(event.currentTarget.className.includes("sign in/out"))
        {
            console.log("sign in/out")
            history.push("/")

        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}

                onClick={handleClick}
                startIcon={<Avatar/>}
                style={{color: "#FFFFFF"}}
            >
                Account
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {ShowAccount(handleClose)}

                <MenuItem className={"sign in/out"} onClick={handleClose}>{options}</MenuItem>
            </Menu>
        </div>

    )
}

