import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore'
import {db, storage} from '../firebase/firebase'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

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

export async function getOnlyOneDataFromStore(userId,link){
  const docRef = doc(db,link,userId)
  const docSnap = await getDoc(docRef)
  if(docSnap.exists()){
      console.log('document exists')
      return docSnap.data()
  }

  else console.log("document doesn't exist")
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
    let userId;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,userData.email,userData.password)
        .then(async userCredential=>{
            const docRef = doc(db,'users',userCredential.user.uid)
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

export function getSingleImage(path){
    return getDownloadURL(ref(storage,path))
        .then(url=> {
            console.log(url)
            return url
        })
        .catch(error=>error.message);
}