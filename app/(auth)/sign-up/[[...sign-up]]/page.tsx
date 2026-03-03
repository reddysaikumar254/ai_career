import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
           <Image
              src="/mentorship.png"
              alt="CareerForge Logo"
              width={36}
              height={36}
              className="bg-white rounded-xl p-1 dark:invert"
            />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white text-center">
            Create your CareerForge account
          </h1>

          <p className="text-sm text-slate-400 mt-2 text-center">
            Join thousands building their careers with AI guidance.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <SignUp />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} CareerForge. All rights reserved.
        </div>

      </div>
    </div>
  );
}