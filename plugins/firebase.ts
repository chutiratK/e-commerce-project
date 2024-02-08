import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Functions, getFunctions } from "firebase/functions";
import "firebase/auth";
import "firebase/functions";

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
// const firestore = app.firestore();
const functions: Functions = getFunctions(app);

export default ({ app }: { app: any }, inject: any) => {
  inject("auth", auth);
  inject("firebase", app);
  inject("functions", functions);
  // inject('firestore', firestore);

  app.auth = auth;

  auth.onAuthStateChanged(async (user: any) => {
    if (user) {
      console.log("ผู้ใช้เข้าสู่ระบบ:", user);
    } else {
      console.log("ผู้ใช้ออกจากระบบ");
    }
  });
};

export { auth, functions };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFunctions } from "firebase/functions";
// import "firebase/auth";
// import "firebase/functions";

// const firebaseConfig = {
//   apiKey: "AIzaSyCOtyI-Kx9uJ4YcBvt3z4AZKUGJOS-8jDE",
//   authDomain: "nuxt-firebase-ba650.firebaseapp.com",
//   databaseURL: "https://nuxt-firebase-ba650-default-rtdb.firebaseio.com",
//   projectId: "nuxt-firebase-ba650",
//   storageBucket: "nuxt-firebase-ba650.appspot.com",
//   messagingSenderId: "452433095820",
//   appId: "1:452433095820:web:045e6203adb1ddfa165fa9",
//   measurementId: "G-6GN81D3H8J",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // const firestore = app.firestore();
// const functions = getFunctions(app);

// export default ({ app }, inject) => {
//   inject("auth", auth);
//   inject("firebase", app);
//   inject("functions", functions);
//   // inject('firestore', firestore);

//   app.auth = auth;

//   auth.onAuthStateChanged(async (user) => {
//     if (user) {
//       console.log("ผู้ใช้เข้าสู่ระบบ:", user);
//     } else {
//       console.log("ผู้ใช้ออกจากระบบ");
//     }
//   });
// };

// export { auth, functions };
