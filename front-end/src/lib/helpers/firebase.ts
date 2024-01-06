// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbOY-beoqRpfNZ1AzAUHUz07D5znZIYQs",
  authDomain: "streamweb-9675d.firebaseapp.com",
  projectId: "streamweb-9675d",
  storageBucket: "streamweb-9675d.appspot.com",
  messagingSenderId: "957565954558",
  appId: "1:957565954558:web:6380af16e24e11a7c8b8af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);