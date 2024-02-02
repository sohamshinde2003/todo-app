// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, doc,getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2m0_gtu_gUFxYlYXstB2pYzeGi9jbmgk",
  authDomain: "todo-application-c878b.firebaseapp.com",
  projectId: "todo-application-c878b",
  storageBucket: "todo-application-c878b.appspot.com",
  messagingSenderId: "881699517126",
  appId: "1:881699517126:web:0ed739d3b6d5d77f9a1dc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export async function registerNewUser(data) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    try {
      const docRef = await addDoc(collection(db, "users"), {
        user_id: user.uid,
        user_name: data.name,
        user_email: data.email,
        user_password: data.password
      });
      return true;

    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }


  } catch (error) {
    console.error("Registration error: ", error.code, error.message);
    return false;
  }
}


export async function loginUser(data) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
    const user = userCredential.user;
    sessionStorage.setItem('userId', user.uid);
    console.log("lowgiqqqn.....");
    return true;
  }

  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, "qki", errorMessage);
    return false;
  }
}
export async function getUserStatus() {
  if(sessionStorage.getItem("userId")){
    return true
  }
  return false;
}

export async function signOutUser() {
  try {
    const user = await signOut(auth);
    sessionStorage.removeItem('userId');
    alert("You have been signed out");
  }
  catch (error) {
    console.log(error);
  }
}

export async function addTask(data) {
  try {
    const docRef = await addDoc(collection(db, "task/users/" + sessionStorage.getItem("userId")), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

export async function getAllTask() {
  const data = []
  const querySnapshot = await getDocs(collection(db, "/task/users/" + sessionStorage.getItem("userId")));
  querySnapshot.forEach((doc) => {
    const da = doc.data();
    da['id'] = doc.id;
    data.push(da);
  });
  return data
}

export async function deleteSnapshot(id) {
  try {
    const db = getFirestore();
    const taskDocRef = doc(db, 'task', 'users', sessionStorage.getItem("userId"), id);

    await deleteDoc(taskDocRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
}

export function signWithGoogle(aa) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      try {
        const docRef = await addDoc(collection(db, "users"), {
          user_id: user.uid,
          user_name: user.displayName,
          user_email: user.email,
        });
        sessionStorage.setItem('userId', user.uid);
        aa();

      } catch (e) {
        console.error("Error adding document: ", e);
        return false;
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
export function signWithFacebook(aa) {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
export function signWithGitHub(aa) {
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}