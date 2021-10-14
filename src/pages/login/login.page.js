import React, {useState} from 'react';
import { LoginForm } from '../../components/login-form/login-form';
import { useHistory } from 'react-router-dom';
import {signInWithEmailAndPassword} from "@firebase/auth";
import {ShowSSO, SignInWithPassword} from "../../lib/firebase.util"
import {
    Alert,
    Grid,
} from "@mui/material";

import "./login.css"
import {Button} from "../../components/button/button.component";

export function Login(props) {
    let history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validLogin, setValidLogin] = useState(true)

    const Login = async () => {
         await SignInWithPassword(props.auth, username, password).then(r =>{
            if(r[0])
            {
                props.setUser(r[0])
                setValidLogin(true)
                props.setSsologin(false)
                history.push("/tasks")
                return;
            }
            setValidLogin(false)
        })

    }

     const SingleSignOn = async() => {
         props.setSsologin(true)
         await ShowSSO(false, props.setUser).then(r=>{props.setSsoName(r);history.push("/tasks")})

     }

        return(
            <div>
                {(!validLogin)? <Alert severity={"error"}>Your Username or Password was incorrect</Alert> : null}
                <Grid container spacing={0} justify="center" direction="row">

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >

                        <LoginForm
                            onButtonClick={Login}
                            changeUsername={event => setUsername(event.target.value)}
                            changePassword={event => setPassword(event.target.value)}
                            auth={props.auth}
                            ShowSSO={SingleSignOn}
                        />
                    </Grid>
                </Grid>
            </div>
        )


}
export default Login
