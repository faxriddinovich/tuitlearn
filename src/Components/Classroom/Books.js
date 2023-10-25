import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {AiOutlineDownload} from "react-icons/ai";

import './books.css'

function Books(){

    const [books,setBooks] = useState('')

    async function fetchBooks(){
        await getDocs(collection(db,'books'))
            .then(querySnapshot => {
                const newArray = querySnapshot.docs.map(item=>({...item.data(),id:item.id}))
                setBooks(newArray)
            })
    }

    useEffect(() => {
        fetchBooks()
    },[])

    return(
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <h1 className={'text-center font-montserrat my-3'}>Elektron kitoblar:</h1>
                    <ul className={'book-list'}>
                        {books ? books.map(item => <li className={'book-list-item'} key={item.id}>
                            <div className={'book-box'}>
                                <div className={'book-image'}>
                                    <img src={item.imageUrl} alt={item.title}/>
                                </div>

                                <div className={'book-info'}>
                                    <h3 className={'book-title'}>{item.title}</h3>
                                    <b>Author: </b> <span>{item.author}</span><br/>
                                    <b>Type: </b> <span>{item.type}</span><hr/>
                                    <a href={item.src} target={'_blank'}>
                                        Download <AiOutlineDownload/>
                                    </a>
                                </div>
                            </div>
                        </li>) : ''}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Books