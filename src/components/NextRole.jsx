"use client";

import Link from "next/link";

const NextRole = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-28">
      {/* Top Purple Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_55%)]" />

      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] sm:w-[180%] lg:w-[220%] h-[200%] bg-top bg-no-repeat bg-contain opacity-90"
          style={{
            backgroundImage: "url('/images/cta-bg.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-transparent to-black/80" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
          Your next role is
          <br />
          already looking for you
        </h2>

        {/* Description */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-7 sm:leading-8">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <Link
            href="/register"
            className="group relative overflow-hidden btn border-0 bg-white text-black rounded-2xl px-8 min-h-14 h-14 text-base font-medium shadow-lg transition-all duration-300 ease-out hover:shadow-white/20 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            {/* shimmer */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Create a free account</span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/pricing"
            className="group relative overflow-hidden btn bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl px-8 min-h-14 h-14 text-base font-medium transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95"
          >
            <span className="relative z-10">View pricing</span>

            {/* glow effect */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NextRole;
