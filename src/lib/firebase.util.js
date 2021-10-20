// noinspection JSCheckFunctionSignatures

import {firebaseConfig} from './config'

import {initializeApp} from '@firebase/app'
import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore'
import {getDoc, getFirestore} from '@firebase/firestore'
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from '@firebase/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()

const provider = new GoogleAuthProvider()

async function UploadData (UploadType, newTasks = [], username = '', admin = false, settings=  {avatar: ""}) // eslint-disable-line no-unused-vars
{
  console.log(newTasks)
  if (UploadType === 0) {
    newTasks = {}
  } else {
    newTasks = ArrayToMap(newTasks)
    console.log(settings)
  }
  try {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      admin: admin,
      name: username,
      settings: settings,
      tasks: newTasks
    })
    return true
  } catch (e) {
    console.log(e)
  }
  return false
}

async function DownloadData () {
  if (auth.currentUser === null || undefined) {
    return
  }
  const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid))
  if (docSnap.exists()) {
    return [MapToArray(docSnap.data().tasks), docSnap.data().name, docSnap.data().admin, docSnap.data().settings]
  } else {
    // return await UploadData(0, ssoName, [])
  }
}

function ArrayToMap (arr) {
  return arr[0].reduce(function (map, obj, index) {
    map[index] = arr[0][index]
    return map
  }, {})
}

function MapToArray (newMap) {
  let count = 0

  for (const prop in newMap) { if (Object.prototype.hasOwnProperty.call(newMap, prop)) ++count }

  const newArr = []

  for (let i = 0; i < count; i++) {
    newArr.push(newMap[i])
  }

  return newArr
}

async function PasswordReset (email) {
  return sendPasswordResetEmail(auth, email)
    .then(function () {
      return true
    }).catch(()=>{
    //ignore
    }).then(()=>{return false})

}

async function ShowSSO (setUser) {
    return await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        await GoogleAuthProvider.credentialFromResult(result)
        // The signed-in user info.
        setUser(result.user)
        return result.user.displayName.split(' ')[0]
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message
        console.log(errorMessage)
        // ...
      })
}

async function SignInWithPassword (auth, username, password) {

  let data = await signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      return [userCredential, true]

      // ...
    })
    .catch((error) => {
      console.log(error)
    })
  if(data == null || data == undefined)
  {
    return [null, false]
  }
return data

}

async function DeleteUserData(userID)
{
  try {
    await deleteDoc(doc(db, "users", userID));
    return true
  }
  catch (e)
  {
    console.log("Could not delete user data")
  }
  return false
}

async function GetUsers(){
  let userCollection = collection(db, "users")
  let s = await getDocs(userCollection)
  return s.docs.map(r=>{
    return ("User ID: " + r.id + " Name: " + r._document.data.value.mapValue.fields.name.stringValue)
  })
}

export { UploadData, DownloadData, ShowSSO, PasswordReset, SignInWithPassword, DeleteUserData, GetUsers, MapToArray, ArrayToMap }
