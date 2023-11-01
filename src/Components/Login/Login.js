import React, {useEffect, useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase/firebase'
import {checkUserStatus, toastPromiseError, toastPromiseSuccess} from '../../Funtions/functions';

import './login.css'

function Login({setUserId,setRole,setAuthUser}){

    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    function handleInputChange(e){
        const { name, value } = e.target;
        setFormData(prev=> ({
            ...prev, [name]:value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        signInWithEmailAndPassword(auth,formData.email,formData.password)
            .then(userCredential=>{
                toastPromiseSuccess('Signed in successfully!')
            })
            .catch(error=>toastPromiseError(error.message))
    }

    useEffect(() => {
        checkUserStatus(setUserId,setRole,setAuthUser)
    }, []);

    return(
        <section className={'login-section'}>
            <div className={'login-box'}>
                <h3 className={'login-box-title text-center font-montserrat'}>Sign in</h3>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" name={'email'} placeholder={'Your email'} className={'form-input font-montserrat'} onChange={handleInputChange} required/><br/>
                    <input type="password" name={'password'} placeholder={'Your password'} className={'form-input font-montserrat'} onChange={handleInputChange} required/><br/>

                    <div className={'form-footer'}>
                        <button type="submit" className={'login-btn'} onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login