"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AnimatedHeader() {
  const { user } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isHidden ? "-translate-y-full" : "translate-y-0"}
        ${isScrolled
          ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
          : "bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <Logo width={30} height={30} animated={false} />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              CareerForge
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              AI Career Platform
            </span>
          </div>
        </Link>

        {/* RIGHT: AUTH */}
        <div className="flex items-center gap-4">

          {!user ? (
            <SignInButton mode="modal" signUpForceRedirectUrl="/dashboard">
              <button
                className="
                  px-4 py-2 rounded-xl
                  bg-neutral-900 text-white
                  dark:bg-neutral-100 dark:text-black
                  text-sm font-medium
                  transition hover:scale-[1.02]
                "
              >
                Get Started
              </button>
            </SignInButton>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-neutral-600 dark:text-neutral-400">
                Welcome, {user.firstName}
              </span>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700",
                  },
                }}
              />
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}