import {db} from "../firebase/firebase";
import { getDocs, collection } from 'firebase/firestore'


export async function getDataFromFirestore(path){

    let newArray = []

    return await getDocs(collection(db,path))
        .then(querySnapshot => {
            return newArray = querySnapshot.docs.map(item => ({...item.data(),id:item.id}))
        })
}