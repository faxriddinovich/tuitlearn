import React, {useState} from 'react'
import {db, storage} from "../../firebase/firebase";
import {addCollectionToStorage, toastPromiseSuccess, uploadFile} from "../../Funtions/functions";
import {doc} from "firebase/firestore";
import nextId from "react-id-generator";
import {ref, getDownloadURL} from "firebase/storage";

export default function AddBook(){
    const [bookData,setBookData] = useState('')
    function handleInputChange(e){
        const inputType = e.target.type
        const { name, value } = e.target
        setBookData(prevState => ({...prevState,[name]:value}))
        if (inputType === 'file'){
            const selectedFile = e.target.files[0]
            setBookData(prevState => ({...prevState,[name]: selectedFile}))
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        // Uploading book-image
        await uploadFile('images',bookData.image,storage)
            .then(response=>console.log(response,'File added to storage successfully'))
            .catch(error=>console.log(error.message))


        // Uploading book-file
        await uploadFile('books',bookData.file,storage)
            .then(response=>console.log(response,'File added to storage successfully'))
            .catch(error=>console.log(error.message))

        const imageUrl = await getDownloadURL(ref(storage,`images/${bookData.image.name}`))
            .then(url=>url)
            .catch(error=>console.log(error.message))
        const src = await getDownloadURL(ref(storage,`books/${bookData.file.name}`))
            .then(url=>url)
            .catch(error=>console.log(error.message))

        // Uploading book-data
        const pathId = nextId()
        const bookRef = doc(db,`books/${pathId}`)

        addCollectionToStorage(bookRef,{
            author:bookData.author,
            imageUrl:imageUrl,
            src:src,
            title:bookData.title,
            type:bookData.type
        })
            .then(()=>toastPromiseSuccess("The book added successfully!"))
            .catch(error=>console.log(error.message))
    }
    return(
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-md-12 font-montserrat'}>
                    <h1 className={'text-center my-2'}>Kitob qo'shish:</h1>
                    <form className={'my-2'} onSubmit={handleSubmit}>
                        <div className={'form-group'}>
                            <label htmlFor="book-name">Kitob nomini kiriting:</label> <br/>
                            <input type="text" name="title" id="book-name" placeholder={'Kitob nomi'} className={'form-control'} onChange={handleInputChange}/> <br/>
                            <label htmlFor="book-author">Kitob muallifi:</label> <br/>
                            <input type="text" name="author" id="book-author" placeholder={'Kitob muallifi'} className = {'form-control'} onChange={handleInputChange}/> <br/>

                            <label htmlFor="book-type">Kitob janri:</label> <br/>
                            <input type="text" name="type" id="book-type" placeholder={'Programming,english...'} className={'form-control'} onChange={handleInputChange}/> <br/>

                            <label htmlFor="book-image">Kitob muqovasi(.jpg,.png):</label> <br/>
                            <input type="file" name="image" id="book-image" className={'form-control'} onChange={handleInputChange}/> <br/>

                            <label htmlFor="book-file">Kitob fayli(.docx,.pdf):</label> <br/>
                            <input type="file" name="file" id="book-file" className={'form-control'} onChange={handleInputChange}/> <br/>
                        </div>
                        <button type="submit" className={'btn btn-outline-primary my-2'} onClick={handleSubmit}>Qo'shish</button>
                    </form>
                </div>
            </div>
        </div>
    )
}