import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJQcIBB-CeHxXuNRB56oDriEehd8aB-nY",
    authDomain: "myapp-2ece6.firebaseapp.com",
    projectId: "myapp-2ece6",
    storageBucket: "myapp-2ece6.appspot.com",
    messagingSenderId: "457556180809",
    appId: "1:457556180809:web:9362afcbc8fcfebaf1a498",
    measurementId: "G-KS7R16EJQ8"
    };

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig)
      }    

export const auth = firebase.auth();
export const db = firebase.firestore();