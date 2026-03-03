"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">


            <Image
              src="/mentorship.png"
              alt="CareerForge Logo"
              width={36}
              height={36}
              className="bg-white rounded-xl p-1 dark:invert"
            />
            <div>
              <h1 className="font-semibold text-lg tracking-tight">
                CareerForge
              </h1>
              <p className="text-xs text-slate-400">
                AI Career Platform
              </p>
            </div>
          </div>

          {!user ? (
            <SignInButton mode="modal" signUpForceRedirectUrl="/dashboard">
              <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition">
                Get Started
              </button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">

        <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Build Your Career With
          <span className="block text-blue-500 mt-2">
            AI That Understands You
          </span>
        </h2>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Personalized guidance, resume optimization, roadmaps,
          and AI-powered career coaching — all in one platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold transition shadow-lg"
          >
            Start Coaching
          </Link>

          <Link
            href="/ai-tools"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-sm font-semibold transition"
          >
            Explore AI Tools
          </Link>

        </div>

      </section>

      {/* ================= FEATURE SECTION ================= */}
      <section className="border-t border-slate-800 py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold">
              Everything You Need to Grow
            </h3>
            <p className="text-slate-400 mt-3">
              Smart tools designed to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Tool Card */}
            {[
              {
                title: "AI Career Chat",
                desc: "Get instant answers and guidance from your AI mentor.",
              },
              {
                title: "Resume Analyzer",
                desc: "Improve your resume with AI-powered insights.",
              },
              {
                title: "Roadmap Generator",
                desc: "Generate structured learning paths tailored to you.",
              },
              {
                title: "Cover Letter AI",
                desc: "Create professional cover letters in minutes.",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 transition group"
              >
                <h4 className="text-lg font-medium group-hover:text-blue-500 transition">
                  {tool.title}
                </h4>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="border-t border-slate-800 py-20 text-center">

        <h3 className="text-3xl font-semibold">
          Take Control of Your Career Today
        </h3>

        <p className="text-slate-400 mt-3">
          Start building smarter. Move faster. Achieve more.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-sm transition"
          >
            Get Started Now
          </Link>
        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CareerForge. All rights reserved.
      </footer>

    </div>
  );
}