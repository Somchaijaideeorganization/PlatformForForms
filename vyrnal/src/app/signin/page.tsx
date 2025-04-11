// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthProvider, User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOAuthLogin = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("complete");
      await handleUserData(result.user);
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("See in console");
        console.error(e);
      }
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleUserData(result.user);
      console.log("complete");
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("See in console");
        console.error(e);
      }
    }
  };

  const handleUserData = async (user: User) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.providerData[0].providerId,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });
    } else {
      await setDoc(
        userRef,
        {
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleEmailLogin} className="w-full">
            Sign In with Email
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleOAuthLogin(new GoogleAuthProvider())}
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />{" "}
              Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleOAuthLogin(new FacebookAuthProvider())}
            >
              <Image
                src="https://www.facebook.com/favicon.ico"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />{" "}
              Facebook
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                handleOAuthLogin(new OAuthProvider("microsoft.com"))
              }
            >
              <Image
                src="https://www.microsoft.com/favicon.ico"
                alt="Microsoft"
                width={20}
                height={20}
                className="mr-2"
              />{" "}
              Microsoft
            </Button>

            <Button
              variant="outline"
              onClick={() => handleOAuthLogin(new TwitterAuthProvider())}
            >
              <Image
                src="https://www.twitter.com/favicon.ico"
                alt="Twitter"
                width={20}
                height={20}
                className="mr-2"
              />{" "}
              X
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="font-medium text-primary underline-offset-4 hover:underline ml-2"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
