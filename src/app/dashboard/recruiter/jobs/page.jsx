import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import {
  Eye,
  Edit3,
  Trash2,
  MapPin,
  Calendar,
  Layers,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruiterJobsPage = async () => {
  const company = await getLoggedInRecruiterCompany();

  const jobs = company ? await getCompanyJobs(company._id) : [];

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "BDT":
        return "৳";
      default:
        return "$";
    }
  };

  return (
    <div className="p-8 bg-base-200/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
              Job Management
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Overview of your active openings, applications, and job statuses.
            </p>
          </div>
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-300 w-auto py-2 px-6 flex items-center gap-4">
            <div>
              <div className="stat-title text-xs font-semibold uppercase tracking-wider">
                Total Jobs
              </div>
              <div className="stat-value text-2xl text-primary">
                {jobs.length}
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Layers size={20} />
            </div>
          </div>
        </div>

        {/* Modern Table Card Container */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-md w-full border-collapse">
              {/* Table Head - Clean & Subtle */}
              <thead>
                <tr className="border-b border-base-300 bg-base-200/40 text-base-content/70 font-semibold text-[13px] uppercase tracking-wider">
                  <th className="py-4 pl-6">Job Role</th>
                  <th className="py-4">Employment</th>
                  <th className="py-4">Compensation</th>
                  <th className="py-4">Closing Date</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 pr-6 text-right"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-base-200">
                {jobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-12 text-base-content/50 font-medium"
                    >
                      No jobs posted yet. Create your first listing to get
                      started!
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const formattedDeadline = new Date(
                      job.deadline,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <tr
                        key={job._id?.$oid || job._id}
                        className="hover:bg-base-200/30 transition-colors duration-200"
                      >
                        {/* Column 1: Job Role & Location */}
                        <td className="py-5 pl-6">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-base text-base-content hover:text-primary transition-colors cursor-pointer">
                              {job.jobTitle}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-base-content/50 font-medium">
                              <span className="flex items-center gap-0.5 capitalize">
                                <MapPin
                                  size={13}
                                  className="text-base-content/40"
                                />
                                {job.location}
                              </span>
                              {job.isRemote && (
                                <>
                                  <span className="text-base-content/30">
                                    •
                                  </span>
                                  <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide">
                                    Remote
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Job Category & Type */}
                        <td className="py-5">
                          <div className="flex flex-col gap-1.5 items-start">
                            <span className="text-sm font-medium text-base-content/80">
                              {job.jobCategory}
                            </span>
                            <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-base-200 text-base-content/70 border border-base-300">
                              {job.jobType}
                            </span>
                          </div>
                        </td>

                        {/* Column 3: Salary Range */}
                        <td className="py-5">
                          <div className="flex items-center gap-2 text-sm font-semibold text-base-content/90 bg-base-200/50 px-3 py-1.5 rounded-xl w-fit border border-base-200">
                            <span className="text-success text-base font-bold">
                              {getCurrencySymbol(job.currency)}
                            </span>

                            <span>
                              {Number(job.minSalary).toLocaleString()} -{" "}
                              {Number(job.maxSalary).toLocaleString()}
                            </span>

                            <span className="text-xs text-base-content/50 font-normal">
                              {job.currency}
                            </span>
                          </div>
                        </td>

                        {/* Column 4: Deadline */}
                        <td className="py-5">
                          <div className="flex items-center gap-1.5 text-sm text-base-content/70 font-medium">
                            <Calendar
                              size={14}
                              className="text-base-content/40"
                            />
                            <span>{formattedDeadline}</span>
                          </div>
                        </td>

                        {/* Column 5: Status Badge */}
                        <td className="py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                              job.status === "active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-base-300 text-base-content/60"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                job.status === "active"
                                  ? "bg-emerald-500 animate-pulse"
                                  : "bg-base-content/40"
                              }`}
                            />
                            {job.status}
                          </span>
                        </td>

                        {/* Column 6: Action Buttons */}
                        <td className="py-5 pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Details */}
                            <button
                              className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>

                            {/* Edit */}
                            <button
                              className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-info hover:bg-info/10 transition-all"
                              title="Edit Job"
                            >
                              <Edit3 size={16} />
                            </button>

                            {/* Delete */}
                            <button
                              className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-error hover:bg-error/10 transition-all"
                              title="Delete Job"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Floating Add Job Button */}
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="tooltip tooltip-top" data-tip="Create a Job">
            <button className="btn btn-primary bg-white text-black btn-circle shadow-xl h-14 w-14 hover:scale-110 transition-all duration-300">
              <Plus size={35} />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecruiterJobsPage;
