import {Grid, Typography} from "@mui/material";
import {Input} from "../../components/input/input.component";
import {Button} from "../../components/button/button.component";
import React, {useState} from "react";
import {createUserWithEmailAndPassword } from "@firebase/auth";









export function SignUpPage(props)
{
    const [username, setUsername] = useState('user')
    const [email, setEmail] = useState('email')
    const [password, setPassword] = useState('pass')

    const handleCreateAccount = async () => {
        console.log(email)
        console.log(password)
        console.log(username)

        createUserWithEmailAndPassword(props.auth, email, password)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                console.log("created")
                // ...
            })
            .catch((error) => {
                /*const errorCode = error.code;
                const errorMessage = error.message;*/
                // ..
            });

    }
        /*props.setUsers(props.users.push({username: username, password:password, email:email}))
        history.push("/login")*/


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
                               placeholder="Password"
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
                </Grid>

            </form>
        </div>
    )
}
