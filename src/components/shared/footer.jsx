"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
  ArrowUpRight,
} from "@gravity-ui/icons";

const footerLinks = {
  product: [
    { name: "Job discovery", href: "/jobs" },
    { name: "Worker AI", href: "/ai" },
    { name: "Companies", href: "/companies" },
    { name: "Salary data", href: "/salary" },
  ],

  navigation: [
    { name: "Help center", href: "/help" },
    { name: "Career library", href: "/career" },
    { name: "Contact", href: "/contact" },
  ],

  resources: [
    { name: "Brand Guideline", href: "/brand" },
    { name: "Newsroom", href: "/news" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
                <span className="text-white font-bold text-lg">H</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold leading-none">Hire Loop</h2>
              </div>
            </Link>

            <p className="mt-6 text-gray-400 leading-7 text-sm sm:text-[15px] max-w-md">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Right Side Links */}
          <div className="lg:col-span-8 lg:ml-52">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {/* Product */}
              <div>
                <h3 className="text-indigo-500 text-lg font-semibold mb-5">
                  Product
                </h3>

                <ul className="space-y-4">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group w-fit"
                      >
                        <span>{item.name}</span>

                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-indigo-500 text-lg font-semibold mb-5">
                  Navigation
                </h3>

                <ul className="space-y-4">
                  {footerLinks.navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group w-fit"
                      >
                        <span>{item.name}</span>

                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-indigo-500 text-lg font-semibold mb-5">
                  Resources
                </h3>

                <ul className="space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group w-fit"
                      >
                        <span>{item.name}</span>

                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              className="w-11 h-11 rounded-xl bg-white/5 hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center border border-white/10"
            >
              <LogoFacebook className="w-5 h-5" />
            </Link>

            <Link
              href="https://github.com"
              className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center"
            >
              <LogoGithub className="w-5 h-5" />
            </Link>

            <Link
              href="https://linkedin.com"
              className="w-11 h-11 rounded-xl bg-white/5 hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center border border-white/10"
            >
              <LogoLinkedin className="w-5 h-5" />
            </Link>
          </div>

          {/* Copyright + Policies */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center lg:text-right">
            <p className="text-gray-500 text-sm">
              Copyright 2026 — Programming Hero
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>

              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/guideline"
                className="hover:text-white transition-colors"
              >
                Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
