import React from "react";
import {Input} from "../input/input.component";
import {Button} from "../button/button.component";
import {useHistory} from "react-router-dom";
import {
    Grid,
    Typography,
} from "@mui/material";

import "./login-form.css";
import {signInWithEmailAndPassword} from "@firebase/auth";

export function LoginForm(props)
{



    let history = useHistory();
return(
    <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Typography variant={"h3"}>Welcome, </Typography>
                <Typography component="h1" variant="h5">
                    Sign In:
                </Typography>
            </Grid>

            <form>
                <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                    <Grid item>
                        <Input style={{width: 400}}
                               type="input"
                               placeholder="E-mail"
                               onChange={props.changeUsername}
                               variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Input style={{width: 400}}
                               type="password"
                               placeholder="Password"
                               onChange={props.changePassword}
                               fullWidth
                               name="password"
                               variant="outlined"
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            title="Submit"
                            className="button-click"
                            onClick={props.onButtonClick}
                            backgroundColor={"#ec407a"}
                            variant={"contained"}
                        />

                    </Grid>
                    <Grid item>
                        <Button
                            title="Sign Up"
                            className="button-click"
                            onClick={() => (history.push("/signup"))}

                            style={{backgroundColor:"#ff5353"}}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            title="Forgot Password"
                            className="button-click"
                            onClick={() => (history.push("/forgot"))}

                            style={{ fontSize: '11px', backgroundColor:"#000000"}}
                        />
                    </Grid>
                </Grid>

            </form>
    </div>
)
}
