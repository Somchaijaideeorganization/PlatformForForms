"use client";

import React from "react";
import "./globals.css";

import NavBar from "@/components/navbar";
import Hero from "@/components/home/Hero";

export default function App() {
  return (
    <>
      <main>
        <NavBar currentPage="home" />
        <Hero />
      </main>
    </>
  );
}
