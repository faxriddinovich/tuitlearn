import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Library from "./Components/Library/Library";
import Account from "./Components/Account/Account";
import Classroom from "./Components/Classroom/Classroom";
import {useEffect, useState} from "react";
import Login from "./Components/Login/Login";
import ManagerHome from "./Components/Home/ManagerHome";
import Contracts from "./Components/Contracts/Contracts";
import ManagersClassroom from "./Components/Classroom/ManagersClassroom";
import ManagerLibrary from "./Components/Library/ManagerLibrary";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ManagerContract from "./Components/Contracts/ManagerContract";

function App() {

  const [ authUser, setAuthUser ] = useState(null)
  const [ userId, setUserId ] = useState('')
  const [ role, setRole ] = useState('')

  function changeUserId(newState){
    setUserId(newState)
  }

  function changeAuthUser(newState){
    setAuthUser(newState)
  }

  function changeRole(newState){
    setRole(newState)
  }

  return (
    <>
      <Routes>
        {
          authUser ?
              <>
                {
                  role === 'student' ?
                      <>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/library'} element={<Classroom/>}/>
                        <Route path={'/account'} element={<Account username={authUser.email} role={role} setUserId={changeUserId} setAuthUser={changeAuthUser} setRole={changeRole} authUser={authUser}/>}  />
                        <Route path={'/classroom'} element={<Library userId = { userId }/>}/>
                        <Route path={'/contracts'} element={<Contracts userId = { userId }/>}/>
                      </> :

                      <>
                        <Route path={'/'} element={<ManagerHome/>}/>
                        <Route path={'/manager-library'} element={<ManagerLibrary/>}/>
                        <Route path={'/account'} element={<Account username = { authUser.email } role = { role } setUserId={changeUserId} setAuthUser={changeAuthUser} setRole={changeRole} authUser={authUser} />}/>
                        <Route path={'/manager-classroom'} element={<ManagersClassroom/>}/>
                        <Route path={'/manager-contracts'} element={<ManagerContract/>}/>
                        <Route path={'*'} element={<ManagerHome/>}/>
                      </>
                }
              </> :
              <>
                <Route path={'/login'} element={<Login setUserId={changeUserId} setAuthUser={changeAuthUser} setRole={changeRole}/>}/>
                <Route path={'*'} element={<Login setUserId={changeUserId} setAuthUser={changeAuthUser} setRole={changeRole}/>}/>
              </>
        }
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;