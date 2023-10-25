import React, {useEffect, useState} from 'react'
import {doc, getDoc} from "firebase/firestore";
import {db} from '../../firebase/firebase'

function ContractSection({userId}){
    const [ contract, setContract ] = useState('')

    async function fetchData(){
        const docRef = doc(db,'contracts',userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()){
            console.log(docSnap.data())
            setContract(docSnap.data())
        }else console.log("No such document")
    }

    useEffect(() => {
        fetchData()
    }, []);
    return(
        <section className={'contract-section'}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <h3 className={'text-center my-3 font-montserrat'}>Sizning shartnoma ma'lumotlaringiz</h3>
                        <div className={'contract-box font-montserrat'}>
                            <table className={'table table-striped table-hover'}>
                                <thead>
                                    <tr>
                                        <th>Holati</th>
                                        <th>Sanasi</th>
                                        <th>Fayl</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className={`${contract.status ? 'bg-success' : 'bg-warning'} p-2 color-light`}>
                                                {contract.status ? "To'langan" : "To'lanmagan"}
                                            </span>
                                        </td>

                                        <td>
                                            {contract.date}
                                        </td>

                                        <td>
                                            <a href={contract.fileUrl} target={'_blank'}>Yuklab olish</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContractSection