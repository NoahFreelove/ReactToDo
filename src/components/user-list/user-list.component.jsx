import React from "react";

export function UserList(props){
    return(
        <div>
            User List:
            {(props.users==null)? " No Users": props.users.map(r => (<div>{r}</div>))}
        </div>
    )
}
export default UserList
