"use client";

import { useSession } from "@/lib/auth-client";
import { FileText, Users, Zap, CheckCircle2 } from "lucide-react";
import StatsGroup from "../StatsGroup";
import RecruiterDashboardSkeleton from "@/components/Skeleton/RecruiterDashboardSkeleton";
import RecentApplications from "../RecentApplications";

const RecruiterHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div>
        <RecruiterDashboardSkeleton />
      </div>
    );
  }

  // recruiter stats card
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

  const columnsConfig = [
    { headerName: "Candidate Name", field: "name", isCandidate: true }, // ইমেজসহ দেখাবে
    { headerName: "Role", field: "role" },
    { headerName: "Date Applied", field: "date" },
    { headerName: "Experience", field: "exp" },
    { headerName: "Status", field: "status", isStatus: true }, // ব্যাজ আকারে দেখাবে
  ];

  // ২. আপনার ডাটা অবজেক্ট
  const applicationsData = [
    {
      id: 1,
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      exp: "6 years",
      status: "Interviewing",
    },
    {
      id: 2,
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      exp: "4 years",
      status: "New",
    },
    {
      id: 3,
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      exp: "8 years",
      status: "Reviewing",
    },
    {
      id: 4,
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      exp: "5 years",
      status: "Rejected",
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

      <div>
        <RecentApplications
          title="Recent Applications"
          columns={columnsConfig}
          data={applicationsData}
          onViewAll={() => console.log("View all applications clicked")}
        />
      </div>
    </div>
  );
};

export default RecruiterHomePage;
