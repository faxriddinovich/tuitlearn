import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Library from "./Components/Library/Library";
import Account from "./Components/Account/Account";
import Classroom from "./Components/Classroom/Classroom";
import {useEffect, useState} from "react";
import Login from "./Components/Login/Login";
import { onAuthStateChanged } from 'firebase/auth'
import {auth, db} from './firebase/firebase'
import {doc,getDoc} from 'firebase/firestore'
import {getDataFromFirestore} from "./Funtions/getDataFromFirestore";
import ManagerHome from "./Components/Home/ManagerHome";
import Contracts from "./Components/Contracts/Contracts";
import ManagersClassroom from "./Components/Classroom/ManagersClassroom";

function App() {

    const [ authUser, setAuthUser ] = useState(null)
    const [loading,setLoading] = useState(true)
    const [userId,setUserId] = useState('')
    const [role,setRole] = useState('')

    useEffect(()=>{

        const listen = onAuthStateChanged(auth,async (user) => {
            if (user){
                const uid = user.uid
                setUserId(uid)

                const docRef = doc(db,'users',uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()){
                    setRole(docSnap.data()?.role)
                }
                else console.log("No suc document")
                setAuthUser(user)
                setLoading(false)
            }
            else {
                setAuthUser(null)
                setLoading(false)
            }
        })

        return () => {
            listen()
        }
    },[])

  return (
    <>
        {loading && (<div className={'position-fixed top-0 left-0  h-full w-full z-99 flex justify-center align-items-center '}></div>)}
      <Routes>
          {
              authUser ?
              <>
                  {
                      role==='student' ?
                      <>
                          <Route path={'/'} element={<Home/>}/>
                          <Route path={'/library'} element={<Classroom/>}/>
                          <Route path={'/account'} element={<Account username={authUser.email} role={role}/>}/>
                          <Route path={'/classroom'} element={<Library/>}/>
                          <Route path={'/contracts'} element={<Contracts userId={userId}/>}/>
                      </> :

                      <>
                          <Route path={'/'} element={<ManagerHome/>}/>
                          <Route path={'/library'} element={<Classroom/>}/>
                          <Route path={'/account'} element={<Account username={authUser.email} role={role}/>}/>
                          <Route path={'/manager-classroom'} element={<ManagersClassroom/>}/>
                      </>
                  }
              </> :
              <>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'*'} element={<Login/>}/>
              </>
          }
      </Routes>
    </>
  );
}

export default App;