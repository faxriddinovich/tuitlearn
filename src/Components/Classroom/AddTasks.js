import React, {useEffect, useState} from 'react'
import {collection, doc, getDocs} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase";
import {
    addCollectionToStorage,
    getCollectionFromStore,
    uploadFile
} from "../../Funtions/functions";
import nextId from "react-id-generator";
import {useCollectionData} from "react-firebase-hooks/firestore";

function AddTasks(){
    const [users,setUsers] = useState('')
    const [ task, setTask ] = useState({
        taskTitle:'',
        taskDescription:'',
        file:'',
    })
    const [sendingObject,setSendingObject] = useState('')
    const [ selectedStudents, setSelectedStudents ] = useState([])
    const [ username, setUsername ] = useState('')

    const query = collection(db,'users')

    const [docs,loading,error] = useCollectionData(query)

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

    const handleCheckboxChange = (event, studentId,username) => {
        const isChecked = event.target.checked;
        setUsername(username)
        if (isChecked) {
            setSelectedStudents((prevSelectedStudents) => [
                ...prevSelectedStudents,
                studentId,
            ]);

            setSendingObject(prevState => [
                ...prevState,
                {
                    taskTitle: task.taskTitle,
                    taskDescription: task.taskDescription,
                    studentId
                }
            ])
        } else {
            setSelectedStudents((prevSelectedStudents) =>
                prevSelectedStudents.filter((id) => id !== studentId)
            );

            setSendingObject(prevState => prevState.filter(id => id !== studentId))
        }
    }



    function handleCreateSubcollection(e){
        e.preventDefault()

        selectedStudents.forEach(async userId => {
            const pathId = nextId()
            const docRef = doc(db,`tasks/${userId}/${username}/${pathId}`)
            const taskData = sendingObject.find(student => student.studentId === userId)
            uploadFile('tasks',task.file,storage)
                .then(response=>console.log('File added to storage successfully'))
                .catch(error=>console.log(error.message))
            addCollectionToStorage(docRef,taskData)
                .then(response=>console.log('Task sent to student successfully'))
                .catch(error=>console.log(error.message))
        })
    }


    async function fetchData(){
        await getDocs(collection(db,'users'))
            .then(querySnapshot=>{
                const newData = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                setUsers(newData.filter(item=> item.role === 'student'))
            })
            .catch(err=>console.log(err.message))
    }

    useEffect(() => {
        fetchData()
    }, []);
    return(
        <section className={'tasks-section my-3'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <div className={'task-box font-montserrat'}>
                            <h3>Topshiriq qo'shish:</h3>
                            <form action="" className={'form-control'}>
                                <label>Topshiriq nomini kiriting:</label> <br/>
                                <input type="text" placeholder={'Task 1'} name={'taskTitle'} onChange={handleInputChange} className={'form-control'}/> <br/>
                                <label>Topshiriq tavsifi:</label> <br/>
                                <input type="text" placeholder={"Topshiriq haqida qo'shimcha"} name={'taskDescription'} onChange={handleInputChange} className={'form-control'}/> <br/>
                                <label>Topshiriq faylini yuklang(ixtiyoriy):</label><br/>
                                <input type="file" name={'file'} onChange={handleInputChange} className={'form-control'}/> <br/>

                                <label>Topshiriq kimga yuborilsin:</label>

                                <div className={'students-box my-2'}>
                                    {loading ? <h1 className={'text-center my-2'}>Loading...</h1> :
                                        <ul className={'students-list list-group'}>
                                            {docs?.filter(item=> item.role === 'student').map(item=><li className={'students-list-item list-group-item d-flex justify-content-between'} key={item.id}>
                                                <label className={'d-flex justify-between align-items-center'} htmlFor={item.id}>
                                                    <strong>{item.username}</strong>
                                                </label>

                                                <div className={'check-box'}>
                                                    <input type="checkbox" checked={selectedStudents.includes(item.id)} onChange={(event)=>handleCheckboxChange(event,item.id,item.username)} id={item.id}/>
                                                </div>
                                            </li>)}
                                        </ul>
                                    }
                                </div>

                                <div className={'div-footer'}>
                                    <button type="submit" className={'btn btn-dark'} onClick={handleCreateSubcollection}>Jo'natish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddTasks