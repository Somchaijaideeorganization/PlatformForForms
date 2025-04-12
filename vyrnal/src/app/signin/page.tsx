"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  AuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  microsoftProvider,
  twitterProvider,
} from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Layout } from "@/components/auth/Layout";
import { SocialButton } from "@/components/auth/SocialButton";
import { Divider } from "@/components/auth/Divider";
import { FormInput } from "@/components/auth/FormInput";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { setAuthCookie } from "@/utils/cookies";
import "@/app/globals.css";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleOAuthLogin = async (provider: AuthProvider) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      setAuthCookie(token);

      const userRef = doc(db, "users", user.uid);
      console.log(userRef);
      const docSnap = await getDoc(userRef);
      console.log(docSnap);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: user.providerData[0]?.providerId || "",
        });
      } else {
        await setDoc(userRef, { merge: true });
      }
      toast({
        title: "Sign in successful",
        description: `Signed in with ${provider.providerId}`,
      });
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Sign in failed",
          description: e.message,
          variant: "destructive",
        });
      } else {
        console.error(e);
        toast({
          title: "Sign in failed",
          description: "See message in console",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  };

  // สำหรับ Email/Password
  const handleEmailLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      const token = await user.getIdToken();
      setAuthCookie(token);

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider: "password",
        });
      } else {
        await setDoc(
          userRef,
          { lastLogin: new Date().toISOString() },
          { merge: true }
        );
      }
      toast({
        title: "Sign in successful",
        description: `Signed in with Email`,
      });
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Sign in failed",
          description: e.message,
          variant: "destructive",
        });
      } else {
        console.error(e);
        toast({
          title: "Sign in failed",
          description: "See message in console",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Welcome back" subtitle="Sign in to your account to continue">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailLogin();
        }}
        className="space-y-4"
      >
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
          required
          icon={<Mail size={18} />}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="current-password"
          required
          icon={<Lock size={18} />}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <Divider text="Or continue with" />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton
          onClick={() => handleOAuthLogin(googleProvider)}
          icon={
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
          provider="Google"
        />

        <SocialButton
          onClick={() => handleOAuthLogin(facebookProvider)}
          icon={
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="#1877F2"
              />
            </svg>
          }
          provider="Facebook"
        />

        <SocialButton
          onClick={() => handleOAuthLogin(microsoftProvider)}
          icon={
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
            >
              <path fill="#f1511b" d="M11.5 0h-11.5v11.5h11.5v-11.5z" />
              <path fill="#80cc28" d="M23 0h-11.5v11.5h11.5v-11.5z" />
              <path fill="#00adef" d="M11.5 11.5h-11.5v11.5h11.5v-11.5z" />
              <path fill="#fbbc09" d="M23 11.5h-11.5v11.5h11.5v-11.5z" />
            </svg>
          }
          provider="Microsoft"
        />

        <SocialButton
          onClick={() => handleOAuthLogin(twitterProvider)}
          icon={
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                fill="#1DA1F2"
              />
            </svg>
          }
          provider="Twitter"
        />
      </div>

      <div className="mt-6 text-center text-sm text-slate-600 dark:text-white">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="font-medium text-primary-600 hover:text-primary-500 ml-2"
        >
          Sign up
        </Link>
      </div>
    </Layout>
  );
}
