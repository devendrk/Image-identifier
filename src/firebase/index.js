import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQTUaUHDiz3OkZCqDjEQfUJ-UREfSZIqU",
  authDomain: "image-identifier-9704c.firebaseapp.com",
  databaseURL: "https://image-identifier-9704c.firebaseio.com",
  projectId: "image-identifier-9704c",
  storageBucket: "image-identifier-9704c.appspot.com",
  messagingSenderId: "585084521467",
  appId: "1:585084521467:web:c8c66a7a47679a0e4b195e",
  measurementId: "G-PP134E1K4D",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();
export { storage, database, firebase as default };
