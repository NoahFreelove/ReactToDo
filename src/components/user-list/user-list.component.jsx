import React from "react";

export function UserList(props){
    return(
        <div>
            User List:
            {(props.users==null)? " No Users": props.users.map((r, i) => (<div key={i}>{r}</div>))}
        </div>
    )
}
export default UserList
