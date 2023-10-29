import React from 'react'
import AddUser from "./AddUser";
import UsersList from "./UsersList";

export default function Users(){
    return(
        <section className={'users-section font-montserrat'}>
            <UsersList/>
            <AddUser/>
        </section>
    )
}