import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="blur-circle1 absolute left-[10%] top-[20%] w-[200px] h-[200px] bg-gradient-to-b from-pink-400 to-pink-600 rounded-full blur-[120px]"></div>
      <div className="blur-circle2 absolute right-[10%] top-[20%] w-[200px] h-[200px] bg-gradient-to-b from-purple-400 to-purple-600 rounded-full blur-[100px]"></div>

      {/* Start Landing Page */}
      <div className="landing-page">
        <Header />

        <div className="content flex items-center justify-between min-h-[calc(100vh-80px)] p-4 container mx-auto md:flex-row flex-col gap-[140px] md:gap-0 md:justify-between">
          <div className="info text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-[50px] font-bold text-gray-100 leading-tight animate-fadeIn">
              Prepare for Your Next Interview
            </h1>
            <p className="text-[18px] leading-relaxed text-gray-300 mt-4 animate-fadeIn delay-1s">
              Practice with mock interviews and receive detailed feedback to understand where you stand.
            </p>
            <Link href="/dashboard">
              <Button className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg transform transition-transform hover:scale-105 animate-fadeIn delay-2s">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="image animate-slideIn">
            <img
              className="main-image w-[600px] h-[400px] object-contain rounded-lg shadow-lg"
              src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp"
              alt="Main"
            />
          </div>
        </div>
      </div>
      {/* End Landing Page */}
    </div>
  );
}
