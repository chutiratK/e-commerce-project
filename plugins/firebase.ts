import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Functions, getFunctions } from "firebase/functions";
import Vue from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyDSJ-UKS-cZcT5SkTCh9na2admp-UwtHN4",
  authDomain: "nuxt-firebase-auth-6c26b.firebaseapp.com",
  databaseURL:
    "https://nuxt-firebase-auth-6c26b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "nuxt-firebase-auth-6c26b",
  storageBucket: "nuxt-firebase-auth-6c26b.appspot.com",
  messagingSenderId: "783600074081",
  appId: "1:783600074081:web:07976fb0b0f67c910c1920",
  measurementId: "G-G69JL6WLC5",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const functions: Functions = getFunctions(app);

Vue.prototype.$auth = auth;
Vue.prototype.$firebase = app;
Vue.prototype.$functions = functions;

auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("ผู้ใช้เข้าสู่ระบบ:", user);
  } else {
    console.log("ผู้ใช้ออกจากระบบ");
  }
});

export { auth };
