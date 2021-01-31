import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAtOHGk28oVYyTx6xrt_JihDm7Hml6qhEU",
  authDomain: "simple-notes-firebase-1a7c4.firebaseapp.com",
  projectId: "simple-notes-firebase-1a7c4",
  storageBucket: "simple-notes-firebase-1a7c4.appspot.com",
  messagingSenderId: "444861988238",
  appId: "1:444861988238:web:327943d4bd0320df0678df",
  measurementId: "G-YKJPZKG82N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
export const database = firebase.database();


export default firebase;