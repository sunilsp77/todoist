import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBbX8PPcYYC2IJ8dzDrN27eIETZ-vD87o0",
  authDomain: "sunil-todolist.firebaseapp.com",
  databaseURL: "https://sunil-todolist.firebaseio.com",
  projectId: "sunil-todolist",
  storageBucket: "sunil-todolist.appspot.com",
  messagingSenderId: "226318675066",
  appId: "1:226318675066:web:f98097f3382d79fba3dfc3",
});

export { firebaseConfig as firebase };
