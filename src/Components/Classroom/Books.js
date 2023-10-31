import React from "react";
import {collection} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {AiOutlineDownload} from "react-icons/ai";

import './books.css'
import {downloadFileFromStorage} from "../../Funtions/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import nextId from "react-id-generator";

function Books(){

    const query = collection(db,'books')

    const [docs,loading,error] = useCollectionData(query)


    return(
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <h1 className={'text-center font-montserrat my-3'}>Elektron kitoblar:</h1>
                    {loading ? <h1 className={'text-center'}>Loading...</h1> :
                        <ul className={'book-list'}>
                            {docs?.map(item => <li className={'book-list-item'} key={nextId()}>
                                <div className={'book-box mb-3'}>
                                    <div className={'book-image'}>
                                        <img src={item.imageUrl} alt={item.title}/>
                                    </div>

                                    <div className={'book-info'}>
                                        <h3 className={'book-title'}>{item.title}</h3>
                                        <b>Author: </b> <span>{item.author}</span><br/>
                                        <b>Type: </b> <span>{item.type}</span><hr/>
                                        <button type="button" className={'btn btn-outline-primary'} onClick={()=>downloadFileFromStorage(item.src)}>Download <AiOutlineDownload/></button>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default Books