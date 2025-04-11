"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "@/app/globals.css";

import { ThemeToggle } from "../../components/theme-toggle";
import AIModal from "../../components/form/ai-chat";
import { getFormBody, getFormHeader } from "../../components/form/renderer";
import { Form } from "@/data/type";

function FormPage() {
  const [formData, setFormData] = useState<Form>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://vyrnal-db-api.vercel.app/getForms/byID`, {
        params: { id },
      })
      .then((response) => {
        setFormData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [id]);

  if (!id)
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <p className="text-lg my-6">No ID in query parameter 🙁</p>
      </div>
    );

  if (!formData)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex items-center justify-center">
          <span
            className="inline-block animate-spin text-3xl"
            style={{
              animationDuration: "1.5s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
            role="status"
            aria-label="Loading"
          >
            😀
          </span>
        </div>
      </div>
    );

  return (
    <main className="h-[200vh]">
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>
      <AIModal />
      {getFormHeader(formData)}
      {getFormBody(formData)}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <div className="flex items-center justify-center">
            <span
              className="inline-block animate-spin text-3xl"
              style={{
                animationDuration: "1.5s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
              role="status"
              aria-label="Loading"
            >
              😀
            </span>
          </div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  );
}
