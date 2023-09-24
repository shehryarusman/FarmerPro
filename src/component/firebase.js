
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOND1tBl6Na7BLI089mwHy3jK7dVjyx5s",
  authDomain: "plant-disease-classifier-4f4c8.firebaseapp.com",
  projectId: "plant-disease-classifier-4f4c8",
  storageBucket: "plant-disease-classifier-4f4c8.appspot.com",
  messagingSenderId: "1095168778479",
  appId: "1:1095168778479:web:b3f2bc61ca11b8bbb47b1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);