import adminList from "../../config"

export function AdminPage(props){
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
