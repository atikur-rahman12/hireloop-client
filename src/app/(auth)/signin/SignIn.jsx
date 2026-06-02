"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    // ✅ FRONTEND VALIDATION (required check)
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful 🎉");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#111827] to-[#0b1220] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-center text-gray-400 text-sm mt-2">
            Sign in to continue your journey
          </p>

          <form onSubmit={handleSignIn} className="space-y-4 mt-6">
            {/* EMAIL */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required // ✅ REQUIRED ADDED
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-white"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] active:scale-95 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

              <span className="relative z-10">
                {loading ? "Signing in..." : "Sign In"}
              </span>
            </button>

            {/* OR */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-white/10"></div>

              <span className="px-3 text-xs text-gray-400 uppercase tracking-wider">
                OR
              </span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* GOOGLE */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] active:scale-95"
              >
                <Image
                  src={"https://www.svgrepo.com/show/475656/google-color.svg"}
                  alt="google"
                  className="w-5 h-5"
                  width={45}
                  height={45}
                />
                Google
              </button>

              {/* GITHUB */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] active:scale-95"
              >
                <Image
                  src={"https://www.svgrepo.com/show/512317/github-142.svg"}
                  alt="github"
                  className="w-5 h-5 invert"
                  width={45}
                  height={45}
                />
                GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="relative text-blue-400 font-medium transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
