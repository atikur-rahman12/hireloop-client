import StatCard from "./StatCard";

const StatsGroup = ({ statsData = [] }) => {
  const gridColsClass =
    statsData.length === 3
      ? "lg:grid-cols-3"
      : statsData.length === 2
        ? "lg:grid-cols-2"
        : statsData.length === 1
          ? "lg:grid-cols-1"
          : "lg:grid-cols-4";

  return (
    <div className="w-full">
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 ${gridColsClass} gap-6 w-full`}
      >
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.id || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsGroup;
