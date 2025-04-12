"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export function SignOutButton() {
  const { loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // ลบ token ใน cookie (ถ้าคุณตั้งค่าไว้)
      document.cookie = "token=; path=/; max-age=0; samesite=strict; secure";
      router.push("/"); // Redirect ไปหน้าหลักหลัง sign out
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // ติดตามสถานะการยืนยันตัวตน
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // ดึงข้อมูลผู้ใช้จาก Firestore (เก็บไว้ในคอลเลกชัน "users")
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push("/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Signed in as: {user.email}</p>
          {userData ? (
            <div>
              <p>Display Name: {userData.displayName || "N/A"}</p>
              {/* คุณสามารถแสดงข้อมูลอื่น ๆ จาก Firestore ได้เช่นกัน */}
            </div>
          ) : (
            <p>No additional user data found.</p>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <SignOutButton />
    </div>
  );
}
