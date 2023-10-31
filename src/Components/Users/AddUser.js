import React, {useState} from "react";
import {createUser, toastPromiseSuccess} from "../../Funtions/functions";

export default function AddUser(){
    const [ userData,setUserData ] = useState('')
    function handleInputChange(e){
        const { name, value } = e.target
        setUserData(prevState => ({ ...prevState, [name]: value }))
    }

    function handleClick(e){
        e.preventDefault()
        console.log(userData)
        createUser(userData)
            .then(()=>toastPromiseSuccess("User created successfully"))
            .catch(error=>console.log(error.message))
    }
    return(
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <h1 className={'text-center my-2'}>Foydalanuvchi qo'shish</h1>
                    <form className={'add-user-form p-3'} onSubmit={handleClick}>
                        <div className={'form-group'}>
                            <label htmlFor="username">
                                Username:
                            </label> <br/>
                            <input type="text" placeholder={'Username'} id={'username'} className={'form-control'} name={'username'} onChange={handleInputChange}/> <br/>
                            <label htmlFor="useremail">
                                Foydalanuvchi emaili:
                            </label> <br/>
                            <input type="email" placeholder={'Email'} id={'useremail'} className={'form-control'} name={'email'} onChange={handleInputChange}/> <br/>

                            <label htmlFor="password">
                                Parol:
                            </label> <br/>
                            <input type="password" placeholder={'Password'} id={'password'} className={'form-control'} name={'password'} onChange={handleInputChange}/> <br/>
                            <label htmlFor="role">Role:</label> <br/>
                            <select name="role" id="role" className={'form-control'} onChange={handleInputChange}>
                                <option value="student">Talaba</option>
                                <option value="admin">Manager</option>
                            </select>
                        </div>
                        <div className={'form-footer p-3 my-2'}>
                            <button type="submit" onClick={handleClick} className={'btn btn-outline-primary'}>Qo'shish</button>
                        </div>
                    </form>
                </div>
                <hr/>
            </div>
        </div>
    )
}