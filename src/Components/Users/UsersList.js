import React from 'react'
import {db} from "../../firebase/firebase";
import {collection} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import nextId from 'react-id-generator';

export default function UsersList(){

    const query = collection(db,'users')

    const [docs,loading,error] = useCollectionData(query)

    return(
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-md-12 font-montserrat'}>
                    {loading ? <h1 className={'text-center'}>Loading....</h1> :
                        <ul className={'users-list list-group my-3'}>
                            <h2 className={'text-center my-2'}>Sayt foydalanuvchilari:</h2>
                            {docs?.map(item=><li className={'users-list-item list-group-item'} key={nextId()}>
                                <p className={'p-0 m-0 w-100 d-flex justify-content-between'}>
                                    <strong>
                                        {item.username}
                                    </strong>

                                    {item.role}
                                </p>
                            </li>)}
                        </ul>
                    }
                </div>
                <hr/>
            </div>
        </div>
    )
}