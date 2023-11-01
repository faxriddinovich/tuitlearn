import React from 'react'
import ManagerHeader from '../Header/ManagerHeader'
import AddContract from "./AddContract";
import AddAttendances from "./AddAttendances";

export default function ManagerContract() {
  return (
    <>
     <ManagerHeader/>
     <AddContract/>
     <AddAttendances/>
    </>
  )
}
