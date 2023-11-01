import React, {useState} from 'react'
import {doc} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase";
import {
    addCollectionToStorage,
    toastPromiseSuccess,
    uploadFile
} from "../../Funtions/functions";
import nextId from "react-id-generator";
import SelectUsers from "../Users/SelectUsers";
import {getDownloadURL, ref} from "firebase/storage";

export default function AddTasks(){
    const [username,setUsername] = useState('')
    const [selectedStudents,setSelectedStudents] = useState([])
    const [task,setTask] = useState('')
    const [sendingObject,setSendingObject] = useState('')

    function changeTasksUsername(item){
        setUsername(item)
    }

    function changeTasksSendingObject(item){
        setSendingObject(item)
    }

    function changeTasksSelectedStudents(item){
        setSelectedStudents(item)
    }

    function handleInputChange(e){
        const inputType = e.target.type
        if (inputType === 'text'){
            const { name, value } = e.target
            setTask(prevState => ({ ...prevState, [name]: value, }))
        }
        else if (inputType === 'file'){
            const selectedFile = e.target.files[0]
            setTask(prevState => ({...prevState,file: selectedFile}))
        }

    }


    function handleSubmit(e){
        e.preventDefault()

        uploadFile('tasks',task.file,storage)
            .then(response=>console.log(response,'File added to storage successfully'))
            .catch(error=>console.log(error))

        selectedStudents.forEach(async userId => {
            const fileUrl = await getDownloadURL(ref(storage,`tasks/${task.file.name}`))
                .then(url=>url)
                .catch(error=>console.log(error.message))

            const pathId = nextId()
            const taskRef = doc(db,`tasks/${userId}`)
            await addCollectionToStorage(taskRef,{username:username})
            const taskData = sendingObject.find(student => student.studentId === userId)
            const subTaskRef = doc(db,`tasks/${userId}/uniquetask/${pathId}`)
            addCollectionToStorage(subTaskRef,{
                studentId:userId,
                taskDescription:taskData.taskDescription,
                taskTitle:taskData.taskTitle,
                src:fileUrl
            })
                .then(()=>toastPromiseSuccess("The task sent to the user successfully!"))
                .catch(error=>console.log(error.message))
        })
    }

    return(
        <section className={'tasks-section my-3'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <div className={'task-box font-montserrat'}>
                            <h3>Topshiriq qo'shish:</h3>
                            <form className={'form-control'} onSubmit={handleSubmit}>
                                <label>Topshiriq nomini kiriting:</label> <br/>
                                <input type="text" placeholder={'Task 1'} name={'taskTitle'} onChange={handleInputChange} className={'form-control'}/> <br/>
                                <label>Topshiriq tavsifi:</label> <br/>
                                <input type="text" placeholder={"Topshiriq haqida qo'shimcha"} name={'taskDescription'} onChange={handleInputChange} className={'form-control'}/> <br/>
                                <label>Topshiriq faylini yuklang(ixtiyoriy):</label><br/>
                                <input type="file" name={'file'} onChange={handleInputChange} className={'form-control'}/> <br/>

                                <label>Topshiriq kimga yuborilsin:</label>

                                <div className={'students-box my-2'}>
                                    <SelectUsers setUsername={changeTasksUsername} setSendingObject={changeTasksSendingObject} setSelectedStudents={changeTasksSelectedStudents} selectedStudents={selectedStudents} task={task} goal={'task'}/>
                                </div>

                                <div className={'div-footer'}>
                                    <button type="button" className={'btn btn-dark'} onClick={handleSubmit}>Jo'natish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}