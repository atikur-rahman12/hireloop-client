import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardSidebar>{children}</DashboardSidebar>
    </div>
  );
};

export default DashboardLayout;
