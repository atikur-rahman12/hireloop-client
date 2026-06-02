"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import UserDropdown from "../UserDropdown";
import { ArrowRight, LogIn } from "lucide-react";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-3 sm:px-4 lg:px-5">
        {/* MOBILE */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            {/* MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-80 rounded-xl bg-[#0B0B0F] p-2 text-white shadow-lg cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Xmark className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Bars className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500">
                <Briefcase className="h-5 w-5 text-white" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white">Hire Loop</span>
                <span className="text-xs text-gray-300">Hiring Platform</span>
              </div>
            </Link>
          </div>

          <UserDropdown user={user} />
        </div>

        {/* DESKTOP LOGO */}
        <Link href="/" className="hidden lg:flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-500">
            <Briefcase className="h-5 w-5 text-white" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-white">Hire Loop</span>
            <span className="text-xs text-gray-300">Hiring Platform</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative px-4 py-4 text-sm text-gray-300 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
            >
              <span className="relative z-10">{link.name}</span>

              <span className="absolute left-1/2 bottom-2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-3/4 shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
            </Link>
          ))}

          <div className="mx-2 h-6 w-px bg-white/10" />

          {user ? (
            <UserDropdown user={user} />
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm text-violet-300 px-3 py-2 rounded-xl hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  Sign In
                  <LogIn className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                {/* hover background */}
                <span className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative z-10">Get Started</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* BACKDROP */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* DROPDOWN */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 top-20 z-50 w-[92%] max-w-sm rounded-2xl border border-white/10 bg-black/85 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
            >
              <div className="space-y-2 px-4 py-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="
                        group relative block rounded-xl px-4 py-3 text-sm text-gray-300
                        transition-all duration-300 ease-out
                        hover:text-white hover:bg-white/5
                        hover:translate-x-1 hover:-translate-y-px
                      "
                    >
                      <span className="relative z-10">{link.name}</span>

                      <span
                        className="
                          absolute left-4 bottom-2 h-0.5 w-0
                          bg-linear-to-r from-violet-500 to-fuchsia-500
                          transition-all duration-300
                          group-hover:w-[70%]
                          rounded-full
                          shadow-[0_0_12px_rgba(168,85,247,0.6)]
                        "
                      />

                      <span
                        className="
                          absolute inset-0 rounded-xl opacity-0
                          bg-linear-to-r from-violet-500/10 to-fuchsia-500/10
                          transition-opacity duration-300
                          group-hover:opacity-100
                        "
                      />
                    </Link>
                  </motion.div>
                ))}

                {!user && (
                  <>
                    <div className="my-3 border-t border-white/20" />

                    <Link
                      href="/signup"
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {/* hover background */}
                      <span className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <span className="relative z-10">Get Started</span>

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
