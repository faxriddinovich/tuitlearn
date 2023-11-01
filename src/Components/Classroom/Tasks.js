import React, {useEffect, useState} from 'react'
import {downloadFileFromStorage} from "../../Funtions/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {AiOutlineDownload} from "react-icons/ai";

function Tasks({userId}){

    const query = collection(db,`tasks/${userId}/uniquetask`)
    const [docs, loading, error] = useCollectionData(query)

    return(
        <section className={'tasks-section w-100'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12 font-montserrat'}>
                        <h1 className={'text-center my-2'}>Sizning aktiv topshiriqlaringiz:</h1>
                        {loading ? <h1 className={'text-center'}>Loading...</h1> : <ul className={'tasks-list p-0 mx-auto my-3 list-group'}>
                            {docs.map(item=><li className={'list-group-item'} key={item.studentId}>
                                <strong>{item.taskTitle}</strong>
                                <p>{item.taskDescription}</p>
                                <button type="button" className={'btn btn-outline-primary'} onClick={()=>downloadFileFromStorage(item.src)}>Download <AiOutlineDownload/></button>
                            </li>)}
                        </ul>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tasks