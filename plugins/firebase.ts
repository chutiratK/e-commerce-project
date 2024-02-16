import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Functions, getFunctions } from "firebase/functions";
import liff from "@line/liff";
import Vue from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyCOtyI-Kx9uJ4YcBvt3z4AZKUGJOS-8jDE",
  authDomain: "nuxt-firebase-ba650.firebaseapp.com",
  databaseURL: "https://nuxt-firebase-ba650-default-rtdb.firebaseio.com",
  projectId: "nuxt-firebase-ba650",
  storageBucket: "nuxt-firebase-ba650.appspot.com",
  messagingSenderId: "452433095820",
  appId: "1:452433095820:web:045e6203adb1ddfa165fa9",
  measurementId: "G-6GN81D3H8J",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const functions: Functions = getFunctions(app);

Vue.prototype.$auth = auth;
Vue.prototype.$firebase = app;
Vue.prototype.$functions = functions;

auth.onAuthStateChanged((user: any) => {
  if (user) {
    console.log("ผู้ใช้เข้าสู่ระบบ:", user);
  } else {
    console.log("ผู้ใช้ออกจากระบบ");
  }
});

liff
  .init({ liffId: "2003517508-8gKpw6JQ" })
  .then(() => {
    auth.onAuthStateChanged(async (user) => {
      if (liff.isLoggedIn()) {
        const user = await liff.getProfile();
        console.log("ผู้ใช้เข้าสู่ระบบด้วย line:", user);
      } else {
        console.log("ผู้ใช้ออกจากระบบ line");
      }
    });
  })
  .catch((error) => {
    console.error("Error initializing LIFF: ", error);
  });
