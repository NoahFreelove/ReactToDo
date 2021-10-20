// noinspection JSCheckFunctionSignatures

import React, { useState } from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

import Login from './pages/login/login.page'
import Tasks from './pages/tasks/Tasks'
import { Appbar } from './components/app-bar/app-bar.component'
import { SignUpPage } from './pages/sign-up/sign-up-page'
import { ForgotPasswordPage } from './pages/forgot/forgot-password-page'

import {auth as initializedAuth, db as initializedDb, DownloadData} from './lib/firebase.util'
import AdminPage from './pages/admin/admin-page'
import { Home } from './pages/home/home-page'
import {CheckFourZeroFourPage} from "./pages/404-page/404-page";
import Settings from "./pages/settings/settings";

function App () {
    const history = useHistory()
    const [ssoLogin, setSsoLogin] = useState(false)
    const [downloadedContent, setDownloadedContent] = useState([[], '', false, {avatar:""}])
    const [user, setUser] = useState()
    const [ssoName, setSsoName] = useState()

  function IsAdmin () {
      try {
          if (user === undefined || user === null) {
            return false
          }
          return downloadedContent[2]
      }
      catch (e)
      {
          console.log(e)
      }
      return false
  }

  async function ReDownloadContent()
  {
      setDownloadedContent(await DownloadData())
  }

  return (
        <div>
            <Router history={history}>
                <Appbar downloadedContent={downloadedContent} user={user} auth={initializedAuth} setUser={setUser} isAdmin={IsAdmin}/>
                <Route exact path={'/login'}>
                    <Login auth={initializedAuth} setUser={setUser} user={user}
                           setSsoName={setSsoName}
                           setSsologin={setSsoLogin}
                    />
                </Route>
                <Route exact path={'/'}>
                    <Home user={user} history={history}
                          downloadedContent={downloadedContent} setSsoLogin={setSsoLogin}
                          isAdmin={IsAdmin}
                          ReDownloadContent={ReDownloadContent}
                    />
                </Route>
                <Route path={'/tasks'} >
                    <Tasks user={user} auth={initializedAuth} history={history}
                           db={initializedDb}
                           ssoName={ssoName}
                           ssoLogin={ssoLogin}
                           setDownloadedContent={setDownloadedContent}
                    />
                </Route>
                <Route path={'/signup'}>
                    <SignUpPage auth={initializedAuth} setUser={setUser} user={user}
                                setSsoName={setSsoName}
                                setSsologin={setSsoLogin}
                    />
                </Route>
                <Route path={'/forgot'}>
                    <ForgotPasswordPage auth={initializedAuth}/>
                </Route>
                <Route path={'/admin'}>
                    <AdminPage isAdmin={IsAdmin} user={user} auth={initializedAuth}/>
                </Route>
                <Route path={"/settings"}>
                    <Settings user={user} downloadedContent={downloadedContent} ReDownloadContent={ReDownloadContent}/>
                </Route>
            </Router>
            <CheckFourZeroFourPage history={history}/>
        </div>
  )
}
export { App }
