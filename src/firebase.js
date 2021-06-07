import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// Required for side-effects
// require("firebase/firestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ? OFFLINE DATA
db.enablePersistence().catch((error) => {
  if (error.code === "failed-precondition") {
    // probably multiple tabs open at once
    console.log("persistence failed");
  } else if (error.code === "unimplemented") {
    // lack of browser support
    console.log("persistence is not available");
  }
});

const fieldValue = firebase.firestore.FieldValue;

export { auth, db, fieldValue };
