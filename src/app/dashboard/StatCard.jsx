import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-[#18181b] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between min-h-45 w-full transition-all duration-300 hover:border-neutral-700">
      {/* Icon Wrapper */}
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800 text-neutral-300">
        {Icon && <Icon size={20} className="stroke-[1.5]" />}
      </div>

      {/* Content */}
      <div className="mt-10">
        <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase mb-3">
          {title}
        </p>

        <p className="text-3xl font-semibold text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
