import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/_components/AppSidebar";
import AppHeader from "@/app/_components/AppHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerForge",
  description: "Forge your career with AI-powered guidance and tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <SidebarProvider>
            <div className='flex w-screen h-screen'>
              <AppSidebar />
              <main className='flex-1 overflow-auto flex flex-col bg-gray-50 relative'>
                {/* Animated background elements for main area */}
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-white to-transparent pointer-events-none'></div>
                <AppHeader />
                <div className='p-10 relative z-10 flex-1 overflow-auto'>{children}</div>
              </main>
            </div>
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
