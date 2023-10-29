import React, {useEffect, useState} from 'react'
import {getCollectionFromStore, getOnlyOneDataFromStore} from "../../Funtions/functions";

function Tasks({userId}){
    const [tasks,setTasks] = useState('')

    useEffect(() => {
        getCollectionFromStore('tasks')
            .then(querySnapshot=>{
                const tasks = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                console.log(tasks)
            }).catch(error=>console.log(error.message))
    }, []);
    return(
        <section className={'tasks-section w-100'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <ul className={'tasks-list p-0 mx-auto my-3 list-unstyled'}></ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tasks