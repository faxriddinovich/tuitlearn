import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore'
import {auth, db} from '../firebase/firebase'
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { toast } from 'react-toastify'

export async function uploadFile(url,file,storage){
    const storageRef = ref(storage,`${url}/${file.name}`)
    return await uploadBytes(storageRef,file).then(response=>response.metadata.fullPath).catch(error=>console.log(error.message))
}

export async function downloadFileFromStorage(link){
    const storage = getStorage();
    const fileRef = ref(storage,link)
    return await getDownloadURL(fileRef)
        .then(url=>{
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = event => {
            const blob = xhr.response;
          };
          xhr.open('GET',url);
          xhr.send();

          const linkFile = document.createElement('a');
          linkFile.href = url
          linkFile.download = 'book'
          linkFile.click()
        })
        .catch(error => console.log(error.message))
}

export async function getCollectionFromStore(path){
    const docRef = collection(db,path)
    return await getDocs(docRef)
}

export async function addCollectionToStorage(docRef,object){
    return await setDoc(docRef,object)
        .then(response=>console.log(response))
        .catch(error=>console.log(error.message))
}

export async function createUser(userData){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,userData.email,userData.password)
        .then(async userCredential=>{
            console.log(userCredential.user.uid)

            addCollectionToStorage(doc(db,`attendances/${userCredential.user.uid}`,),{})
                .then(response=>console.log('new data added to attendances'))
                .catch(error=>console.log(error.message))


            addCollectionToStorage(doc(db,`contracts/${userCredential.user.uid}`,),{})
                .then(response=>console.log('new data added to contracts'))
                .catch(error=>console.log(error.message))


            addCollectionToStorage(doc(db,`tasks/${userCredential.user.uid}`,),{})
                .then(response=>console.log('new data added to tasks'))
                .catch(error=>console.log(error.message))


            addCollectionToStorage(doc(db,`users/${userCredential.user.uid}`,),{
                profileUrl: "",
                role: userData.role,
                username: userData.username
            })
                .then(response=>console.log('new data added to users'))
                .catch(error=>console.log(error.message))

        })
        .catch(error=>console.log(error.message))
}

export function checkUserStatus(setUserId,setRole,setAuthUser){
    return onAuthStateChanged(auth,async (user) => {
        if (user){
            const uid = user.uid
            setUserId(uid)

            const docRef = doc(db,'users',uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
                setRole(docSnap.data()?.role)
            }
            else console.log("No such document")
            setAuthUser(user)
        }
        else {
            setAuthUser(null)
        }
    })
}

export function toastPromiseSuccess(message){
    return toast.success(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

export function toastPromiseError(message){
    return toast.error(message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}