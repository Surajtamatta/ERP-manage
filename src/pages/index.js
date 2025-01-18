import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import DashboardPage from "./dashboard";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} fles items-start justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DashboardPage/>
      </main>
      <Toaster />
      <Footer/>
    </div>
  );
}
