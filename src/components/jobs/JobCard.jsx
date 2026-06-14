import React from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const JobCard = ({ job }) => {
  const {
    jobTitle,
    companyName,
    responsibilities,
    CompanyLogo,
    jobType,
    minSalary,
    maxSalary,
    currency,
    location,
    requirements,
    benefits,
    deadline,
  } = job;

  // Format the deadline date nicely (e.g., "June 30, 2026")
  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="card w-full h-full max-w-sm bg-[#121212] text-neutral-content shadow-xl rounded-3xl p-6 border border-neutral-800 transition-all duration-300 hover:border-neutral-700 flex flex-col">
      <div className="card-body p-0 gap-5 flex flex-col flex-1">
        {/* Top Section */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full bg-neutral-800">
              <img
                src={CompanyLogo || "https://placehold.co/40"}
                alt={`${companyName} Logo`}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-400 tracking-wide">
              {companyName}
            </h3>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="card-title text-3xl font-semibold text-white tracking-tight">
            {jobTitle}
          </h2>
          <p className="text-gray-400 line-clamp-2">{responsibilities}</p>
        </div>

        {/* Badges/Info Row */}
        <div className="flex flex-wrap gap-2 pt-2">
          {/* Location Badge */}
          <div className="badge badge-lg bg-[#1c1c1e] border-none text-pink-300 font-medium py-4 px-3 flex items-center gap-1.5 rounded-xl">
            <MapPin size={16} className="text-pink-300" />
            <span>{location}</span>
          </div>

          {/* Job Type Badge */}
          <div className="badge badge-lg bg-[#1c1c1e] border-none text-pink-300 font-medium py-4 px-3 flex items-center gap-1.5 rounded-xl">
            <Briefcase size={16} className="text-pink-300" />
            <span>{jobType}</span>
          </div>

          {/* Salary Badge */}
          <div className="badge badge-lg bg-[#1c1c1e] border-none text-pink-300 font-medium py-4 px-3 flex items-center gap-1.5 rounded-xl">
            <DollarSign size={16} className="text-pink-300" />
            <span>
              {currency === "USD" ? "$" : currency}
              {minSalary}–{currency === "USD" ? "$" : currency}
              {maxSalary} / Month
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-gray-300 line-clamp-2">
            Requirements :{" "}
            <span className="text-neutral-500">{requirements}</span>
          </p>
          <p className="text-gray-300 line-clamp-2">
            Benefits : <span className="text-neutral-500">{benefits}</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
          <Calendar size={14} />
          <span>Apply before: {formattedDeadline}</span>
        </div>

        {/* Button */}
        <div className="card-actions justify-start pt-4 mt-auto">
          <Link
            href={`/jobs/${job._id}`}
            className="btn btn-link p-0 min-h-0 h-auto font-medium text-white hover:text-neutral-300 no-underline hover:no-underline flex items-center gap-2 group text-base"
          >
            Apply Now
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
