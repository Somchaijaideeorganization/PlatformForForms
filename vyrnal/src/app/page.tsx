"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";

import { ThemeSwitcher } from "../components/theme-switcher";
export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <main className="h-[200vh] ">
        {isClient ? <ThemeSwitcher /> : null}
        Welcome to Vyrnal (this is home page ya kid mak)
      </main>
    </>
  );
}
