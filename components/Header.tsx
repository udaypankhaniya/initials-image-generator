"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageIcon, Github, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ImageIcon className="h-7 w-7 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Initials Image Generator
            </h1>
          </div>
          <div className="flex items-center sm:space-x-4">
            <div className="hidden sm:flex space-x-4">
              <Link href="/app">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/udaypankhaniya/initials-image-generator">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Button>
              </Link>
            </div>
            <button
              className="sm:hidden text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 flex flex-col space-y-3 animate-slide-down">
            <Link href="/app">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2 text-sm font-medium transition-all duration-300">
                Get Started
              </Button>
            </Link>
            <Link href="https://github.com/udaypankhaniya/initials-image-generator">
              <Button
                variant="outline"
                className="w-full flex justify-center items-center space-x-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 rounded-full py-2 text-sm font-medium transition-all duration-300"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}