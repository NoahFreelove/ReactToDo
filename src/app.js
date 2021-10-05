// noinspection JSCheckFunctionSignatures

import React, {useState} from "react";
import {BrowserRouter as Router, Route, useHistory,} from "react-router-dom";

import Login from "./pages/login/login.page";
import Tasks from "./pages/tasks/Tasks";
import {Appbar} from "./components/app-bar/app-bar.component";
import {SignUpPage} from "./pages/sign-up/sign-up-page";
import {initializeApp} from "@firebase/app";
import {firebaseConfig} from "./pages/firebasesetup";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";
import {ForgotPasswordPage} from "./pages/forgot/forgot-password";
import {doc, setDoc} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

export function App(){
    const [user, setUser] = useState()
    const history = useHistory();
    const [ssoName, setSsoName] = useState("")
    const [ssoLogin, setSsoLogin] = useState(false)

    function ArrayToMap(arr)
    {
        return arr[0].reduce(function (map, obj, index) {
            map[index] = arr[0][index];
            return map;
        }, {})
    }

    const uploadData = async (UploadType, username = "", newTasks = []) => {
        // upload type 0 is for a new user being created. upload type 1 is for updating tasks
        if (UploadType === 0) {
            newTasks = {}
        }
        else{
            newTasks = ArrayToMap(newTasks)
        }
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                name: username,
                tasks: newTasks
            });

    }

    return(

        <div>
            <Router history={history}>
                <Appbar user={user} setUser={setUser}/>
                <Route exact path={"/login"}>
                    <Login auth={auth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                    />
                </Route>
                <Route exact path={"/"}>
                    <Login auth={auth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                    />                </Route>
                <Route path={"/tasks"} >
                    <Tasks user={user} auth={auth} history={history}
                           db={db}
                           uploadData={uploadData}
                           ssoName={ssoName}
                           ssoLogin={ssoLogin}/>
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage auth={auth} setUser={setUser} user={user}
                                setSsoName={setSsoName}
                                setSsologin={setSsoLogin}
                                uploadData={uploadData}/>
                </Route>
                <Route path={"/forgot"}>
                    <ForgotPasswordPage auth={auth}/>
                </Route>
            </Router>
        </div>
    )

}
