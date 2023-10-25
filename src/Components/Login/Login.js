import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

import './login.css'

function Login(){

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

    return(
        <section className={'login-section'}>
            <div className={'login-box'}>
                <h3 className={'login-box-title text-center font-montserrat'}>Sign in</h3>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" name={'email'} placeholder={'Your email'} className={'form-input font-montserrat'} onChange={handleInputChange}/><br/>
                    <input type="password" name={'password'} placeholder={'Your password'} className={'form-input font-montserrat'} onChange={handleInputChange}/><br/>

                    <div className={'form-footer'}>
                        <button type="submit" className={'login-btn'} onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login