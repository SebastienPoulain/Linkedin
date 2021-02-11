import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuR7CtrX8O7PS7rP4y4PH7dTCSc8UZVW4",
  authDomain: "linkedin-d145b.firebaseapp.com",
  projectId: "linkedin-d145b",
  storageBucket: "linkedin-d145b.appspot.com",
  messagingSenderId: "572260383138",
  appId: "1:572260383138:web:1f552bdb4101089c60dafb",
};

const firebaseInit = firebase.initializeApp(firebaseConfig);

const db = firebaseInit.firestore();

const auth = firebase.auth();

export { db, auth };
