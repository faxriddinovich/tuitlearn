import React,{useEffect} from 'react'
import Header from "../Header/Header";
import {FiLogOut} from "react-icons/fi";
import {signOut} from 'firebase/auth'
import {checkUserStatus, toastPromiseError, toastPromiseSuccess} from '../../Funtions/functions';
import {auth} from '../../firebase/firebase'

import './account.css'

function Account({username,role,setUserId,setRole,setAuthUser,authUser}){

    function handleSignOut(){
        signOut(auth).then(() => {
            toastPromiseSuccess('Sign out successfully')
        }).catch(error=>toastPromiseError(error.message))
    }

    useEffect(() => {
        checkUserStatus(setUserId,setRole,setAuthUser)
    }, []);

    return(
        <>
            <Header/>
            <section className={'account-section'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <div className={'account-box'}>
                                <div className={'account-info'}>
                                    <h1 className={'account-title'}>{username}</h1>
                                    <p className={'account-subtitle'}>{role}</p>
                                </div>

                                <div className={'account-btn'}>
                                    <button type="button" onClick={handleSignOut}>
                                        <FiLogOut/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
const MemoizedComponent = React.memo(Account)
export default Account