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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
console.log(db)
const auth = getAuth();

export function App(){
    const history = useHistory();
    const [users, setUsers] = useState([{username:"user", password:"pass", email: "email@email.com"}])
    return(
        <div>
            <Router history={history} basename={process.env.PUBLIC_URL}>
                <Appbar/>
                <Route exact path={"/login"}>
                    <Login auth={auth} users={users}/>
                </Route>
                <Route exact path={"/"}>
                    <Login auth={auth} users={users}/>
                </Route>
                <Route path={"/tasks"}>
                    <Tasks/>
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage auth={auth} setUsers={setUsers} users={users}/>
                </Route>
            </Router>
        </div>
    )
}
