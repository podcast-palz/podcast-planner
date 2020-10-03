// firebase.js
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";


// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
  apiKey: "AIzaSyBwLq_-FMp8lGW3_AVNC71e_tUWM6vefR8",
  authDomain: "podcast-planner-fde21.firebaseapp.com",
  databaseURL: "https://podcast-planner-fde21.firebaseio.com",
  projectId: "podcast-planner-fde21",
  storageBucket: "podcast-planner-fde21.appspot.com",
  messagingSenderId: "457751978532",
  appId: "1:457751978532:web:5196b0b12f491402fcaeb1",
};
firebase.initializeApp(config);
// this exports the CONFIGURED version of firebase
export default firebase;
