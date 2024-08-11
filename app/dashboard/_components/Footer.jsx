import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gradient-to-r from-gray-900 to-black text-center text-white">
      <div className="container px-6 pt-6">
        <div className="text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold">anex45</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
