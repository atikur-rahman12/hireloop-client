"use client";

import { useSession } from "@/lib/auth-client";
import { FileText, Users, Zap, CheckCircle2 } from "lucide-react";
import StatsGroup from "../StatsGroup";

const RecruiterHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="p-10">
        {/* Welcome Title */}
        <div className="mb-14">
          <div className="skeleton h-12 w-95 lg:w-145 rounded-lg" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-base-300 bg-base-200/40 p-7 h-47.5"
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="skeleton h-11 w-11 rounded-xl" />

                {/* Push content to bottom */}
                <div className="mt-auto">
                  <div className="skeleton h-3 w-28 mb-4" />
                  <div className="skeleton h-10 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const recruitersStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Users,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Zap,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: CheckCircle2,
    },
  ];

  const user = session?.user;
  console.log("Session data in RecruiterPage:", session);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-15">
        Welcome Back, {user?.name}
      </h2>
      <StatsGroup statsData={recruitersStats} />
    </div>
  );
};

export default RecruiterHomePage;
