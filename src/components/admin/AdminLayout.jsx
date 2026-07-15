import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  UserCheck,
  Flame,
  ShieldAlert,
  Briefcase,
  Mail,
  Newspaper,
  Calendar,
  Layers,
  BarChart3,
  ShieldCheck,
  Settings,
  History,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Bell,
  User as UserIcon
} from "lucide-react";

export default function AdminLayout() {
  const { adminUser, logoutAdmin } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Donations", path: "/admin/donations", icon: HeartHandshake },
    { name: "Members", path: "/admin/members", icon: Users },
    { name: "Membership Applications", path: "/admin/membership-applications", icon: UserCheck },
    { name: "Fundraisers", path: "/admin/fundraisers", icon: Flame },
    { name: "Complaints", path: "/admin/complaints", icon: ShieldAlert },
    { name: "CSR Enquiries", path: "/admin/csr-enquiries", icon: Briefcase },
    { name: "Contact Enquiries", path: "/admin/contact-enquiries", icon: Mail },
    { name: "Newsletter", path: "/admin/newsletter", icon: Newspaper },
    { name: "Festival Calendar", path: "/admin/festivals", icon: Calendar },
    { name: "Website Content", path: "/admin/content", icon: Layers },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    ...(adminUser?.role === "superadmin"
      ? [{ name: "Admin Users", path: "/admin/users", icon: ShieldCheck }]
      : []),
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Audit Logs", path: "/admin/audit-logs", icon: History }
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "superadmin": return "bg-red-100 text-red-700 border-red-200";
      case "admin": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const navLinks = (
    <div className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-xs border ${
              isActive
                ? "bg-orange-50 text-[#FF6600] border-orange-100 shadow-sm"
                : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-charcoal"
            }`}
          >
            <Icon size={16} className={isActive ? "text-[#FF6600]" : "text-gray-400"} />
            <span>{item.name}</span>
          </Link>
        );
      })}
      
      <div className="pt-4 border-t border-gray-100 mt-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 hover:text-charcoal transition-all text-xs"
        >
          <ExternalLink size={16} className="text-gray-400" />
          <span>View Website</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-xs"
        >
          <LogOut size={16} className="text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-150 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25">
            SD
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-charcoal leading-tight">SDMKF Foundation</h1>
            <p className="text-[10px] font-bold text-[#FF6600] tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-grow p-4 overflow-y-auto">
          {navLinks}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
            <UserIcon size={18} />
          </div>
          <div className="min-w-0 flex-grow">
            <h4 className="font-bold text-xs text-charcoal truncate">{adminUser?.fullName || "Administrator"}</h4>
            <span className={`inline-block px-2 py-0.5 mt-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getRoleBadgeColor(adminUser?.role)}`}>
              {adminUser?.role || "Admin"}
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay & Panel) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          ></div>
          <aside className="relative flex flex-col w-80 max-w-sm bg-white h-full overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25">
                  SD
                </div>
                <div>
                  <h1 className="font-extrabold text-sm text-charcoal leading-tight">SDMKF</h1>
                  <p className="text-[10px] font-bold text-[#FF6600] tracking-widest uppercase">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-grow overflow-y-auto pr-2">
              {navLinks}
            </nav>
            
            <div className="pt-4 border-t border-gray-100 mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                <UserIcon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs text-charcoal truncate">{adminUser?.fullName}</h4>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getRoleBadgeColor(adminUser?.role)}`}>
                  {adminUser?.role}
                </span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 border border-gray-150 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block text-xs font-bold text-gray-400 uppercase tracking-widest">
              Sanatan Dharm Manav Kalyan Foundation
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 border border-gray-150 relative transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6600] animate-ping"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <h4 className="font-bold text-xs text-charcoal">{adminUser?.fullName}</h4>
                <p className="text-[9px] font-bold text-[#FF6600] uppercase tracking-wider">{adminUser?.zone || "All Zones"}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6600] font-black">
                {adminUser?.fullName ? adminUser.fullName.charAt(0).toUpperCase() : "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
