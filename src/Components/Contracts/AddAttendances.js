import React, {useState} from 'react'
import {collection, doc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import {addCollectionToStorage, toastPromiseError, toastPromiseSuccess} from "../../Funtions/functions";
import nextId from "react-id-generator";

export default function AddAttendances(){
    const [attendanceData,setAttendanceData] = useState('')
    const [selectedStudents,setSelectedStudents] = useState([])

    function handleInputChange(e){
        const { name, value } = e.target
        setAttendanceData(prevState => ( {...prevState,[name]:value} ))
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(attendanceData,selectedStudents)

        selectedStudents.forEach(async userId=>{
            const attendanceRef = doc(db,`attendances/${userId}`)
            await addCollectionToStorage(attendanceRef,{userId}).then(response=>console.log('Collection created successfully')).catch(error=>toastPromiseError(error.message))
            const attendanceObjectData = {
                courseTitle:attendanceData.course,
                date:attendanceData.date,
                mentor:"Asadbek Kazakov"
            }
            const pathId = nextId()
            const subAttendanceRef = doc(db,`attendances/${userId}/array/${pathId}`)
            await addCollectionToStorage(subAttendanceRef,attendanceObjectData)
                .then(response=>toastPromiseSuccess("Ma'lumotlar muvaffaqiyatli saqlandi!"))
                .catch(error=>toastPromiseError(error.message))
        })
    }

    function handleCheckboxChange(event, studentId){
        const isChecked = event.target.checked

        if (isChecked){
            setSelectedStudents((prevSelectedStudents) => [
                ...prevSelectedStudents,
                studentId,
            ]);
        }

    }

    const query = collection(db,'users')
    const queryCourse = collection(db,'courses')

    const [querySnapshot,loading,error] = useCollection(query)
    const [querySnapshotCourse,loadingCourse,errorCourse] = useCollection(queryCourse)

    return(
        <section className={'addattendance'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12 font-montserrat'}>
                        <h2 className={'text-center'}></h2>
                        <form onSubmit={handleSubmit}>
                            <div className={'form-group'}>
                                {loadingCourse ? <h1 className={'text-center'}>Loading...</h1> :
                                    <>
                                        <label htmlFor={'course'}>Kursni tanlang:</label> <br/>
                                        <select name="course" id="course" onChange={handleInputChange} className={'form-control mb-4'}>
                                            {querySnapshotCourse.docs.map(item=> <option value={item.data().name} key={item.id}>{item.data().name}</option>)}
                                        </select>
                                    </>}
                                <label htmlFor={'date'}>Sana:</label> <br/>
                                <input type="date" className={'form-control'} id={'date'} name={'date'} onChange={handleInputChange}/> <br/>
                                {loading ? <h1 className={'text-center'}>Loading...</h1> : <ul className={'list-group my-3'}>
                                    {querySnapshot.docs.filter(doc=>doc.data().role==='student').map(item=><li className={'list-group-item d-flex align-items-center justify-content-between'} key={item.id}>
                                        <label htmlFor={item.id}>{item.data().username}</label>
                                        {/*<input type="checkbox" id={item.id}/>*/}
                                        <input type="checkbox" checked={selectedStudents.includes(item.id)} onChange={(event)=>handleCheckboxChange(event,item.id)} id={item.id}/>
                                    </li>)}
                                </ul>}

                                <div className={'div-footer'}>
                                    <button type="submit" className={'btn btn-outline-primary'} onClick={handleSubmit}>Saqlash</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}