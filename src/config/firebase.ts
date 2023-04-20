// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0bXLuqnt5DTDxIPh4wrgUIl6qKJxLmsI",
  authDomain: "react-project-48d06.firebaseapp.com",
  projectId: "react-project-48d06",
  storageBucket: "react-project-48d06.appspot.com",
  messagingSenderId: "959801895426",
  appId: "1:959801895426:web:2764c21c8fbbc2cf56951b",
  measurementId: "G-851L4VP2EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)