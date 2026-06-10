import React from "react";

const RecentApplications = ({
  title = "Table Title",
  columns = [],
  data = [],
  onViewAll,
}) => {
  // স্ট্যাটাস ব্যাজের কালার ডাইনামিক করার জন্য হেল্পার ফাংশন
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "interviewing":
      case "active":
        return "bg-emerald-950/50 text-emerald-400 border border-emerald-800/60";
      case "new":
      case "pending":
        return "bg-neutral-800 text-neutral-300 border border-neutral-700";
      case "reviewing":
      case "updated":
        return "bg-amber-950/40 text-amber-500 border border-amber-800/40";
      case "rejected":
      case "closed":
        return "bg-rose-950/40 text-rose-400 border border-rose-900/40";
      default:
        return "bg-neutral-800 text-neutral-300";
    }
  };

  return (
    <div className="w-full max-w-5xl mt-8">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs text-neutral-400 hover:text-white transition-colors font-medium"
          >
            View all
          </button>
        )}
      </div>

      {/* Table Container matching image_f6e67c.png */}
      <div className="overflow-x-auto border border-neutral-800 rounded-2xl bg-[#18181b]">
        <table className="table w-full border-collapse">
          {/* Table Head - Dynamically Rendered */}
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 font-semibold text-xs sm:text-sm h-14">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`bg-transparent font-semibold ${idx === 0 ? "pl-6" : ""} ${idx === columns.length - 1 ? "pr-6" : ""}`}
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body - Dynamically Rendered */}
          <tbody className="text-neutral-300 text-sm">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="border-b border-neutral-800/60 hover:bg-neutral-800/20 transition-colors h-20 last:border-none"
              >
                {columns.map((col, colIndex) => {
                  const cellValue = row[col.field];

                  return (
                    <td
                      key={colIndex}
                      className={`bg-transparent ${colIndex === 0 ? "pl-6" : ""} ${colIndex === columns.length - 1 ? "pr-6" : ""}`}
                    >
                      {/* ১. ক্যান্ডিডেট/ইউজার কলাম (যদি অ্যাভাটার বা ইমেজ থাকে) */}
                      {col.isCandidate && (
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-neutral-800 shrink-0 border border-neutral-700/50" />
                          <span className="font-semibold text-white text-[15px]">
                            {cellValue}
                          </span>
                        </div>
                      )}

                      {/* ২. স্ট্যাটাস কলাম (যদি ব্যাজ দেখাতে চান) */}
                      {col.isStatus && (
                        <span
                          className={`badge badge-md py-3 px-4 font-medium rounded-full text-xs capitalize ${getStatusBadgeClass(cellValue)}`}
                        >
                          {cellValue}
                        </span>
                      )}

                      {/* ৩. নরমাল টেক্সট কলাম */}
                      {!col.isCandidate && !col.isStatus && (
                        <span
                          className={
                            colIndex === 0
                              ? "font-semibold text-white"
                              : "text-neutral-400"
                          }
                        >
                          {cellValue}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-12 text-neutral-500 text-sm">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentApplications;
