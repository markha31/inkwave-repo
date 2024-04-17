import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBMQU2rVLZH1KNNqNVa5YYo40zby7u9ixg",
  authDomain: "ink-wave.firebaseapp.com",
  databaseURL: "https://ink-wave-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ink-wave",
  storageBucket: "ink-wave.appspot.com",
  messagingSenderId: "601370757997",
  appId: "1:601370757997:web:10a6fd02e323fba1012864"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app);

