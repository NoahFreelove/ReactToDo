import {Alert, Button as MuiButton, Grid, Typography} from "@mui/material";
import {Input} from "../../components/input/input.component";
import {Button} from "../../components/button/button.component";
import React, {useState} from "react";
import {createUserWithEmailAndPassword } from "@firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useHistory} from "react-router-dom";

export function SignUpPage(props)
{
    const [username, setUsername] = useState('user')
    const [email, setEmail] = useState('email')
    const [password, setPassword] = useState('pass')
    const [createdUser, setCreatedUser] = useState(false)
    let history = useHistory();
    const provider = new GoogleAuthProvider();

    const handleCreateAccount = async () => {

        createUserWithEmailAndPassword(props.auth, email, password)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                setCreatedUser(true)
                props.uploadData(0, username,[])
                // ...
            })
            .catch((error) => {
                /*const errorCode = error.code;
                const errorMessage = error.message;*/
                // ..
                setCreatedUser(false)
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
            <pre className="space"/>
            <Grid container direction="column" alignItems="center" justify="center">
                <Typography variant={"h4"}>Create a ToDo Account</Typography>
            </Grid>

            <form>
                <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                    <Grid item>
                        <Input style={{width: 400}}
                               type="input"
                               placeholder="E-mail"
                               onChange={event => setEmail(event.target.value)}
                               fullWidth
                               name="email"
                               variant="outlined"
                        />
                    </Grid>

                    <Grid item>
                        <Input style={{width: 400}}
                               type="input"
                               placeholder="Username"
                               onChange={event => setUsername(event.target.value)}
                               variant="outlined"
                        />
                    </Grid>

                    <Grid item>
                        <Input style={{width: 400}}
                               type="password"
                               placeholder="Password (must be at least 6 characters long)"
                               onChange={event => setPassword(event.target.value)}
                               fullWidth
                               name="password"
                               variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            title="Create Account"
                            className="button-click"
                            onClick={handleCreateAccount}
                            backgroundColor={"#ec407a"}
                            variant={"contained"}
                        />


                    </Grid>
                    <pre/>
                    <Typography>Sign up with google instead:</Typography>

                    <Grid item>
                        <MuiButton
                            onClick={ShowSSO}
                            variant={"contained"}
                            endIcon={ <GoogleIcon/>}
                        >
                            Sign Up With
                        </MuiButton>
                    </Grid>
                </Grid>
            </form>
            {createdUser? <Alert severity="success">Your Account Was Created!</Alert>
                : null}
        </div>
    )
}
