// src/app/dashboard/page.tsx
"use client";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      {/* Display user data */}
    </div>
  );
}