// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP9pkydo4ecVv94sGKZZ1oKgkKFptGmdk",
  authDomain: "todo-app-svelte001.firebaseapp.com",
  databaseURL: "https://todo-app-svelte001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-svelte001",
  storageBucket: "todo-app-svelte001.appspot.com",
  messagingSenderId: "853168021556",
  appId: "1:853168021556:web:399d1fc236bf01ff0eea61",
  measurementId: "G-QG2RH8XPRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase( app );
