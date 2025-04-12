// src/provider/AuthProvider.tsx
"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

// กำหนดประเภทของข้อมูลที่แชร์ใน AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null); // ค่าเริ่มต้นเป็น null

const PUBLIC_PATHS = ["/", "/home", "/docs", "/aboutus"]; // หน้า public ที่สามารถเข้าถึงได้โดยไม่ต้อง login

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const pathname = window.location.pathname;

      // หากผู้ใช้เข้าสู่หน้า public (เช่น /, /home, /docs, /aboutus) ไม่ต้อง redirect
      if (!currentUser && !PUBLIC_PATHS.includes(pathname)) {
        router.push("/signin"); // หากไม่ใช่หน้า public และผู้ใช้ไม่ได้ login ให้ไปหน้า signin
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children} {/* จะ render page เมื่อโหลดเสร็จ */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
