import React, {useEffect, useState} from 'react'
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../../firebase/firebase'

import './login.css'
import {doc, getDoc} from "firebase/firestore";

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
                console.log(userCredential)
            })
            .catch(error=>console.log(error.message))
    }

    useEffect(() => {
        const listen = onAuthStateChanged(auth,async (user) => {
            if (user){
                const uid = user.uid
                setUserId(uid)

                const docRef = doc(db,'users',uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()){
                    setRole(docSnap.data()?.role)
                }
                else console.log("No such document")
                setAuthUser(user)
            }
            else {
                setAuthUser(null)
            }
        })
        return () => {
            listen()
        }
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