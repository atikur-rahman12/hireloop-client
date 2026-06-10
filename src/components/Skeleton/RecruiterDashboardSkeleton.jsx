import React from "react";

const RecruiterDashboardSkeleton = () => {
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
};

export default RecruiterDashboardSkeleton;
