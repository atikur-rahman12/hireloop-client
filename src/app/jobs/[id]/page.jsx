import { getJobById } from "@/lib/api/jobs";
import React from "react";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // Currency icon mapping
  const currencyIcon = {
    USD: "$",
    BDT: "৳",
    GBP: "£",
    EUR: "€",
  };

  // Fallback data in case some fields are missing
  const {
    jobTitle = "Frontend Developer",
    jobCategory = "Technology",
    jobType = "Full-time",
    minSalary = "800",
    maxSalary = "1500",
    currency = "USD",
    location = "Remote",
    deadline = "2026-06-30",
    responsibilities = "",
    requirements = "",
    benefits = "",
    skills = "",
    companyName = "Atik's Industry",
    CompanyLogo = "https://i.ibb.co/3y2Sg8X6/zishan.jpg",
  } = job || {};

  // Convert comma-separated strings to arrays for clean badge rendering
  const skillList = skills ? skills.split(",").map((s) => s.trim()) : [];
  const requirementList = requirements
    ? requirements.split(",").map((r) => r.trim())
    : [];

  return (
    <div className="min-h-screen bg-base-200/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
        {/* Top Banner Accent */}
        <div className="h-32 bg-gradient-to-r from-primary to-secondary w-full" />

        {/* Main Content Container */}
        <div className="p-6 sm:p-10 -mt-12 relative">
          {/* Header Section: Logo & Company Name */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-base-200 pb-8">
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              <div className="avatar">
                <div className="w-24 h-24 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md bg-white">
                  <img
                    src={CompanyLogo}
                    alt={`${companyName} Logo`}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div>
                <span className="badge badge-primary badge-outline font-semibold uppercase tracking-wider text-xs mb-1">
                  {jobCategory}
                </span>
                <h2 className="text-xl font-bold text-base-content/80">
                  {companyName}
                </h2>
                <p className="text-sm text-base-content/60 flex items-center gap-1 mt-0.5">
                  {/* location icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {location}
                </p>
              </div>
            </div>

            <div className="hidden sm:block">
              <button className="btn btn-primary btn-wide shadow-lg hover:shadow-primary/30 transition-all duration-300 rounded-xl text-white">
                Apply Now
              </button>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
                  {jobTitle}
                </h1>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-secondary font-medium">
                    {jobType}
                  </span>

                  <span className="badge badge-accent font-medium">
                    {currency} {currencyIcon[currency] || ""}
                    {minSalary} -{currencyIcon[currency] || ""}
                    {maxSalary}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-xl font-bold text-base-content mb-3 border-l-4 border-primary pl-3">
                  Responsibilities
                </h3>
                <p className="text-base-content/70 leading-relaxed bg-base-200/30 p-4 rounded-xl border border-base-200">
                  {responsibilities}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-xl font-bold text-base-content mb-3 border-l-4 border-primary pl-3">
                  Requirements
                </h3>
                <div className="flex flex-wrap gap-2 bg-base-200/30 p-4 rounded-xl border border-base-200">
                  {requirementList.map((req, index) => (
                    <span
                      key={index}
                      className="badge badge-ghost font-medium p-3 border border-base-300"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              {benefits && (
                <div>
                  <h3 className="text-xl font-bold text-base-content mb-3 border-l-4 border-primary pl-3">
                    Benefits & Perks
                  </h3>
                  <p className="text-base-content/70 leading-relaxed bg-base-200/30 p-4 rounded-xl border border-base-200">
                    {benefits}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5 space-y-4">
                <h4 className="font-bold text-lg text-base-content border-b border-base-300 pb-2">
                  Job Overview
                </h4>

                <div>
                  <span className="text-xs text-base-content/50 block uppercase font-bold tracking-wider">
                    Salary Range
                  </span>
                  <span className="text-sm font-semibold text-base-content/80">
                    {currency} {currencyIcon[currency] || ""}
                    {minSalary} - {currencyIcon[currency] || ""}
                    {maxSalary} / Month
                  </span>
                </div>

                <div>
                  <span className="text-xs text-base-content/50 block uppercase font-bold tracking-wider">
                    Job Type
                  </span>
                  <span className="text-sm font-semibold text-base-content/80">
                    {jobType}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-base-content/50 block uppercase font-bold tracking-wider">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-base-content/80">
                    {location}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-base-content/50 block uppercase font-bold tracking-wider">
                    Application Deadline
                  </span>
                  <span className="text-sm font-semibold text-error flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {deadline}
                  </span>
                </div>
              </div>

              {/* Skills */}
              {skillList.length > 0 && (
                <div className="card bg-base-200/50 border border-base-300 rounded-xl p-5">
                  <h4 className="font-bold text-sm text-base-content/70 uppercase tracking-wider mb-3">
                    Skills Covered
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-sm badge-outline font-medium py-2.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="sm:hidden pt-4">
                <button className="btn btn-primary w-full shadow-lg rounded-xl text-white">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
