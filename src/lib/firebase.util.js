// noinspection JSCheckFunctionSignatures

import { firebaseConfig } from './config'

import { initializeApp } from '@firebase/app'
import { doc, setDoc } from 'firebase/firestore'
import { getDoc, getFirestore } from '@firebase/firestore'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()

const provider = new GoogleAuthProvider()

async function UploadData (UploadType, newTasks = [], username = '', admin = false) {
  if (UploadType === 0) {
    newTasks = {}
  } else {
    newTasks = ArrayToMap(newTasks)
  }
  try {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      admin: admin,
      name: username,
      tasks: newTasks
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function DownloadData () {
  if (auth.currentUser === null || undefined) {
    return
  }
  const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid))
  if (docSnap.exists()) {
    return [MapToArray(docSnap.data().tasks), docSnap.data().name, docSnap.data().admin]
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

  for (const prop in newMap) { if (newMap.hasOwnProperty(prop)) ++count }

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
    }).catch(function (e) {
      console.log(e)
      return false
    })
}

async function ShowSSO (newAccount, setUser) {
  if (!newAccount) {
    return await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        setUser(result.user)
        return result.user.displayName.split(' ')[0]
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorMessage)
        // ...
      })
  } else {
    return await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await GoogleAuthProvider.credentialFromResult(result)
        // The signed-in user info.
        setUser(result.user)
        const firstName = result.user.displayName.split(' ')[0]

        await UploadData(0, [], firstName)

        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorMessage)
        // ...
      })
  }
}

async function SignInWithPassword (auth, username, password) {
  return await signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      return [userCredential, true]

      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      return [null, false]
    })
}

export { UploadData, DownloadData, ShowSSO, PasswordReset, SignInWithPassword }
