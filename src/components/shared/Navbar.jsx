"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import UserDropdown from "../UserDropdown";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-3 sm:px-4 lg:px-5">
        {/* MOBILE */}
        <div className="flex w-full items-center justify-between lg:hidden">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl bg-white/5 p-2 text-white"
            >
              {isMenuOpen ? (
                <Xmark className="h-6 w-6" />
              ) : (
                <Bars className="h-6 w-6" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500">
                <Briefcase className="h-5 w-5 text-white" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white">Hire Loop</span>
                <span className="text-xs text-gray-400">Hiring Platform</span>
              </div>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <UserDropdown user={user} />
        </div>

        {/* DESKTOP LOGO */}
        <Link href="/" className="hidden lg:flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-white">Hire Loop</span>
            <span className="text-xs text-gray-400">Hiring Platform</span>
          </div>
        </Link>

        {/* DESKTOP NAV (ONLY PADDED CHANGE HERE) */}
        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-4 text-sm text-gray-300 transition-all duration-300 ease-out hover:text-white hover:-translate-y-px group"
            >
              {link.name}

              <span className="absolute left-1/2 bottom-2 h-0.5 w-0 -translate-x-1/2 bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-3/4 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            </Link>
          ))}

          <div className="mx-2 h-6 w-px bg-white/10" />

          {user ? (
            <UserDropdown user={user} />
          ) : (
            <>
              {/* SIGN IN (PREMIUM HOVER) */}
              <Link
                href="/signin"
                className="text-sm text-violet-400 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-violet-300 hover:scale-[1.05]"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.05] hover:shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU (UPDATED PREMIUM HOVER ONLY) */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] lg:hidden">
          <div className="space-y-2 px-4 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="
            block rounded-xl px-4 py-3 text-sm text-gray-300
            transition-all duration-200
            hover:bg-white/10
            hover:text-violet-400
            hover:scale-[1.02]
            hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
            active:scale-[0.98]
          "
              >
                {link.name}
              </Link>
            ))}

            {/* AUTH SECTION */}
            {!user && (
              <>
                <div className="my-3 border-t border-white/10" />

                <Link
                  href="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="
              block rounded-xl px-4 py-3 text-violet-400
              transition-all duration-200
              hover:bg-white/10
              hover:text-violet-300
              hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
              active:scale-[0.98]
            "
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="
              block rounded-xl bg-white px-4 py-3 text-center font-semibold text-black
              transition-all duration-200
              hover:scale-[1.02]
              hover:shadow-lg
              active:scale-[0.98]
            "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
