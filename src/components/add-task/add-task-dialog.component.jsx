import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  Switch,
  createTheme,
  FormControlLabel
} from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import { Input } from '../input/input.component'
import NewTaskIcon from '@mui/icons-material/Add'
import { Tooltip } from '@material-ui/core'

let invalidEntry = { invalid: false, reason: '' }

export function AddTaskDialog (props) {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#f8bbd0',
        main: '#ec407a',
        dark: '#880e4f',
        contrastText: '#fff'
      }
    }
  })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        if(event.target.className.toString().includes("submit"))
        {
            invalidEntry = props.onClick()

            if(invalidEntry.invalid)
            {
                return;
            }
        }
        setOpen(false);
    };


    return (
        <div>
            <Tooltip title="Create New Task">
            <IconButton onClick={handleClickOpen} sx={{ position: 'absolute', bottom: 16, right: 16, color: "#FFFFFF", width: 64, height: 64}} style={{ backgroundColor: '#ec407a' }}>
                <NewTaskIcon/>
            </IconButton>
            </Tooltip>
            <Dialog variant="contained" open={open} onClose={handleClose}>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill out the required forms to create a new task.
                    </DialogContentText>

                    {invalidEntry.invalid? <Typography color={"red"}>{invalidEntry.reason}</Typography> : null}
                    <Input
                        name="newTaskTitle"
                        onChange={props.handleChange}
                        style={{backgroundColor: "#ffffff", borderRadius: "10px", alignItems:"center", justifyItems: "center", width: "400px"}}
                        placeholder={"Enter Task Name"}
                    />
                    <pre className="space"/>
                    <FormControlLabel control={
                        <Switch checked={props.newExpires} theme={theme} color={"primary"}
                                name="newExpires"
                                onChange={props.handleCheckChange}
                        />} label="Set Task Expiration" />
                    {props.newExpires? <Input
                        type="time"
                        name="newTaskDeadline"
                        onChange={props.handleChange}
                        style={{backgroundColor: "#ffffff", borderRadius: "10px", alignItems:"center", justifyItems: "center", width: "400px"}}
                        value={props.newTaskDeadline}
                    /> : null
                    }


                </DialogContent>
                <DialogActions>
                    <Button className={"cancel"} onClick={handleClose}>Cancel</Button>
                    <Button className={"submit"} onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>

        </div>
    );

}
