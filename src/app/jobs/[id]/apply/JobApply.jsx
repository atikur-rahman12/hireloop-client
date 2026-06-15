"use client";

import React, { useState } from "react";
import {
  Briefcase,
  User,
  Mail,
  Link,
  FileText,
  Send,
  Sparkles,
  Globe,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";

const JobApply = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    githubLink: "", // Added GitHub state
    additionalNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      // ✅ ADD: loading state start

      const submissionData = {
        jobId: job?._id,
        jobTitle: job?.jobTitle,
        companyName: job?.companyName,
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        ...formData,
      };

      // 🔥 ADD: loading toast (top right e spinner toast show korbe)
      toast.loading("Submitting application...", { id: "apply" });

      // API CALL
      const res = await submitApplication(submissionData);

      // ✅ ADD: success check
      if (res?.insertedId || res?.acknowledged) {
        // 🔥 ADD: success toast
        toast.success("Application submitted successfully!", {
          id: "apply",
        });

        // ✅ ADD: form reset after success
        setFormData({
          resumeLink: "",
          portfolioLink: "",
          githubLink: "",
          additionalNotes: "",
        });
      } else {
        // ❌ ADD: backend fail toast
        toast.error("Failed to submit application", {
          id: "apply",
        });
      }
    } catch (error) {
      console.log(error);

      // ❌ ADD: error toast
      toast.error("Something went wrong!", { id: "apply" });
    } finally {
      // ✅ ADD: loading off
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 relative group">
      {/* Background Glow Effect - Premium Touch */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-base-200/60 overflow-hidden">
        {/* Decorative Badge */}
        <div className="flex justify-center mb-4">
          <span className="badge badge-primary badge-outline gap-1.5 px-4 py-3 text-xs font-bold tracking-wide uppercase bg-primary/5 rounded-full border-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />{" "}
            Direct Application
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-base-content via-primary to-secondary bg-clip-text text-transparent mb-3">
            Apply for this Position
          </h2>
          <p className="text-sm md:text-base text-base-content/60 max-w-md mx-auto">
            Review your pre-filled profile information and provide your digital
            links below to get started.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Job Card */}
          <div className="p-5 bg-gradient-to-br from-base-200/40 to-base-200/80 rounded-2xl border border-base-200/40 hover:border-secondary/20 transition-all duration-300 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                Target Role
              </span>
              <h4 className="font-bold text-base-content text-lg leading-tight mt-0.5">
                {job?.jobTitle}
              </h4>
              <p className="text-sm text-base-content/60 mt-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 opacity-70" /> {job?.companyName}
              </p>
            </div>
          </div>

          {/* Applicant Card */}
          <div className="p-5 bg-gradient-to-br from-base-200/40 to-base-200/80 rounded-2xl border border-base-200/40 hover:border-primary/20 transition-all duration-300 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                Applicant Profile
              </span>
              <h4 className="font-bold text-base-content text-lg leading-tight mt-0.5">
                {applicant?.name || "John Doe"}
              </h4>
              <p className="text-sm text-base-content/60 mt-1 flex items-center gap-1.5 break-all">
                <Mail className="w-3.5 h-3.5 opacity-70" />{" "}
                {applicant?.email || "john.doe@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Minimalist Divider */}
        <div className="relative flex py-2 items-center mb-8">
          <div className="flex-grow border-t border-base-200"></div>
          <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-base-content/40">
            Application Links
          </span>
          <div className="flex-grow border-t border-base-200"></div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Link */}
          <div className="form-control w-full group/input">
            <label className="label pt-0 pb-1.5">
              <span className="label-text flex items-center gap-2 font-semibold text-base-content/80 group-focus-within/input:text-primary transition-colors">
                <FileText className="w-4 h-4 text-primary" /> Resume / CV Link{" "}
                <span className="text-error font-bold">*</span>
              </span>
            </label>
            <input
              type="url"
              name="resumeLink"
              required
              placeholder="e.g., https://drive.google.com/... or Notion link"
              className="input input-bordered input-primary w-full bg-base-200/20 focus:bg-base-100 transition-all duration-300 rounded-xl placeholder:text-base-content/30"
              value={formData.resumeLink}
              onChange={handleChange}
            />
            <label className="label pb-0">
              <span className="label-text-alt text-base-content/40 italic">
                Ensure sharing permissions are set to "Anyone with the link".
              </span>
            </label>
          </div>

          {/* Grid Layout for Required Links (Portfolio & GitHub) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portfolio Link */}
            <div className="form-control w-full group/input">
              <label className="label pt-0 pb-1.5">
                <span className="label-text flex items-center gap-2 font-semibold text-base-content/80 group-focus-within/input:text-secondary transition-colors">
                  <Link className="w-4 h-4 text-secondary" /> Portfolio Website{" "}
                  <span className="text-error font-bold">*</span>
                </span>
              </label>
              <input
                type="url"
                name="portfolioLink"
                required
                placeholder="e.g., https://bento.me/username"
                className="input input-bordered w-full bg-base-200/20 focus:border-secondary focus:ring-1 focus:ring-secondary/50 focus:bg-base-100 transition-all duration-300 rounded-xl placeholder:text-base-content/30"
                value={formData.portfolioLink}
                onChange={handleChange}
              />
            </div>

            {/* GitHub Profile Link */}
            <div className="form-control w-full group/input">
              <label className="label pt-0 pb-1.5">
                <span className="label-text flex items-center gap-2 font-semibold text-base-content/80 group-focus-within/input:text-accent transition-colors">
                  <FaGithub className="w-4 h-4 text-base-content/70" /> GitHub
                  Profile <span className="text-error font-bold">*</span>
                </span>
              </label>
              <input
                type="url"
                name="githubLink"
                required
                placeholder="e.g., https://github.com/username"
                className="input input-bordered w-full bg-base-200/20 focus:border-accent focus:ring-1 focus:ring-accent/50 focus:bg-base-100 transition-all duration-300 rounded-xl placeholder:text-base-content/30"
                value={formData.githubLink}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-control w-full">
            <label className="label pt-0 pb-1.5">
              <span className="label-text font-semibold text-base-content/80">
                Cover Note / Pitch{" "}
                <span className="text-base-content/40 text-xs font-normal">
                  (Optional)
                </span>
              </span>
            </label>
            <textarea
              name="additionalNotes"
              rows="4"
              placeholder="Briefly introduce yourself or highlight key achievements relevant to this role..."
              className="textarea textarea-bordered w-full bg-base-200/20 focus:border-primary focus:bg-base-100 transition-all duration-300 rounded-xl resize-none placeholder:text-base-content/30 p-4"
              value={formData.additionalNotes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full h-12 min-h-[3rem] text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 normal-case text-base"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing Application...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit My Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
