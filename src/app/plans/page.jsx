"use client";

import React, { useState } from "react";
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Briefcase,
  Building,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const PricingPage = () => {
  // Job Seeker নাকি Recruiter তা ট্র্যাক করার স্টেট
  const [activeTab, setActiveTab] = useState("seekers");
  // FAQ ওপেন/ক্লোজ ট্র্যাক করার স্টেট
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Job Seekers এর ডেটা
  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "/forever",
      desc: "Perfect for getting started and exploring new opportunities.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile creation",
        "Standard email alerts",
      ],
      icon: <Briefcase className="w-5 h-5 text-zinc-400" />,
      badge: "Basic",
      btnClass: "btn-outline",
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/month",
      desc: "Accelerate your job hunt with advanced tracking tools.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking",
        "Exclusive salary insights",
        "Priority email alerts",
      ],
      icon: <Zap className="w-5 h-5 text-secondary" />,
      badge: "Most Popular",
      btnClass: "btn-secondary shadow-lg shadow-secondary/20 text-white",
      popular: true,
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/month",
      desc: "Ultimate features for maximum visibility and elite tools.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost directly to recruiters",
        "Early access to newly posted jobs",
        "24/7 Premium priority support",
      ],
      icon: <Crown className="w-5 h-5 text-amber-500" />,
      badge: "Elite Elite",
      btnClass: "btn-primary shadow-lg shadow-primary/20 text-white",
    },
  ];

  // Recruiters এর ডেটা
  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "/forever",
      desc: "Great for a company's first year of hiring and evaluation.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management system",
        "Standard listing visibility",
        "Email support",
      ],
      icon: <Building className="w-5 h-5 text-zinc-400" />,
      badge: "Starter",
      btnClass: "btn-outline",
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "/month",
      desc: "Scale your team smoothly with tracking and analytics.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking system (ATS)",
        "Basic recruitment analytics",
        "Standard email support",
      ],
      icon: <Zap className="w-5 h-5 text-secondary" />,
      badge: "Recommended",
      btnClass: "btn-secondary shadow-lg shadow-secondary/20 text-white",
      popular: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      desc: "Comprehensive power tools for enterprise hiring teams.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & reporting dashboard",
        "Featured job listings for maximum reach",
        "Team collaboration & multi-user access",
        "Custom company branding",
        "Dedicated account priority support",
      ],
      icon: <Crown className="w-5 h-5 text-accent" />,
      badge: "Full Power",
      btnClass: "btn-accent shadow-lg shadow-accent/20 text-white",
    },
  ];

  // FAQ ডেটা
  const faqs = [
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes, absolutely! You can cancel your subscription at any time directly from your billing dashboard. You will maintain access to your plan benefits until the end of your current billing cycle.",
    },
    {
      q: "Do you offer refunds?",
      a: "We offer a 7-day money-back guarantee if you are not satisfied with our Pro or Premium services. Please reach out to our priority support team to initiate a refund request.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and secure international bank transfers through our payment gateway.",
    },
    {
      q: "How does plan switching work?",
      a: "You can upgrade or downgrade your plan at any point. If you upgrade, the new features will be available instantly and the price will be prorated. Downgrades will take effect starting next billing cycle.",
    },
  ];

  const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-16 px-4 sm:px-6 lg:px-8">
      {/* ১. হেডার সেকশন */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-4">
          <span className="badge badge-primary badge-outline gap-1.5 px-4 py-3 text-xs font-bold tracking-wide uppercase bg-primary/5 rounded-full border-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />{" "}
            Flexible Pricing
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-base-content via-primary to-secondary bg-clip-text text-transparent mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-sm md:text-base text-base-content/60 max-w-md mx-auto">
          Unlock premium tools tailored to your career growth or recruitment
          needs.
        </p>

        {/* ২. প্রিমিয়াম ট্যাব/টগল সিস্টেম */}
        <div className="flex justify-center mt-10">
          <div className="bg-base-100 p-1.5 rounded-2xl border border-base-200 shadow-xl flex gap-1">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "seekers"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/60 hover:text-base-content hover:bg-base-200"
              }`}
            >
              <Briefcase className="w-4 h-4" /> For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiters")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "recruiters"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/60 hover:text-base-content hover:bg-base-200"
              }`}
            >
              <Building className="w-4 h-4" /> For Recruiters
            </button>
          </div>
        </div>
      </div>

      {/* ৩. প্রাইসিং কার্ড গ্রিড */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
        {currentPlans.map((plan, idx) => (
          <div key={idx} className="relative group flex flex-col h-full">
            {/* পপুলার কার্ডের জন্য ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
            {plan.popular && (
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            )}

            <div
              className={`relative bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border flex flex-col justify-between flex-grow transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? "border-secondary" : "border-base-200/60"
              }`}
            >
              <div>
                {/* কার্ডের উপরের হেডার অংশ */}
                <div className="flex justify-between items-center mb-6">
                  <div
                    className={`p-3 rounded-xl ${plan.popular ? "bg-secondary/10" : "bg-base-200"}`}
                  >
                    {plan.icon}
                  </div>
                  <span
                    className={`badge badge-sm font-bold tracking-wide uppercase px-3 py-2 border-none rounded-md ${
                      plan.popular
                        ? "bg-secondary text-white"
                        : "bg-base-200 text-base-content/60"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* প্ল্যানের নাম এবং প্রাইস */}
                <h3 className="text-2xl font-black text-base-content mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-base-content/50 min-h-[32px] mb-6 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="flex items-baseline text-base-content mb-8">
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-base-content/40 ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* ডিভাইডার */}
                <div className="border-t border-base-200/60 my-6"></div>

                {/* ফিচারস লিস্ট */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-sm text-base-content/80"
                    >
                      <div
                        className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${
                          plan.popular
                            ? "bg-secondary/10 text-secondary"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* অ্যাকশন বাটন */}
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                  <button
                    type="submit"
                    role="link"
                    className={`btn w-full rounded-xl normal-case font-bold h-12 ${plan.btnClass}`}
                  >
                    Get Started with {plan.name}
                  </button>
                </section>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* ৪. FAQ সেকশন (Accordion) */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-base-100 rounded-2xl border border-base-200 shadow-md text-primary mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-base-content mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-base-content/50">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-base-100/60 backdrop-blur-md rounded-2xl border border-base-200/60 shadow-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 flex justify-between items-center text-left font-bold text-base-content hover:bg-base-200/30 transition-colors duration-200"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-base-content/40 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "transform rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-base-200/40" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-sm text-base-content/70 leading-relaxed bg-base-200/10">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
