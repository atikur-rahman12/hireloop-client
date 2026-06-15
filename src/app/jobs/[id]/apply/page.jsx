import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applicatons";
import Link from "next/link";
import { AlertTriangle, Crown, Info, ArrowLeft } from "lucide-react";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-error"></div>
          <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-base-content mb-2">
            Access Denied
          </h3>
          <p className="text-sm text-base-content/60 leading-relaxed mb-6">
            Only job seekers can apply for positions. Please sign in with a
            seeker account to proceed.
          </p>
          <Link
            href="/jobs"
            className="btn btn-outline btn-error w-full rounded-xl gap-2 normal-case"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById(user?.plan || "seeker_free");

  const job = await getJobById(id);

  const isLimitReached = applications.length >= plan.maxApplicationsPerMonth;
  const progressPercentage =
    (applications.length / plan.maxApplicationsPerMonth) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-base-100/70 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-base-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-sm font-bold uppercase tracking-wider bg-base-200 text-base-content/70 border-none px-2.5 py-2">
                {plan.name} Plan
              </span>
              <span className="text-sm font-medium text-base-content/50">
                Monthly Usage
              </span>
            </div>

            <h3 className="text-lg font-bold text-base-content mb-3">
              You have Applied{" "}
              <span className="text-primary font-black text-xl">
                {applications.length}
              </span>{" "}
              / {plan.maxApplicationsPerMonth} positions
            </h3>

            <div className="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isLimitReached
                    ? "bg-red-600"
                    : progressPercentage > 66
                      ? "bg-warning"
                      : "bg-primary"
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="w-full md:w-auto flex-shrink-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-4 rounded-2xl border border-primary/10 text-center md:text-left flex flex-col sm:flex-row md:flex-col items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl hidden sm:block md:hidden lg:block">
              <Crown className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-base-content/80">
                Want unlimited applies?
              </p>
              <p className="text-[11px] text-base-content/50 mt-0.5">
                Upgrade your account to apply more
              </p>
              <Link
                href="/plans"
                className="btn btn-primary btn-sm mt-3 w-full sm:w-auto md:w-full rounded-xl shadow-lg shadow-primary/20 normal-case text-white gap-1"
              >
                <Crown className="w-3.5 h-3.5" /> View Premium Plans
              </Link>
            </div>
          </div>
        </div>

        {isLimitReached && (
          <div className="alert bg-amber-50 text-amber-950 border border-amber-200 shadow-xl rounded-2xl p-5 flex items-start gap-4 mt-6">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-700" />
            <div>
              <h4 className="font-extrabold text-base text-amber-900 leading-none mb-1.5">
                Monthly application limit reached!
              </h4>
              <p className="text-sm text-amber-800 font-medium leading-relaxed">
                You have used all{" "}
                <span className="font-bold underline">
                  {plan.maxApplicationsPerMonth}
                </span>{" "}
                free applications for this month. Please upgrade your package or
                wait until next month to apply again.
              </p>
            </div>
          </div>
        )}
      </div>

      {!isLimitReached && <JobApply applicant={user} job={job} />}
    </div>
  );
};

export default ApplyPage;
