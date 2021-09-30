import React, {useState} from 'react';
import { LoginForm } from '../../components/login-form/login-form';
import { useHistory } from 'react-router-dom';

import {
    Grid,
} from "@mui/material";

import "./login.css"

export function Login(props) {

    let history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    function verifyLoginInfo()
    {
        console.log(props.users)
        for (let i = 0; i < props.users.length; i++) {
            if(username === props.users[i].username && password === props.users[i].password)
            {
                console.log(props.users[i].username)
                console.log(props.users[i].password)
                return true;
            }
        }
        return false;

    }
    const SubmitLoginInfo = () => {
        if(verifyLoginInfo())
        {
            history.push(`/tasks?user=${username}`)
        }
        else
        {

        }
    }

        return(
            <div>
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >
                        <LoginForm
                            onButtonClick={SubmitLoginInfo}
                            changeUsername={event => setUsername(event.target.value)}
                            changePassword={event => setPassword(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </div>
        )


}
export default Login
