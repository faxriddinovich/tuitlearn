import React, {useEffect, useState} from 'react'
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../firebase/firebase'

function Attendance({userId}){

    const [attendances,setAttendances] = useState('')

    async function fetchData(){
        await getDocs(collection(db,'attendances/'+userId+'/array'))
            .then(querySnapshot=>{
                const newData = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                setAttendances(newData)
            })
            .catch(err=>console.log(err.message))
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <section className={'attendances'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <h1 className={'text-center my-3 font-montserrat'}>Davomat</h1>
                        {attendances ? <table className={'attendance-table table table-hover table-striped mx-auto my-3 font-montserrat'}>
                            <thead>
                            <tr>
                                <th>Num</th>
                                <th>Fan</th>
                                <th>Sana</th>
                                <th>O'qituvchi</th>
                            </tr>
                            </thead>

                            <tbody>
                                {attendances.map((item,index) => <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.courseTitle}</td>
                                    <td>{item.date}</td>
                                    <td>{item.mentor}</td>
                                </tr>)}
                            </tbody>
                        </table> : <h1>Ma'lumotlar mavjud emas</h1>}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Attendance