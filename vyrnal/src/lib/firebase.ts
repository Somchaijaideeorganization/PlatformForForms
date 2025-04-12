// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// ตรวจสอบว่า env มีค่าแล้วหรือไม่
if (
  !process.env.NEXT_PUBLIC_API_KEY ||
  !process.env.NEXT_PUBLIC_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_AUTH_DOMAIN
) {
  throw new Error("Missing required Firebase environment variables.");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,  // บังคับ long polling ถ้ามีปัญหาเชื่อมต่อ
});

// Providers สำหรับ OAuth ต่าง ๆ
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
export const twitterProvider = new TwitterAuthProvider();
