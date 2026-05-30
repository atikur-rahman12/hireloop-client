"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "@gravity-ui/icons";
import { signOut } from "@/lib/auth-client";
import { LogIn, LogOut } from "lucide-react";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div ref={dropdownRef} className="relative flex items-center gap-2">
      {/* LEFT ICON (ONLY IF USER EXISTS) */}
      {user && (
        <button className="rounded-xl bg-white/5 p-2 text-white hover:bg-white/20">
          <Bell className="h-5 w-5" />
        </button>
      )}

      {/* RIGHT SIDE: USER OR GET STARTED */}
      {user ? (
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-fuchsia-500 text-[16px] font-bold text-white">
              {initials}
            </div>
          )}
        </button>
      ) : (
        <Link
          href="/signin"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.06] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
        >
          {/* text */}
          <span className="relative z-10 tracking-wide">Sign In</span>

          <LogIn className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-300 ml-2" />

          {/* soft glow layer */}
          <span className="absolute inset-0 rounded-lg opacity-0 transition duration-500 group-hover:opacity-100 bg-linear-to-r from-violet-500/10 via-white/10 to-fuchsia-500/10" />

          {/* shimmer sweep */}
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
        </Link>
      )}

      {/* DROPDOWN ONLY FOR USER */}
      <AnimatePresence>
        {user && isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-white/10 bg-[#111] p-4 shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-fuchsia-500 text-2xl font-bold text-white">
                  {initials}
                </div>
              )}

              <h3 className="mt-3 font-semibold text-white">
                {user.name || "User"}
              </h3>

              <p className="text-xs text-gray-400">{user.email || ""}</p>
            </div>

            <div className="mt-5 space-y-2">
              <Link
                href="/account"
                className="block w-full rounded-xl px-4 py-2 text-center text-sm text-violet-400 hover:bg-white/10"
              >
                Update your account
              </Link>

              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_10px_30px_rgba(239,68,68,0.35)]"
              >
                <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="relative z-10">Logout</span>

                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
