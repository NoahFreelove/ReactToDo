import React, {useState} from 'react';
import { LoginForm } from '../../components/login-form/login-form';
import { useHistory } from 'react-router-dom';
import {signInWithEmailAndPassword} from "@firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import {
    Alert,
    Grid,
} from "@mui/material";

import "./login.css"
import {Button} from "../../components/button/button.component";

export function Login(props) {
    let history = useHistory();
    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validLogin, setValidLogin] = useState(true)

    const Login = () => {
        signInWithEmailAndPassword(props.auth, username, password)
            .then((userCredential) => {
                // Signed in
                 props.setUser(userCredential.user)
                props.setSsologin(false)
                 history.push("/tasks")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setValidLogin(false)
            });
    }

    const ShowSSO = () => {
        signInWithPopup(props.auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                let firstName = result.user.displayName.split(" ")[0];
                props.setSsoName(firstName)
                props.setSsologin(true)
                props.setUser(user)
                history.push("/tasks")

                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage)
            // ...
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
                            ShowSSO={ShowSSO}
                        />
                    </Grid>
                </Grid>
            </div>
        )


}
export default Login
