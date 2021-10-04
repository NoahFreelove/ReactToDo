import React, {useState} from 'react';
import { LoginForm } from '../../components/login-form/login-form';
import { useHistory } from 'react-router-dom';
import {signInWithEmailAndPassword} from "@firebase/auth";

import {
    Alert,
    Grid,
} from "@mui/material";

import "./login.css"

export function Login(props) {

    let history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validLogin, setValidLogin] = useState(true)
    const Login = () => {
        signInWithEmailAndPassword(props.auth, username, password)
            .then((userCredential) => {
                // Signed in
                 props.setUser(userCredential.user)
                 history.push("/tasks")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setValidLogin(false)
            });
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
                        />

                    </Grid>
                </Grid>
            </div>
        )


}
export default Login
