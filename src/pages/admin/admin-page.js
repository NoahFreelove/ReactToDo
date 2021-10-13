import adminList from "../../config"
import {useState} from "react";
import {DownloadData} from "../../lib/firebase.util";


export function AdminPage(props){
    const [isAdmin, setIsAdmin] = useState(false)

    if(props.user === null){
        return(<div>You need to be logged in to use this feature!</div>)
    }

    if(props.isAdmin(props.user))
    {
        return(
            <div>You are a admin</div>
        )
    }
    else {
        return(
            <div>You don't have access to this page</div>
        )
    }

}

export default AdminPage
