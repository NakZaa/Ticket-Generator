// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTbas0CxHyJv8TNzFsaBnMSLi53egDzfk",
  authDomain: "niti-ticket.firebaseapp.com",
  projectId: "niti-ticket",
  storageBucket: "niti-ticket.appspot.com",
  messagingSenderId: "383991276124",
  appId: "1:383991276124:web:b186ccf6716ef5d4c83c99",
  measurementId: "G-8TES038X0L"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;