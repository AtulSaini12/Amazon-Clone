import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq3TSH99f3C3y9FD_kd77-l2af4RsTKKM",
  authDomain: "e-commerce-22-01.firebaseapp.com",
  projectId: "e-commerce-22-01",
  storageBucket: "e-commerce-22-01.appspot.com",
  messagingSenderId: "186486804387",
  appId: "1:186486804387:web:09bc3917785517559e9416",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = firebase.auth(app);
const db = app.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, db, timestamp };
