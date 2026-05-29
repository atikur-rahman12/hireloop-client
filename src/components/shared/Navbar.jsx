"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Bars,
  Xmark,
  Briefcase,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

const navLinks = [
  {
    name: "Browse Jobs",
    href: "/jobs",
  },
  {
    name: "Companies",
    href: "/companies",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-3 sm:px-4 lg:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500 shadow-lg">
            <Briefcase className="h-5 w-5 text-white" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-wide text-white">
              Hire Loop
            </span>

            <span className="text-xs text-gray-400">Hiring Platform</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-lg lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-violet-400"
            >
              {link.name}
            </Link>
          ))}

          <div className="mx-2 h-6 w-px bg-white/10" />

          <Link
            href="/signin"
            className="px-3 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="bg-white px-4 py-2 rounded-lg font-semibold text-black hover:bg-gray-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <Xmark className="h-6 w-6" />
          ) : (
            <Bars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] lg:hidden">
          <div className="space-y-2 px-4 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="my-3 border-t border-white/10" />

            <Link
              href="/signin"
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-violet-400 transition hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <ArrowRightFromSquare className="h-4 w-4" />
              Sign In
            </Link>

            <Link
              href="/signup"
              className="w-full block text-center bg-white px-4 py-2 rounded-full font-semibold text-black hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
