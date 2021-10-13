import {auth as initializedAuth} from "../../lib/firebase.util";
import Login from "../login/login.page";
import React from "react";
import {Button} from "../../components/button/button.component";
import {Redirect} from "react-router-dom";

/*function IsLoggedIn(property) {
    try {

        return property.currentUser;
    } catch (e) {
        return null;
    }
}*/

export function Home(props) {
    let loggedIn = (props.user !== undefined)
    console.log(props.user)
    //<Button title={"ClickMe"} onClick={()=>{console.log(props.user)}}/>
    if(loggedIn)
    {
        return(
            <div>
               Welcome
            </div>
        )
    }
    else
    {
        return(
            <Redirect to={"/login"}/>
        )
    }


}
