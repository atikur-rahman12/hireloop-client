"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Image as ImageIcon, Lock } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      {/* LABEL */}
      <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
        {label}

        {required && <span className="text-red-500">*</span>}
      </label>

      {/* INPUT */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300
        ${
          error ? "border-red-500 bg-red-500/10" : "border-white/10 bg-white/5"
        }`}
      >
        <Icon size={18} className="text-gray-400" />

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-white placeholder-gray-500"
        />
      </div>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500 animate-pulse">{error}</p>}
    </div>
  );
};

export default function SignupPage() {
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (value.trim()) {
        delete updatedErrors[name];
      }

      if (name === "password" || name === "confirmPassword") {
        delete updatedErrors.confirmPassword;
      }

      return updatedErrors;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const registerData = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!registerData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!registerData.email?.trim()) {
      newErrors.email = "Email is required";
    }

    if (!registerData.password?.trim()) {
      newErrors.password = "Password is required";
    }

    if (!registerData.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    if (registerData.password && registerData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (
      registerData.password &&
      registerData.confirmPassword &&
      registerData.password !== registerData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (newErrors.confirmPassword === "Passwords do not match") {
        toast.error("Confirm password does not match");
      } else if (registerData.password && registerData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
      } else {
        toast.error("Required fields cannot be empty");
      }

      return;
    }

    setErrors({});

    try {
      const { data, error } = await signUp.email({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        image: registerData.image,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful 🎉");

      router.push("/signin");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#0f172a] via-[#111827] to-[#0b1220]">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          {/* TITLE */}
          <h2 className="text-4xl font-bold text-center text-white">
            Create Account
          </h2>

          <p className="text-center text-sm text-gray-400 mt-2">
            Create your account and get started.
          </p>

          {/* FORM */}
          <form className="space-y-4 mt-6" onSubmit={handleSignUp}>
            {/* NAME */}
            <InputField
              icon={User}
              label="Name"
              name="name"
              placeholder="Enter your name"
              required
              error={errors.name}
              onChange={handleInputChange}
            />

            {/* EMAIL */}
            <InputField
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              error={errors.email}
              onChange={handleInputChange}
            />

            {/* IMAGE */}
            <InputField
              icon={ImageIcon}
              label="Image URL"
              name="image"
              placeholder="Image URL (optional)"
              onChange={handleInputChange}
            />

            {/* PASSWORD */}
            <InputField
              icon={Lock}
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              error={errors.password}
              onChange={handleInputChange}
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              icon={Lock}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="relative w-full py-3 mt-2 rounded-xl font-semibold text-white bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] active:scale-95 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

              <span className="relative z-10">Create Account</span>
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

            {/* SIGN IN */}
            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="relative text-blue-400 font-medium transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
