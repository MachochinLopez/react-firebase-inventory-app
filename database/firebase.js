import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF8bx8rv_bwQF4Ri3Qq-xNUMzO5SGffgs",
    authDomain: "app-angie.firebaseapp.com",
    projectId: "app-angie",
    storageBucket: "app-angie.appspot.com",
    messagingSenderId: "717231101626",
    appId: "1:717231101626:web:949ea53713a487be8b1483"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
};