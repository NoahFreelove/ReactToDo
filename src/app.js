import React, {useState} from "react";
import {
    BrowserRouter as Router, Route, useHistory,
} from "react-router-dom";

import Login from "./pages/login/login.page";
import Tasks from "./pages/tasks/Tasks";
import {Appbar} from "./components/app-bar/app-bar.component";
import {SignUpPage} from "./pages/sign-up/sign-up-page";
import {initializeApp} from "@firebase/app";
import {firebaseConfig} from "./pages/firebasesetup";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";
import {ForgotPasswordPage} from "./pages/forgot/forgot-password";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

export function App(){
    const [user, setUser] = useState()
    const history = useHistory();
    const [users, setUsers] = useState([{username:"user", password:"pass", email: "email@email.com"}])
    return(
        <div>
            <Router history={history}>
                <Appbar user={user} setUser={setUser}/>
                <Route exact path={"/login"}>
                    <Login auth={auth} setUser={setUser} user={user}/>
                </Route>
                <Route exact path={"/"}>
                    <Login auth={auth} setUser={setUser} user={user}/>
                </Route>
                <Route path={"/tasks"} >
                    <Tasks user={user} auth={auth} history={history}/>
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage auth={auth} setUsers={setUsers} users={users}/>
                </Route>
                <Route path={"/forgot"}>
                    <ForgotPasswordPage auth={auth}/>
                </Route>
            </Router>
        </div>
    )
}
