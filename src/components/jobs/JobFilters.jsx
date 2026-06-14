"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Briefcase, Layers } from "lucide-react";
import JobCard from "./JobCard";

const JobFilters = ({ initialJobs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  const categories = useMemo(() => {
    const allCats = initialJobs.map((job) => job.jobCategory).filter(Boolean);
    return ["All", ...new Set(allCats)];
  }, [initialJobs]);

  const jobTypes = useMemo(() => {
    const allTypes = initialJobs.map((job) => job.jobType).filter(Boolean);
    return ["All", ...new Set(allTypes)];
  }, [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "All" || job.jobType === selectedType;
      const matchesCategory =
        selectedCategory === "All" || job.jobCategory === selectedCategory;
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, initialJobs]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedCategory("All");
    setIsRemoteOnly(false);
  };

  return (
    <div className="space-y-10">
      {/* FILTER PANEL */}
      <div className="relative overflow-hidden rounded-3xl border border-base-300/50 bg-base-100/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 space-y-6">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-base-300/50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-base-content/70" />
            <h2 className="text-xl font-bold tracking-tight">
              Filter Opportunities
            </h2>
          </div>

          <span className="badge badge-primary badge-outline px-4 py-3 font-medium">
            {filteredJobs.length} matches found
          </span>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 relative">
          {/* Search */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[11px] uppercase tracking-wider text-base-content/50 font-semibold">
                Keywords
              </span>
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />
              <input
                type="text"
                placeholder="Job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-11 rounded-2xl border-base-300 bg-base-200/60 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Job Type */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[11px] uppercase tracking-wider text-base-content/50 font-semibold">
                Job Type
              </span>
            </label>
            <div className="relative">
              <Briefcase
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select w-full pl-11 rounded-2xl border-base-300 bg-base-200/60 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[11px] uppercase tracking-wider text-base-content/50 font-semibold">
                Category
              </span>
            </label>
            <div className="relative">
              <Layers
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                size={18}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select w-full pl-11 rounded-2xl border-base-300 bg-base-200/60 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Remote */}
          <div className="flex flex-col justify-center">
            <label className="label py-1">
              <span className="label-text text-[11px] uppercase tracking-wider text-base-content/50 font-semibold">
                Remote Only
              </span>
            </label>

            <div className="flex items-center gap-3 rounded-xl">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isRemoteOnly}
                onChange={(e) => setIsRemoteOnly(e.target.checked)}
              />
              <span className="text-sm">Remote</span>
            </div>
          </div>
        </div>

        {/* Reset */}
        {/* {(searchQuery ||
          selectedType !== "All" ||
          selectedCategory !== "All" ||
          maxSalaryFilter) && (
          <div className="flex justify-end pt-2 relative">
            <button
              onClick={handleReset}
              className="btn btn-sm btn-outline btn-error rounded-xl font-medium hover:scale-105 transition-all duration-300"
            >
              Reset Search Parameters
            </button>
          </div>
        )} */}
      </div>

      {/* JOB GRID */}
      <div>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div key={job._id?.$oid || job._id || job.id} className="w-full">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="hero rounded-3xl border border-base-300/50 bg-base-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="hero-content text-center py-20">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-3">
                  No Matching Positions
                </h2>
                <p className="text-base-content/60 max-w-md mx-auto mb-6">
                  We couldn't find any job postings matching your criteria.
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-primary btn-sm rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
