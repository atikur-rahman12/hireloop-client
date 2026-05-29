import React from "react";
import { Crown, BarChart3, Zap, Plus, ArrowRight } from "lucide-react";

const plans = [
  {
    icon: Crown,
    name: "Starter",
    price: "$0",
    popular: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    icon: BarChart3,
    name: "Growth",
    price: "$17",
    popular: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    icon: Zap,
    name: "Premium",
    price: "$99",
    popular: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

const PricingCard = () => {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 bg-violet-600 rounded-sm"></div>

          <span className="uppercase tracking-[0.25em] text-lg text-gray-400">
            Pricing
          </span>

          <div className="w-3 h-3 bg-violet-600 rounded-sm"></div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium">
              Monthly
            </button>

            <button className="text-white pl-4 py-2 text-sm">
              Yearly
            </button>

            <span className="bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-full">
              25%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <div
                key={index}
                className={`group relative rounded-[30px] border border-white/20 p-8 flex flex-col justify-between min-h-130
                transition-all duration-500 hover:-translate-y-3
                ${
                  plan.popular
                    ? "bg-[#111111] border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.08)] hover:border-fuchsia-500/50 hover:shadow-[0_0_80px_rgba(217,70,239,0.18)]"
                    : "bg-black border-white/10 hover:border-fuchsia-500/30 hover:bg-[#0d0d0d] hover:shadow-[0_0_60px_rgba(217,70,239,0.12)]"
                }`}
              >
                <div className="relative z-10">
                  {/* Top */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl border border-white/10 bg-[#0f0f0f] flex items-center justify-center transition-all duration-300 group-hover:border-fuchsia-500/40 group-hover:bg-fuchsia-500/10">
                        <Icon className="w-6 h-6 text-fuchsia-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                      </div>

                      <h3 className="text-white text-3xl font-medium transition-all duration-300 group-hover:text-fuchsia-200">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="text-right flex gap-1 items-end">
                      <h2 className="text-white text-4xl font-semibold transition-all duration-300 group-hover:text-fuchsia-100">
                        {plan.price}
                      </h2>

                      <span className="text-gray-400 text-lg mb-1">
                        / month
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white text-lg mb-8">
                    Start building your insights hub:
                  </p>

                  {/* Features */}
                  <ul className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-gray-400 text-lg transition-all duration-300 group-hover:text-gray-300"
                      >
                        <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-fuchsia-500/20">
                          <Plus className="w-4 h-4 text-white" />
                        </div>

                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  className={`relative z-10 mt-12 w-full rounded-2xl py-5 px-6 flex items-center justify-between text-lg font-medium transition-all duration-300 hover:scale-[1.03]
                  ${
                    plan.popular
                      ? "bg-white text-black hover:bg-fuchsia-500 hover:text-white shadow-lg"
                      : "bg-white/10 text-white hover:bg-fuchsia-500 hover:text-white"
                  }`}
                >
                  Choose This Plan
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingCard;
