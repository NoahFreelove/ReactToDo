import React from "react";
import {Input} from "../input/input.component";
import {Button} from "../button/button.component";
import {Button as MuiButton, Link} from '@mui/material';

import {useHistory} from "react-router-dom";
import {
    Grid,
    Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./login-form.css";

export function LoginForm(props)
{
    let history = useHistory();

return(
    <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Typography variant={"h3"}>Welcome, </Typography>
                <Typography data-testid={"typograff"} component="h1" variant="h5">
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
                        /> <Link variant={"body2"} onClick={() => (history.push("/forgot"))}>
                        Forgot?
                    </Link>
                    </Grid>

                    <Grid item>
                        <Button
                            title="Sign In"
                            className="button-click"
                            onClick={props.onButtonClick}
                            backgroundColor={"#ec407a"}
                            variant={"contained"}
                            sx={{margin:"5px"}}
                        />

                        <MuiButton
                            onClick={ props.ShowSSO }
                            variant={"contained"}
                            endIcon={ <GoogleIcon/>}
                        >
                            Sign In With
                        </MuiButton>

                    </Grid>

                    <Grid item>
                        <Typography >Don't Have A ToDo Account?</Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            title="Create Account"
                            className="button-click"
                            onClick={() => (history.push("/signup") )}
                            style={{backgroundColor:"#ec417a"}}
                        />

                    </Grid>


                </Grid>

            </form>

    </div>
)
}
