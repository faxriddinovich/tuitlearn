import React, {useEffect, useState} from 'react'
import {db} from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore'

import './courses.css'

function CoursesList(){

    const [courses,setCourses] = useState("")

    async function fetchPost(){
        await getDocs(collection(db,'courses'))
            .then(querySnapshot=>{
                const newData = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                setCourses(newData)
            })
            .catch(err=>console.log(err.message))
    }

    useEffect(() => {
        fetchPost()
    }, []);

    return(
        <section className={'courses-list-section'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <h1 className={'text-center font-montserrat'}>Barcha kurslar:</h1>
                        <ul className={'courses-list my-3'}>
                            {courses ? courses.map(item=><li className={'courses-list-item'} key={item.id}>
                                <div className={'course-box'}>
                                    <div className={'image-box'}>
                                        <img src={item.imgUrl} alt={item.name}/>
                                    </div>

                                    <div className={'course_box-footer'}>
                                        <h3 className={'course-title'}>{item.name}</h3>
                                        <p className={'course-subtitle'}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </li>) : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CoursesList