"use client";

import Image from "next/image";
import {
  Briefcase,
  Factory,
  Persons,
  Star,
  Magnifier,
  MapPin,
} from "@gravity-ui/icons";
import Background from "@/assets/globe.png";
import Link from "next/link";

const trendingJobs = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  {
    id: 1,
    title: "50K",
    subtitle: "Active Jobs",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "12K",
    subtitle: "Companies",
    icon: Factory,
  },
  {
    id: 3,
    title: "2M",
    subtitle: "Job Seekers",
    icon: Persons,
  },
  {
    id: 4,
    title: "97%",
    subtitle: "Satisfaction Rate",
    icon: Star,
  },
];

const StatsSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_45%)]" />

        {/* Stars */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-24 left-10 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-32 left-20 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-44 right-72 w-1 h-1 bg-indigo-400 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center pt-28 pb-10 sm:pb-14 lg:pb-16">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border-t border-white/20 bg-white/3 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                <div className="w-6 h-6 rounded-md bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                </div>

                <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/70">
                  <span className="text-white font-semibold">50,000+</span> New
                  Jobs This Month
                </p>
              </div>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Find Your Dream Job Today
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/60 leading-8">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>

            {/* Search Box */}
            <div className="w-full max-w-4xl mt-12">
              <div className="flex flex-col md:flex-row items-stretch md:items-center bg-[#0c0c0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-5 flex-1">
                  <Magnifier className="w-5 h-5 text-white/50 shrink-0" />

                  <input
                    type="text"
                    placeholder="Job title, skill or company"
                    className="bg-transparent outline-none border-none w-full text-sm sm:text-base placeholder:text-white/40"
                  />
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-10 bg-white/10" />

                {/* Location */}
                <div className="flex items-center gap-3 px-5 py-5 flex-1">
                  <MapPin className="w-5 h-5 text-white/50 shrink-0" />

                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="bg-transparent outline-none border-none w-full text-sm sm:text-base placeholder:text-white/40"
                  />
                </div>

                {/* Search Button */}
                <button className="h-15 md:h-full px-5 py-3 mr-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center">
                  <Magnifier className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Trending */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="text-white/50 text-sm">Trending Position</span>

                {trendingJobs.map((job) => (
                  <Link
                    key={job}
                    href="/jobs"
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/3 hover:bg-white/8 transition-all duration-300 text-sm text-white/80"
                  >
                    {job}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-24 sm:py-28 lg:py-45">
        {/* Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -top-60 lg:h-[1300] lg:-top-50 w-225 lg:w-250">
            <Image
              src={Background}
              alt="Globe"
              width={1200}
              height={1200}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Small Stars */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-20 left-16 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute top-32 right-20 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute top-56 left-1/3 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-70 left-24 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-84 right-1/4 w-1 h-1 bg-indigo-400 rounded-full" />
          <div className="absolute bottom-80 right-16 w-1 h-1 bg-indigo-400 rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold text-white leading-tight">
              Assisting over 15,000 job seekers
              <br className="hidden sm:block" />
              find their dream positions.
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="relative rounded-3xl border border-white/10 bg-linear-to-b from-white/5 to-white/2 backdrop-blur-xl p-6 sm:p-7 min-h-47.5 overflow-hidden group hover:border-indigo-500/40 transition-all duration-500"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 blur-3xl" />
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>

                  {/* Content */}
                  <div className="mt-10">
                    <h3 className="text-4xl sm:text-5xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-white/60 text-sm sm:text-base">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-indigo-500/5 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
