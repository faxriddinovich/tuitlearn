import React, {useState} from 'react'
import {
    addCollectionToStorage,
    toastPromiseSuccess,
    uploadFile
} from "../../Funtions/functions";
import SelectUsers from "../Users/SelectUsers";
import {doc} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase";
import {getDownloadURL, ref} from "firebase/storage";

export default function AddContract() {
    const [username,setUsername] = useState('')
    const [ selectedStudents, setSelectedStudents ] = useState([])
    const [contract,setContract] = useState('')
    const [sendingObject,setSendingObject] = useState('')

    function changeContractsUsername(item){
        setUsername(item)
    }

    function changeContractsSendingObject(item){
        setSendingObject(item)
    }

    function changeContractsSelectedStudents(item){
        setSelectedStudents(item)
    }

    function handleInputChange(e){
        const selectedFile = e.target.files[0]
        setContract(selectedFile)
    }

    async function handleSubmit(e){
        e.preventDefault()

        await uploadFile('contracts',contract,storage)
            .then(response=>console.log(response,'File added to storage successfully'))
            .catch(error=>console.log(error))
        const fileUrl = await getDownloadURL(ref(storage,`contracts/${contract.name}`))
            .then(url=>url)
            .catch(error=>console.log(error.message))
        selectedStudents.forEach(userId => {
            const contractRef = doc(db,`contracts/${userId}`)

            addCollectionToStorage(contractRef,{
                date:'30.11.2023',
                fileUrl:fileUrl,
                status:false
            })
                .then(()=>toastPromiseSuccess("The contract sent to the user successfully!"))
                .catch(error=>console.log(error.message))
        })
    }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 font-montserrat'>
            <h1 className='text-center my-2'>Kontrakt tuzish:</h1>
            <form className={'my-3'} onSubmit={handleSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="contract-file">Shartnoma tuzish uchun faylni biriktiring:</label> <br/>
                    <input type="file" name="file" id="contract-file" className={'form-control'} onChange={handleInputChange}/> <br/>

                    <label htmlFor="seelct-student">Qaysi talabaga yuborilsin:</label>
                    <SelectUsers setUsername={changeContractsUsername} setSendingObject={changeContractsSendingObject} setSelectedStudents={changeContractsSelectedStudents} selectedStudents={selectedStudents} task={contract} goal={'contract'}/>

                    <div className={'form-footer'}>
                        <button type="submit" className={'btn btn-outline-primary'} onClick={handleSubmit}>Jo'natish</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
