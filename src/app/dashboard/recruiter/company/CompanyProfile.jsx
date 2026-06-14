"use client";

import React, { useState } from "react";
import {
  Building2,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit3,
  MapPin,
  Plus,
  Upload,
  XCircle,
  Briefcase,
  Users,
  FileText,
} from "lucide-react";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  // Simulate database data state
  const [company, setCompany] = useState(recruiterCompany || null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    employeeCount: "1-10",
    logo: "",
    description: "",
    status: "Pending", // Default admin status
  });

  // Handle Imgbb Upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // validation
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      e.target.value = ""; // reset file input
      return;
    }

    setUploading(true);
    const bodyData = new FormData();
    bodyData.append("image", file);

    try {
      // Replace with your actual Imgbb API key (ideally via process.env.NEXT_PUBLIC_IMGBB_API_KEY)
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: bodyData,
        },
      );

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.url }));
      } else {
        alert("Failed to upload image to Imgbb.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during logo upload.");
    } finally {
      setUploading(false);
    }
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const companyData = {
        ...formData,
        recruiterId: recruiter.id,
      };

      const playLoad = await createCompany(companyData);

      if (playLoad.success) {
        console.log("Saved to DB:", playLoad.insertedId);

        setCompany({
          ...companyData,
          _id: playLoad.insertedId,
        });
        setIsEditing(false);

        toast.success("Company saved successfully!");
      } else {
        toast.error("Failed to save company");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // Helper for Status Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
              <CheckCircle size={12} />
            </span>
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100">
              <XCircle size={12} />
            </span>
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200">
            <Clock size={14} className="text-amber-600" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-[#2d2d2d] pb-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Companies</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and track your companies profile info.
          </p>
        </div>
      </div>

      {/* 1. NO COMPANY REGISTERED STATE & NOT EDITING */}
      {!company?._id && !isEditing && (
        <div className="hero bg-[#1a1a1a] rounded-3xl py-16 px-6 text-center border border-[#2d2d2d]">
          <div className="hero-content flex-col max-w-lg">
            <div className="p-6 bg-[#2d2d2d] text-primary rounded-3xl border border-primary/20">
              <Building2 size={56} className="text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold mt-6 text-white">
              No Company Registered
            </h2>
            <p className="text-gray-400 text-base max-w-md mt-2">
              You haven't setup a company account yet. To start posting jobs and
              access candidate recruitment features, register your company
              profile.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary mt-8 gap-2 rounded-full px-8 py-3 h-auto"
            >
              <Plus size={18} /> Register Company
            </button>
          </div>
        </div>
      )}

      {/* 2. REGISTRATION / EDIT FORM STATE - STYLED FROM ATTACHMENT */}
      {isEditing && (
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
              {/* Title */}
              <h3 className="text-2xl font-bold text-white">
                {company ? "Update Company Details" : "Register Your Company"}
              </h3>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-[48px] px-4 rounded-xl bg-[#1b1b1b] border border-[#2f2f2f] text-white placeholder:text-gray-600 focus:border-primary outline-none"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Industry / Category *
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full h-[48px] px-4 pr-10 rounded-xl bg-[#1b1b1b] border border-[#2f2f2f] text-white appearance-none focus:border-primary outline-none"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Website URL
                  </label>

                  <div className="flex h-[48px] rounded-xl overflow-hidden border border-[#2f2f2f] bg-[#1b1b1b]">
                    <span className="px-4 flex items-center text-gray-500 border-r border-[#2f2f2f] bg-[#151515]">
                      https://
                    </span>

                    <input
                      type="text"
                      placeholder="www.company.com"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="flex-1 px-4 bg-transparent text-white placeholder:text-gray-600 outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Location *
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                    <input
                      type="text"
                      required
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full h-[48px] pl-11 pr-4 rounded-xl bg-[#1b1b1b] border border-[#2f2f2f] text-white placeholder:text-gray-600 focus:border-primary outline-none"
                    />
                  </div>
                </div>

                {/* Employee Count */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Employee Count Range
                  </label>

                  <div className="relative">
                    <select
                      required
                      value={formData.employeeCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employeeCount: e.target.value,
                        })
                      }
                      className="w-full h-[48px] px-4 pr-10 rounded-xl bg-[#1b1b1b] border border-[#2f2f2f] text-white appearance-none focus:border-primary outline-none"
                    >
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="201-500">201-500 Employees</option>
                      <option value="500+">500+ Employees</option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Company Logo
                  </label>

                  <div className="flex items-center gap-4 h-[72px] px-3 rounded-xl border border-[#2f2f2f] bg-[#1b1b1b]">
                    <div className="w-14 h-14 rounded-lg border border-dashed border-gray-600 flex items-center justify-center bg-[#151515]">
                      {uploading ? (
                        <span className="loading loading-spinner text-primary" />
                      ) : formData.logo ? (
                        <img
                          src={formData.logo}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Upload className="text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        Upload image
                      </p>
                      <p className="text-gray-500 text-xs">
                        PNG, JPG up to 5MB
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />

                    <label
                      htmlFor="logo-upload"
                      className="px-4 py-2 text-sm rounded-lg bg-primary text-white cursor-pointer"
                    >
                      Choose
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Brief Description *
                </label>

                <textarea
                  required
                  placeholder="Tell us about your company mission and culture..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full h-32 p-4 rounded-xl bg-[#1b1b1b] border border-[#2f2f2f] text-white placeholder:text-gray-600 focus:border-primary outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 h-11 rounded-full bg-[#1b1b1b] text-gray-300 border border-[#2f2f2f]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 h-11 rounded-full bg-primary text-white font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DISPLAY REGISTERED COMPANY DETAILS VIEW */}
      {company?._id && !isEditing && (
        <div className="grid grid-cols-1 gap-8">
          {/* Main Card */}
          <div className="card bg-[#1a1a1a] shadow-sm border border-[#2d2d2d] rounded-3xl overflow-hidden">
            <div className="p-10 md:p-12 flex flex-col md:flex-row gap-10 items-start">
              {/* Logo container */}
              <div className="avatar self-center md:self-start">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-black p-3 shadow-inner border border-primary/20 flex items-center justify-center">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="object-contain rounded-2xl"
                    />
                  ) : (
                    <Building2 className="w-20 h-20 text-primary/30" />
                  )}
                </div>
              </div>

              {/* Quick Details Profile */}
              <div className="flex-1 space-y-6 w-full">
                <div className="flex justify-between items-center pb-5 mb-2">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                      {company.name}
                      {getStatusBadge(company.status)}
                    </h2>
                  </div>
                  {company?._id && !isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setFormData(company);
                      }}
                      className="btn btn-outline btn-sm md:btn-md gap-2 rounded-full border-gray-600 hover:bg-gray-800"
                    >
                      <Edit3 size={16} /> Edit Profile
                    </button>
                  )}
                </div>

                {/* Grid Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 text-[15px] text-gray-300 pt-3 border-t border-[#2d2d2d]">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={17} className="text-primary" />
                    <span>
                      <strong className="text-gray-600 mr-1.5">
                        Industry:
                      </strong>{" "}
                      {company.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={17} className="text-primary" />
                    <span>
                      <strong className="text-gray-600 mr-1.5">
                        Location:
                      </strong>{" "}
                      {company.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users size={17} className="text-primary" />
                    <span>
                      <strong className="text-gray-600 mr-1.5">Size:</strong>{" "}
                      {company.employeeCount} Employees
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={17} className="text-primary" />
                    <span>
                      <strong className="text-gray-600 mr-1.5">Website:</strong>{" "}
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        className="link link-primary no-underline text-[15px] font-medium"
                      >
                        {company.website}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Segment */}
            <div className="border-t border-[#2d2d2d] p-10 md:p-12 bg-black/20">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-600 flex items-center gap-2.5 mb-5">
                <FileText size={17} className="text-primary" /> Company Overview
              </h4>
              <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-[16px]">
                {company.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
