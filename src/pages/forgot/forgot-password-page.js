import { sendPasswordResetEmail } from '@firebase/auth'
import React, { useState } from 'react'
import { Alert, Input, Typography } from '@mui/material'
import { Button } from '../../components/button/button.component'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { PasswordReset } from '../../lib/firebase.util'

export function ForgotPasswordPage (props) {
  let email
  const history = useHistory()
  const [createdUser, setCreatedUser] = useState()

  const handlePasswordReset = async () => {
    await PasswordReset(email)
  }

  const handleClick = () => {
    history.push('/')
  }

  return (
        <div>
            <pre className="space"/>
            <Grid container direction="column" alignItems="center" justify="center">
                <Typography variant={'h5'}>Reset Password</Typography>

                <Input style={{ width: 400 }}
                       type="input"
                       placeholder="E-mail"
                       onChange={event => (email = event.target.value)}
                       fullWidth
                       name="email"
                       variant="outlined"
                />
                <pre className="space"/>

                <Button
                    title="Reset Password"
                    className="button-click"
                    onClick={handlePasswordReset}
                    backgroundColor={'#ec407a'}
                    variant={'contained'}
                />
                <pre className="space"/>

                {createdUser
                  ? (<Grid container direction="column" alignItems="center" justify="center">
                        <Alert severity="success">Password Reset Email Sent!
                            <pre/>
                        <Button
                        title="Sign in"
                        className="button-click"
                        onClick={handleClick}
                        sx={{ fontSize: '12px', color: '#000000' }}
                        backgroundColor={'#59b26a'}
                        variant={'contained'}

                    />
                        </Alert></Grid>)
                  : null}

            </Grid>
        </div>
  )
}
