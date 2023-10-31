import React, {useEffect, useState} from 'react'
import nextId from "react-id-generator";
import {getCollectionFromStore} from "../../Funtions/functions";

export default function SelectUsers({setUsername,setSendingObject,setSelectedStudents,selectedStudents,task,goal}){
    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(true)


    const handleCheckboxChange = (event, studentId,username) => {
        const isChecked = event.target.checked;
        setUsername(username)
        if (isChecked) {
            setSelectedStudents((prevSelectedStudents) => [
                ...prevSelectedStudents,
                studentId,
            ]);

            if (goal === 'contract'){
                setSendingObject(prevState => [
                    ...prevState,
                    {
                        date:'30.10.2023',
                        status:false,
                        studentId
                    }
                ])
            }
            else{
                setSendingObject(prevState => [
                    ...prevState,
                    {
                        taskTitle: task.taskTitle,
                        taskDescription: task.taskDescription,
                        studentId
                    }
                ])
            }
        } else {
            setSelectedStudents((prevSelectedStudents) =>
                prevSelectedStudents.filter((id) => id !== studentId)
            );

            setSendingObject(prevState => prevState.filter(id => id !== studentId))
        }
    }

    useEffect(() => {
        getCollectionFromStore('users')
            .then(querySnapshot=>{
                const newData = querySnapshot.docs.map(item=> ({ id:item.id, ...item.data()}))
                setUsers(newData)
                setLoading(false)
            })
            .catch(error=>console.log(error.message))
    }, []);
    return(
        <>
            {loading ? <h1 className={'text-center my-2'}>Loading...</h1> :
                <ul className={'students-list list-group'}>
                    {users?.filter(item=> item.role === 'student').map(item=><li className={'students-list-item list-group-item d-flex justify-content-between'} key={nextId()}>
                        <label className={'d-flex justify-between align-items-center'} htmlFor={item.id}>
                            <strong>{item.username}</strong>
                        </label>

                        <div className={'check-box'}>
                            <input type="checkbox" checked={selectedStudents.includes(item.id)} onChange={(event)=>handleCheckboxChange(event,item.id,item.username)} id={item.id}/>
                        </div>
                    </li>)}
                </ul>
            }
        </>
    )
}