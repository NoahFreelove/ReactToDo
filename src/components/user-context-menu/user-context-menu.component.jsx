import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from "@mui/material";
import {useHistory} from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateIcon from '@mui/icons-material/Create';

function ShowAccount(handleClose, signedIn,user, isAdmin){
    if(!signedIn)
    {
        return(<div/>)
    }
    else {
        return(
            <div>
                <MenuItem className={"home"} onClick={handleClose}><HomeIcon/>Home</MenuItem>
                <MenuItem className={"tasks"} onClick={handleClose}><CreateIcon/> View Tasks</MenuItem>
                {isAdmin(user)?<MenuItem className={"view-admin-page"} onClick={handleClose}><SecurityIcon/> Admin Page</MenuItem> : null}
            </div>
        )
    }
}


export function UserContextMenu (props) {
    let history = useHistory()
    let signedIn = (props.user !== undefined)
    let signInOutText =  !signedIn? "Sign In" : "Sign Out"
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        if (event.currentTarget.className.includes("tasks")) {
            history.push("/tasks")
        } else if (event.currentTarget.className.includes("sign in/out")) {
            props.setUser(undefined)
            props.auth.signOut()
            history.push("/login")

        } else if (event.currentTarget.className.includes("create-account")) {
            history.push("/signup")
        }
        else if (event.currentTarget.className.includes("view-admin-page")) {
            history.push("/admin")
        }
        else if (event.currentTarget.className.includes("home")) {
            history.push("/")
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
                {ShowAccount(handleClose, signedIn, props.user, props.isAdmin)}
                {!signedIn?
                    <MenuItem className={"sign in/out"} onClick={handleClose}><AccountBoxIcon/>Sign In</MenuItem>:
                    <MenuItem className={"sign in/out"} onClick={handleClose}><ExitToAppIcon/>Sign Out</MenuItem>
                }

                {!signedIn?
                    <MenuItem className={"create-account"} onClick={handleClose}><AddBoxIcon/> Sign Up</MenuItem>
                    :
                    null}

            </Menu>
        </div>

    )
}

