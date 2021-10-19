import React from 'react'
import {Typography} from "@material-ui/core";
import {Button} from "../../components/button/button.component";

export function CheckFourZeroFourPage(props)
{
    let history = props.history
    let validPages = ["/login", "/", "/signup", "/forgot", "/tasks", "/admin"]
    let isValidPage;

    for (let i = 0; i < validPages.length; i++) {
        if(validPages[i] === history.location.pathname)
        {
            isValidPage = true;
            break;
        }
    }

    function ReturnToLogin()
    {
        history.push("/login")
        window.location.reload(false);
    }

    return(
        <div>
            {isValidPage? null:
                <div>
                    <Typography variant={"h4"}>
                        This page does not exist
                    </Typography>
                    <Button title={"Return To Login"} backgroundColor={"#e24076"} onClick={ReturnToLogin}/>

                </div>}
        </div>
    )
}
