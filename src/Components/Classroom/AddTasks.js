import React, {useEffect, useState} from 'react'
import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";

function AddTasks(){
    const [users,setUsers] = useState('')
    const [ task, setTask ] = useState({
        taskTitle:'',
        taskDescription:'',
        file:'',
    })
    const [ selectedStudents, setSelectedStudents ] = useState([])

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

    const handleCheckboxChange = (event, studentId) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedStudents((prevSelectedStudents) => [
                ...prevSelectedStudents,
                studentId,
            ]);
        } else {
            setSelectedStudents((prevSelectedStudents) =>
                prevSelectedStudents.filter((id) => id !== studentId)
            );
        }

        console.log(selectedStudents)
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(task)
        selectedStudents.forEach(studentId=>{

            const studentRef = doc(db,'tasks')

            const studentData = users.find(student=>student.id === studentId)

            studentRef.set(studentData)
                .then(response=>console.log(response))
                .catch(error=>console.log(error.message))
        });

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
                                    <ul className={'students-list'}>
                                        {users && users.map(item=><li className={'students-list-item'} key={item.id}>
                                            <label className={'d-flex justify-between align-items-center'}>
                                                {item.username}

                                                <input type="checkbox" checked={selectedStudents.includes(item.id)} onChange={(event)=>handleCheckboxChange(event,item.id)}/>
                                            </label>
                                        </li>)}
                                    </ul>
                                </div>

                                <div className={'div-footer'}>
                                    <button type="submit" className={'btn btn-dark'} onClick={handleSubmit}>Jo'natish</button>
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