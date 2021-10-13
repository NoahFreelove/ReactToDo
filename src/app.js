// noinspection JSCheckFunctionSignatures

import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, useHistory,} from "react-router-dom";

import Login from "./pages/login/login.page";
import Tasks from "./pages/tasks/Tasks";
import {Appbar} from "./components/app-bar/app-bar.component";
import {SignUpPage} from "./pages/sign-up/sign-up-page";
import {ForgotPasswordPage} from "./pages/forgot/forgot-password-page";

import {auth as initializedAuth, DownloadData} from "./lib/firebase.util"
import {db as initializedDb} from "./lib/firebase.util"
import AdminPage from "./pages/admin/admin-page";
import {Button} from "./components/button/button.component";
import {Home} from "./pages/home/home-page";



function App(){
    const history = useHistory();
    const [ssoLogin, setSsoLogin] = useState(false)
    const [downloadedContent, setDownloadedContent] = useState([[],"",false])
    const[user, setUser] = useState()
    const [ssoName, setSsoName] = useState()

        function IsAdmin(){
            if(user === undefined || user === null)
            {
                return false;
            }
            return downloadedContent[2]
        }
    React.useEffect(() => {});


    return(
        <div>
            <Router history={history}>
                <Appbar user={user} auth={initializedAuth} setUser={setUser} isAdmin={IsAdmin}/>

                <Route exact path={"/login"}>
                    <Login auth={initializedAuth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                    />
                </Route>
                <Route exact path={"/"}>
                    <Home user={user} history={history} setSsoName={setSsoName} setUser={setUser} setSsoLogin={setSsoLogin}/>
                </Route>
                <Route path={"/tasks"} >
                    <Tasks user={user} auth={initializedAuth} history={history}
                           db={initializedDb}
                           ssoName={ssoName}
                           ssoLogin={ssoLogin}
                           setDownloadedContent={setDownloadedContent}
                    />
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage auth={initializedAuth} setUser={setUser} user={user}
                                setSsoName={setSsoName}
                                setSsologin={setSsoLogin}
                    />
                </Route>
                <Route path={"/forgot"}>
                    <ForgotPasswordPage auth={initializedAuth}/>
                </Route>
                <Route path={"/admin"}>
                    <AdminPage isAdmin={IsAdmin} user={initializedAuth}/>
                </Route>
            </Router>
        </div>
    )

}
export {App}
