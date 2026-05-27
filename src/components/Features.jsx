import React from "react";
import {
  Search,
  ChartSpline,
  Building2,
  Bookmark,
  Sparkles,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartSpline,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: Sparkles,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

const Features = () => {
  return (
    <section className="w-full bg-[#151516] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 bg-violet-500 rounded-sm"></div>

          <span className="uppercase tracking-[0.25em] text-sm text-gray-400 font-medium">
            Features
          </span>

          <span className="uppercase tracking-[0.25em] text-sm text-gray-400 font-medium">
            Job
          </span>

          <div className="w-3 h-3 bg-violet-500 rounded-sm"></div>
        </div>

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="flex items-start gap-5 group">
                {/* Icon Box */}
                <div className="w-21.25 h-20 rounded-2xl bg-linear-to-t from-[#313131] to-[#010102] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300 border group-hover:border-violet-500">
                  <Icon
                    size={26}
                    className="text-violet-300"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-white text-[17px] font-medium leading-none">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-[15px] leading-7 max-w-60">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
