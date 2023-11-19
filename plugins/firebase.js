import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOtyI-Kx9uJ4YcBvt3z4AZKUGJOS-8jDE",
    authDomain: "nuxt-firebase-ba650.firebaseapp.com",
    databaseURL: "https://nuxt-firebase-ba650-default-rtdb.firebaseio.com",
    projectId: "nuxt-firebase-ba650",
    storageBucket: "nuxt-firebase-ba650.appspot.com",
    messagingSenderId: "452433095820",
    appId: "1:452433095820:web:045e6203adb1ddfa165fa9",
    measurementId: "G-6GN81D3H8J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default ({ app }, inject) => {
  // แนบ Firebase Authentication และ Firebase App ให้ Vue ผ่านค่า inject
  inject('auth', auth);
  inject('firebase', app);
  app.auth = auth;
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("ผู้ใช้เข้าสู่ระบบ:", user);
    } else {
      console.log("ผู้ใช้ออกจากระบบ");
    }
  });
};

// export const auth = firebase.auth(); // Export the auth module

