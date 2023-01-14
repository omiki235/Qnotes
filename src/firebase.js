import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLMZ6cUN1eGfVZxlpBJjBEEx89Uqyj_tA",
  authDomain: "twitter-clone-18a80.firebaseapp.com",
  projectId: "twitter-clone-18a80",
  storageBucket: "twitter-clone-18a80.appspot.com",
  messagingSenderId: "487313761835",
  appId: "1:487313761835:web:2e5c661b27ad98dba8ac6e",
  measurementId: "G-LX3KD7QLHV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
