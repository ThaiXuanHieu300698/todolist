import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD7Brf75cTkP82ZXndJDPkefrk2gsCMluQ",
  authDomain: "todolist-300698.firebaseapp.com",
  projectId: "todolist-300698",
  storageBucket: "todolist-300698.appspot.com",
  messagingSenderId: "470526497940",
  appId: "1:470526497940:web:97b526dd832624167f9081",
  measurementId: "G-9BY6FHGN3G",
};

const firebaseDb = firebase.initializeApp(firebaseConfig);

export default firebaseDb.database().ref();
