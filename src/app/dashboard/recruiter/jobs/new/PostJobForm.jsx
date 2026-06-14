"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, FileText, Building } from "lucide-react";
import { createJob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PostJobForm({ recruiterCompany }) {
  const router = useRouter();

  // Sample auto-filled company data (Simulating recruiter's approved company)
  // console.log("PostJobFrom received company prop:", recruiterCompany);
  // const recruiterCompany = {
  //   name: "HireLoop Tech",
  //   id: "co_12345",
  //   isApproved: true,
  // };

  const initialFormData = {
    jobTitle: "",
    jobCategory: "Technology",
    jobType: "Full-time",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    skills: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (name === "isRemote") {
        return {
          ...prev,
          isRemote: checked,
          location: checked ? "" : prev.location,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!recruiterCompany.isApproved) {
    //   toast.error("Your company must be approved before you can post a job.");
    //   return;
    // }

    if (!formData.isRemote && !formData.location.trim()) {
      toast.error("Location is required for non-remote jobs.");
      return;
    }

    if (Number(formData.minSalary) > Number(formData.maxSalary)) {
      toast.error("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    const jobPayload = {
      ...formData,
      location: formData.isRemote ? "Remote" : formData.location,
      companyId: recruiterCompany._id,
      companyName: recruiterCompany.name,
      CompanyLogo: recruiterCompany.logo,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await createJob(jobPayload);

      if (res?.insertedId) {
        toast.success("Job posted successfully!");
        setFormData(initialFormData);

        setTimeout(() => {
          router.push("/dashboard/recruiter/jobs");
        }, 1000);
      } else {
        toast.error("Failed to post job.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 antialiased text-gray-200">
      <div className="w-full max-w-3xl bg-[#121214] border border-[#222226] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#1e1e21]">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Post a New Job
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Fill out the details below to publish your open position instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* SECTION 1: JOB INFO */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-[#1e1e21]">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Job Info
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Job Title
                  </span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none h-11"
                />
              </div>

              {/* Job Category */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Job Category
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white focus:border-gray-500 focus:outline-none h-11 min-h-[2.75rem]"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Management">Management</option>
                    <option value="Business">Business</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              {/* Job Type */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Job Type
                  </span>
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white focus:border-gray-500 focus:outline-none h-11 min-h-[2.75rem]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Application Deadline
                  </span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white focus:border-gray-500 focus:outline-none h-11"
                />
              </div>

              {/* Salary Configuration */}
              <div className="form-control w-full md:col-span-2">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Salary Range & Currency
                  </span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="select select-bordered bg-[#1c1c1e] border-[#2c2c30] text-sm text-white focus:border-gray-500 focus:outline-none h-11 min-h-[2.75rem] w-24"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                  <input
                    type="number"
                    name="minSalary"
                    required
                    placeholder="Min"
                    value={formData.minSalary}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none h-11"
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    required
                    placeholder="Max"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none h-11"
                  />
                </div>
              </div>

              {/* Location & Remote Toggle */}
              <div className="form-control w-full md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mt-2">
                <div className="sm:col-span-2">
                  <label className="label py-1.5">
                    <span className="text-xs font-medium text-gray-300">
                      Location
                    </span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="location"
                      disabled={formData.isRemote}
                      required={!formData.isRemote}
                      placeholder={
                        formData.isRemote
                          ? "Remote Position"
                          : "e.g. San Francisco, CA"
                      }
                      value={formData.location}
                      onChange={handleChange}
                      className="input input-bordered w-full bg-[#1c1c1e] border-[#2c2c30] pl-10 text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none h-11 disabled:bg-[#151517] disabled:text-gray-600"
                    />
                  </div>
                </div>
                {/* DaisyUI Toggle for Remote */}
                <div className="bg-[#1c1c1e] border border-[#2c2c30] rounded-lg p-2.5 flex items-center justify-between h-11">
                  <span className="text-xs font-medium text-gray-300">
                    Remote Only
                  </span>
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleChange}
                    className="toggle toggle-sm bg-slate-800 border border-slate-600 checked:bg-emerald-500 checked:border-emerald-500 shadow-md transition-all duration-300 hover:border-emerald-400 hover:shadow-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: JOB DESCRIPTION */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-[#1e1e21]">
              <FileText className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Job Details & Scope
              </h3>
            </div>

            <div className="space-y-4">
              {/* Responsibilities */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Core Responsibilities
                  </span>
                </label>
                <textarea
                  name="responsibilities"
                  required
                  rows={4}
                  placeholder="Outline the core responsibilities and day-to-day duties..."
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none p-3 resize-none"
                />
              </div>

              {/* Requirements */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Requirements & Qualifications
                  </span>
                </label>
                <textarea
                  name="requirements"
                  required
                  rows={4}
                  placeholder="List essential skills, tools, and experience levels required..."
                  value={formData.requirements}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none p-3 resize-none"
                />
              </div>

              {/* Skills */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Skills <span className="text-gray-500">(Recommended)</span>
                  </span>
                </label>

                <textarea
                  type="text"
                  name="skills"
                  rows={3}
                  placeholder="e.g. React, Node.js, MongoDB, Figma"
                  value={formData.skills}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none p-3 resize-none"
                />
              </div>

              {/* Benefits */}
              <div className="form-control w-full">
                <label className="label py-1.5">
                  <span className="text-xs font-medium text-gray-300">
                    Benefits & Perks{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </span>
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="Health insurance, remote stipends, unlimited PTO, etc..."
                  value={formData.benefits}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full bg-[#1c1c1e] border-[#2c2c30] text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none p-3 resize-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: AUTO-FILLED COMPANY DETAILS */}
          <div className="bg-[#17171a] border border-[#222226] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#1c1c1e] border border-[#2c2c30] rounded-md">
                <Building className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Posting Organization
                </p>
                <h4 className="text-sm font-semibold text-white mt-0.5">
                  {recruiterCompany.name}
                </h4>
              </div>
            </div>
            <div>
              {recruiterCompany.isApproved ? (
                <span className="badge badge-sm py-2.5 px-3 bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 font-medium tracking-wide rounded">
                  Approved Recruiter
                </span>
              ) : (
                <span className="badge badge-sm py-2.5 px-3 bg-rose-950/40 text-rose-400 border border-rose-800/60 font-medium tracking-wide rounded">
                  Pending Approval
                </span>
              )}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-[#1e1e21] flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="btn bg-transparent hover:bg-[#1c1c1e] border border-[#2c2c30] hover:border-gray-600 text-sm font-medium text-gray-300 normal-case rounded-lg px-5 h-11 min-h-[2.75rem]"
            >
              Reset Form
            </button>
            <button
              type="submit"
              // disabled={!recruiterCompany.isApproved}
              className="btn bg-white hover:bg-gray-200 border-none text-black text-sm font-semibold normal-case rounded-lg px-5 h-11 min-h-[2.75rem] disabled:bg-gray-700 disabled:text-gray-400"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
