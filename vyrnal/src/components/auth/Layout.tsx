import React from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
import { ThemeToggle } from "../theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="text-center mb-6 flex flex-col">
              <Logo />
              <Separator className="my-4" />
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-2 text-sm">{subtitle}</p>}
            </div>
            {children}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
