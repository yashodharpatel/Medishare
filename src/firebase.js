import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCci4KaeYyX_krMGyiV_ka7ZnpZzdWdCMI",
  authDomain: "auth-production-3ddc6.firebaseapp.com",
  databaseURL: "https://auth-production-3ddc6-default-rtdb.firebaseio.com",
  projectId: "auth-production-3ddc6",
  storageBucket: "auth-production-3ddc6.appspot.com",
  messagingSenderId: "505861880777",
  appId: "1:505861880777:web:47bc9c17c11391af404618"
});

export default app;
export const auth = app.auth();
export const database = firebase.database();
export const storage = firebase.storage();
export const firebaseapp = firebase;