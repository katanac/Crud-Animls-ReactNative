import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB8zxU3j8U7xbWqSMN9DHB0OrHOyRsksAg",
  authDomain: "controlpets-43a62.firebaseapp.com",
  databaseURL: "https://controlpets-43a62.firebaseio.com",
  projectId: "controlpets-43a62",
  storageBucket: "controlpets-43a62.appspot.com",
  messagingSenderId: "218343835759",
  appId: "1:218343835759:web:bed206f2f4a31a0ed0259a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const bd = firebase.firestore();

export default {
  firebase,
  bd,
};
