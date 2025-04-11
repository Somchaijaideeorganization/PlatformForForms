// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  initializeFirestore,
} from "firebase/firestore";

// ✅ ตรวจสอบว่า env ถูกโหลดจริง
if (
  !process.env.NEXT_PUBLIC_API_KEY ||
  !process.env.NEXT_PUBLIC_PROJECT_ID
) {
  throw new Error("Missing Firebase environment variables");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};

// ✅ สร้าง app แค่ครั้งเดียว
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ ใช้ initializeFirestore + forceLongPolling
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});



const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");
const twitterProvider = new TwitterAuthProvider();

export { app, db, auth, googleProvider, facebookProvider, microsoftProvider, twitterProvider };
