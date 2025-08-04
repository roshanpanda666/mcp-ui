import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo or Brand */}
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">
          🔮 HouseAI
        </h1>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-sm md:text-base text-white font-medium">
          <li>
            <Link href="/" className="hover:text-cyan-400 transition duration-200">
              Homepage
            </Link>
          </li>
          <li>
            <Link href="/enter" className="hover:text-cyan-400 transition duration-200">
              Enter Data
            </Link>
          </li>
          <li>
            <Link href="/predicted" className="hover:text-cyan-400 transition duration-200">
              Predicted Value
            </Link>
          </li>
          <li>
            <Link href="/graph" className="hover:text-cyan-400 transition duration-200">
              Graph
            </Link>
          </li>
          <li>
            <Link href="/graph2" className="hover:text-cyan-400 transition duration-200">
              Graph 2
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
