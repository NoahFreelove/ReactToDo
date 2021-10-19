import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory} from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateIcon from '@mui/icons-material/Create';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {IconButton} from "@mui/material";
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
                {isAdmin()?<MenuItem className={"view-admin-page"} onClick={handleClose}><SecurityIcon/> Admin Page</MenuItem> : null}
            </div>
        )
    }
}


export function UserContextMenu (props) {
    let history = useHistory()
    let signedIn = (props.user !== undefined)
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
            <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}

                onClick={handleClick}
                style={{color: "#FFFFFF"}}
            ><MenuIcon/></IconButton>

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

