import React from 'react'
import Books from "../Classroom/Books";
import AddBook from "./AddBook";
import ManagerHeader from "../Header/ManagerHeader";

export default function ManagerLibrary(){
    return(
        <>
            <ManagerHeader/>
            <Books/>
            <AddBook/>
        </>
    )
}