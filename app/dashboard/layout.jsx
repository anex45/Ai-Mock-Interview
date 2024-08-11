import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-black text-white">
      <Header />
      <main className="flex-grow mx-5 md:mx-20 lg:mx-36 my-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
