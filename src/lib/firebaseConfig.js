// Import the functions you need from the SDKs you need
import { 
  initializeApp,
  getApps, 
  getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


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

const firebaseApp = !getApps().length ? initializeApp( firebaseConfig ) : getApp();
export const db = getFirestore();



