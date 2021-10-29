import React, {useState} from 'react'
import {DeleteUserData, GetUsers} from '../../lib/firebase.util'
import {Input} from "../../components/input/input.component";
import {Button} from "../../components/button/button.component";
import {Alert, Typography} from "@mui/material";
import UserList from "../../components/user-list/user-list.component";

export function AdminPage (props) {
    const [userID, setUserID] = useState("")
    const [deletedData, setDeletedData] = useState()
    const [attemptedDeleteData, setAttemptedDeleteData] = useState()
    const [userList, setUserList] = useState(null)
    if (props.auth === null) {
      return (<div>You need to be logged in to use this feature!</div>)
    }

  async function DeleteData(){
        setAttemptedDeleteData(true)

        DeleteUserData(userID).then(r=>{
            setDeletedData(r)
        })
  }

  const RetrieveUserList = async () => {
      return await GetUsers()
  }

    async function SetUserList(){
        setUserList(await RetrieveUserList())
    }

  if (props.isAdmin(props.auth)) {
    return (
            <div>
              Delete a user&apos;s data. (Will not delete their account)
              <Input style={{width: 400}}
                     type="input"
                     placeholder="User ID"
                     onChange={event => setUserID(event.target.value)}
                     fullWidth
                     name="email"
                     variant="outlined"
              />
                <Typography variant={"subtitle"} color={"#ff0000"}>
                    Your User ID is: {props.user.uid}
                </Typography>
                <pre/>
                {deletedData? <Alert severity={"success"}> Deleted Data </Alert>: attemptedDeleteData? <Alert severity={"error"}>User does not exist!</Alert>  : null }
                <Button onClick={DeleteData} title={"Delete User Data"} backgroundColor={"#ff0000"}/>
                <pre/>
                <div>
                    <Button onClick={SetUserList} title={"Download User List"} backgroundColor={"#4043d5"}/>
                    <pre/>
                    <UserList users={userList}/>
                </div>
                <pre/>
            </div>
    )
  } else {
    return (
        <div>You don&apos;t have access to this page</div>
    )
  }
}

export default AdminPage
