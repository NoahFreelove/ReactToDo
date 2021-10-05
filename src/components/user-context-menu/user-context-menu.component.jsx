import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from "@mui/material";
import {useHistory} from "react-router-dom";

function ShowAccount(handleClose, user){
    if((user === undefined || null))
    {
        return(<div/>)
    }
    else {
        return(
            <div>
                <MenuItem className={"tasks"} onClick={handleClose}>View Tasks</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </div>
        )
    }
}

export function UserContextMenu (props){

    let history = useHistory()

    let signedIn = (props.user === undefined)

    let options =  signedIn? "Sign In" : "Sign Out"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        if (event.currentTarget.className.includes("tasks")) {
            console.log("view profile")
        } else if (event.currentTarget.className.includes("sign in/out")) {
            props.setUser(undefined)
            history.push("/")

        } else if (event.currentTarget.className.includes("create-account")) {
            props.setUser(undefined)
            history.push("/signup")
        }
    }

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
                {ShowAccount(handleClose, props.user)}

                <MenuItem className={"sign in/out"} onClick={handleClose}>{options}</MenuItem>
                {signedIn?
                    <MenuItem className={"create-account"} onClick={handleClose}>Sign Up</MenuItem>
                    :
                    null}
            </Menu>
        </div>

    )
}

