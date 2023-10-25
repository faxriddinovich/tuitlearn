import React from 'react'
import Header from "../Header/Header";
import Attendance from "./Attendance";
import ContractSection from "./ContractSection";

function Contracts({userId}){
    return(
        <>
            <Header/>
            <ContractSection userId={userId}/>
            <hr/>
            <Attendance userId={userId}/>
        </>
    )
}

export default Contracts