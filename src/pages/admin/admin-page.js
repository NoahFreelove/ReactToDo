import adminList from '../../config'
import React, { useState } from 'react'
import {DeleteUserData, DownloadData} from '../../lib/firebase.util'
import {Input} from "../../components/input/input.component";
import {Button} from "../../components/button/button.component";
import {Alert} from "@mui/material";

export function AdminPage (props) {
    const [userID, setUserID] = useState("")
    const [deletedData, setDeletedData] = useState()
    if (props.user === null) {
      return (<div>You need to be logged in to use this feature!</div>)
    }

  async function DeleteData(){
        DeleteUserData(userID).then(r=>{
            setDeletedData(r)
        })
  }

  if (props.isAdmin(props.user)) {
    return (
            <div>
              Delete a user's data. (Will not delete their account)
              <Input style={{width: 400}}
                     type="input"
                     placeholder="User ID"
                     onChange={event => setUserID(event.target.value)}
                     fullWidth
                     name="email"
                     variant="outlined"
              />
                <Button onClick={DeleteData} title={"Delete User Data"} backgroundColor={"#ff0000"}/>
                {deletedData? <Alert severity={"success"}> Deleted Data </Alert>: null }
            </div>
    )
  } else {
    return (
            <div>You don't have access to this page</div>
    )
  }
}

export default AdminPage
