import React from 'react'
import Header from "../Header/Header";
import {FiLogOut} from "react-icons/fi";
import { signOut } from 'firebase/auth'

import './account.css'
import {auth} from "../../firebase/firebase";

function Account({username,role}){

    function handleSignOut(){
        signOut(auth).then(() => {
            console.log('Sign out successfully')
        }).catch(error=>console.log(error.message))
    }

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

export default Account