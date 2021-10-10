// noinspection JSCheckFunctionSignatures

import React, {useState} from "react";
import {BrowserRouter as Router, Route, useHistory,} from "react-router-dom";

import Login from "./pages/login/login.page";
import Tasks from "./pages/tasks/Tasks";
import {Appbar} from "./components/app-bar/app-bar.component";
import {SignUpPage} from "./pages/sign-up/sign-up-page";
import {ForgotPasswordPage} from "./pages/forgot/forgot-password";

import {auth as initializedAuth} from "./lib/firebase.util"
import {db as initializedDb} from "./lib/firebase.util"



function App(){
    const history = useHistory();
    const [ssoLogin, setSsoLogin] = useState(false)
    const [user, setUser] = useState()
    const [ssoName, setSsoName] = useState()

    return(
        <div>
            <Router history={history}>
                <Appbar user={user} setUser={setUser}/>
                <Route exact path={"/login"}>
                    <Login auth={initializedAuth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                    />
                </Route>
                <Route exact path={"/"}>
                    <Login auth={initializedAuth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                           ssoName={ssoName}
                    />
                </Route>
                <Route path={"/tasks"} >
                    <Tasks user={user} auth={initializedAuth} history={history}
                           db={initializedDb}
                           ssoName={ssoName}
                           ssoLogin={ssoLogin}/>
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
            </Router>
        </div>
    )

}
export {App}
