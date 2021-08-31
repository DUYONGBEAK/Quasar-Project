import firebase from 'firebase/app';
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCkH8WyEZlmJM3SPwPCkn4CQw7hpRzFk20",
  authDomain: "myapp-68b11.firebaseapp.com",
  projectId: "myapp-68b11",
  storageBucket: "myapp-68b11.appspot.com",
  messagingSenderId: "645568769732",
  appId: "1:645568769732:web:49d4b58a7418c9b4cea391"
  };


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();