// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi5JuFIwUN7XzXwdvD7vIftC1whykre_4",
  authDomain: "chats-24508.firebaseapp.com",
  projectId: "chats-24508",
  storageBucket: "chats-24508.appspot.com",
  messagingSenderId: "61468337188",
  appId: "1:61468337188:web:aa0a21e300659d9cf564b1",
  measurementId: "G-VX95W73KP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 const db = getFirestore(app);
 const storage = getStorage(app);


 export {db,storage};
