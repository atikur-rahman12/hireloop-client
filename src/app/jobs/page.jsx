import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = (await getJobs()) || [];

  return (
    <main className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>

          <p className="text-base-content/70 max-w-3xl mx-auto text-sm sm:text-base">
            Discover exciting career opportunities from top companies. Browse
            thousands of job listings and take the next step toward your
            professional future.
          </p>
        </div>

        <JobFilters initialJobs={jobs} />
      </div>
    </main>
  );
}
