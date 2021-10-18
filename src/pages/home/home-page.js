import React, {useEffect, useState} from 'react'
import { Button } from '../../components/button/button.component'
import { Redirect, useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Grid } from '@mui/material'

let username
let taskNum = 0
let isAdmin = false
export function Home (props) {
    const history = useHistory()

    const [tasks, setTasks] = useState()
    const loggedIn = (props.user !== undefined)

    useEffect(() => {
        props.ReDownloadContent()
    },[])

    if (loggedIn) {
        username = props.downloadedContent[1]
        taskNum = props.downloadedContent[0].length
        isAdmin = props.isAdmin(props.user)

        if(taskNum === undefined) {
            taskNum = "no"
        }
    }

  // <Button title={"ClickMe"} onClick={()=>{console.log(props.user)}}/>
  if (loggedIn) {
    return (
            <div>
                <pre/>
                <Grid>
                    <Grid item>
                        <Typography variant="h5">
                            Welcome, {username}. You have {taskNum} {taskNum === 1? "task" : "tasks"}
                        </Typography>
                    </Grid>
                </Grid>
                <pre/>
                <div>
                <Button title={'View Tasks'}
                        backgroundColor={'#e24076'}
                        onClick={() => {history.push('/tasks')}}/>
                </div>
                <pre/>
                <div>
                {isAdmin?
                    <Button title={'Admin Page'}
                            backgroundColor={'#ab3059'}
                            onClick={() => {history.push('/admin')}}/>
                    : null}
                </div>
            </div>
    )
  } else {
    return (
            <Redirect to={'/login'}/>
    )
  }
}
