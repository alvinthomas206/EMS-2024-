import firebase from 'firebase' ;

require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDZWERmowEEZJZU1PP871ddNYJANFL37o4",
  authDomain: "emsappalvinthomas206.firebaseapp.com",
  projectId: "emsappalvinthomas206",
  storageBucket: "emsappalvinthomas206.appspot.com",
  messagingSenderId: "516268334636",
  appId: "1:516268334636:web:0484c97f33047255e1bb89",
  measurementId: "G-CDGLDT3YD6"
};
firebase.initializeApp(firebaseConfig)
export default firebase.firestore();
