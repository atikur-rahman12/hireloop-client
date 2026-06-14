"use client";

import {
  Building2,
  LayoutDashboard,
  Settings,
  BriefcaseBusiness,
  Files,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = ({ children }) => {
  const pathname = usePathname();

  const navContent = [
    {
      icon: <LayoutDashboard className="w-6 h-6 mr-2" />,
      name: "Dashboard",
      href: "/dashboard/recruiter",
    },
    {
      icon: <Building2 className="w-6 h-6 mr-2" />,
      name: "My Company",
      href: "/dashboard/recruiter/company",
    },
    {
      icon: <BriefcaseBusiness className="w-6 h-6 mr-2" />,
      name: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
    },
    {
      icon: <Files className="w-6 h-6 mr-2" />,
      name: "Applications",
      href: "/applications",
    },
    {
      icon: <Settings className="w-6 h-6 mr-2" />,
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* NAVBAR */}
        <nav className="navbar w-full bg-[#131314] border-b border-white/20">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M9 4v16" />
              <path d="M14 10l2 2l-2 2" />
            </svg>
          </label>

          <div className="px-4 text-white text-lg font-semibold">Dashboard</div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-4 bg-[#131314] min-h-screen">{children}</div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-80 min-h-full bg-[#131314] border-r border-white/20">
          <ul className="menu p-4 w-full space-y-1">
            {navContent.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/recruiter" &&
                  pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center rounded-md px-3 py-3 ml-2 transition-all duration-200 hover:bg-white/10 hover:text-white before:content-[''] before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-l-md before:transition-all before:duration-200 ${
                      isActive
                        ? "bg-white/10 text-white before:opacity-100"
                        : "text-white/70 before:opacity-0"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[16px]">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardSidebar;
