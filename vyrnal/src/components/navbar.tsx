"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import "@/app/globals.css";
import {
  UserRound,
  LogIn,
  Sidebar,
  House,
  NotebookText,
  Users,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRouter } from "next/navigation";
import Logo from "./Logo";

const Divider = () => (
  <Separator className="w-px h-8 bg-muted-foreground/20 md:block" />
);

const NavBar = ({
  currentPage,
}: {
  currentPage: "home" | "docs" | "aboutus";
}) => {
  const router = useRouter();

  return (
    <div className="bg-background/70 w-full p-10 h-16 items-center flex fixed z-[10] flex-col gap-6">
      <div className="flex items-center justify-between max-w-screen-xl min-w-full">
        {/* Left: Logo */}
        <div className="flex items-center w-auto md:w-auto justify-self-start gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="circleIcon">
                <Sidebar />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-[200]">
              <SheetHeader>
                <SheetTitle>Pages</SheetTitle>
                <Separator />
              </SheetHeader>

              <Link href={"/home"}>
                <p
                  className={currentPage === "home" ? "font-bold my-3" : "my-3"}
                >
                  Home
                  <House className="inline w-4 h-4 ml-2" />
                </p>
              </Link>
              <Link href={"/docs"}>
                <p
                  className={currentPage === "docs" ? "font-bold my-3" : "my-3"}
                >
                  Docs
                  <NotebookText className="inline w-4 h-4 ml-2" />
                </p>
              </Link>
              <Link href={"/aboutus"}>
                <p
                  className={
                    currentPage === "aboutus" ? "font-bold my-3" : "my-3"
                  }
                >
                  About us
                  <Users className="inline w-4 h-4 ml-2" />
                </p>
              </Link>
            </SheetContent>
          </Sheet>

          <Logo />
          <Divider />
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Divider />
          <Link href={"/home"}>
            <Button
              variant={currentPage === "home" ? "default" : "secondary"}
              className={
                currentPage === "home" ? "font-bold gradient-shadow" : ""
              }
            >
              Home
              <House className="inline w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={"/docs"}>
            <Button
              variant={currentPage === "docs" ? "default" : "secondary"}
              className={
                currentPage === "docs" ? "font-bold gradient-shadow" : ""
              }
            >
              Docs
              <NotebookText className="inline w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={"/aboutus"}>
            <Button
              variant={currentPage === "aboutus" ? "default" : "secondary"}
              className={
                currentPage === "aboutus" ? "font-bold gradient-shadow" : ""
              }
            >
              About us
              <Users className="inline w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Divider />
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-4 items-center justify-self-end">
          <Button
            variant="default"
            className="hidden md:inline-flex gradient-shadow"
            onClick={() => router.push("/signin")}
          >
            Sign in
            <LogIn className="ml-2" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/signin")}
          >
            <UserRound />
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default NavBar;
