// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

import "@/app/globals.css";
import { Layout } from "@/components/auth/Layout";
import { FormInput } from "@/components/auth/FormInput";
import { AlertCircle, Mail, User, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { setAuthCookie } from "@/utils/cookies";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (name: string) => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

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

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const validateTerms = (agreed: boolean) => {
    if (!agreed) {
      setTermsError("You must agree to the terms and conditions");
      return false;
    }

    setTermsError("");
    return true;
  };

  const handleSignup = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isTermsValid = validateTerms(agreedToTerms);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isTermsValid
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      setAuthCookie(token);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        provider: "password",
      });
      console.log("Signup complete");
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Sign up failed",
          description: e.message,
          variant: "destructive",
        });
      } else {
        console.error(e);
        toast({
          title: "Sign up failed",
          description: "See message in console",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Layout
      title="Create your account"
      subtitle="Get started with a free account"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="space-y-4"
      >
        <FormInput
          id="name"
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          autoComplete="name"
          required
          icon={<User size={18} />}
        />

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
          autoComplete="new-password"
          required
          icon={<Lock size={18} />}
        />

        <FormInput
          id="confirm-password"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          autoComplete="new-password"
          required
          icon={<Lock size={18} />}
        />

        <div className="space-y-2">
          <div className="flex items-start">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked: never) => {
                setAgreedToTerms(checked as boolean);
                if (checked) setTermsError("");
              }}
              className="mt-1"
            />
            <Label htmlFor="terms" className="ml-2 text-sm text-slate-700 dark:text-white">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                privacy policy
              </a>
            </Label>
          </div>

          {termsError && (
            <div className="flex items-center text-sm text-red-500">
              <AlertCircle size={14} className="mr-1" />
              {termsError}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600 dark:text-white">
        Already have an account?
        <Link
          href="/signin"
          className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
        >
          Sign in
        </Link>
      </div>
    </Layout>
  );
}
