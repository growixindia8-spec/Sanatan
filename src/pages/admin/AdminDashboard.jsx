import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import StatusBadge from "../../components/admin/StatusBadge";
import {
  HeartHandshake,
  Users,
  UserCheck,
  Flame,
  ShieldAlert,
  Briefcase,
  Mail,
  Newspaper,
  Calendar,
  IndianRupee,
  Clock,
  ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminApi.getDashboardStats();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingState message="Fetching current stats..." />;
  if (error) return <ErrorState error={error} onRetry={fetchStats} />;

  const { stats, recent } = data;

  const cardItems = [
    {
      title: "Total Donations",
      value: `₹${stats.totalDonatedAmount.toLocaleString("en-IN")}`,
      desc: `${stats.successfulDonations} successful (${stats.pendingDonations} pending)`,
      color: "from-orange-500 to-red-500",
      icon: IndianRupee,
      path: "/admin/donations"
    },
    {
      title: "Approved Members",
      value: stats.approvedMembers,
      desc: `${stats.pendingMemberships} pending applications`,
      color: "from-emerald-500 to-teal-500",
      icon: Users,
      path: "/admin/members"
    },
    {
      title: "Active Fundraisers",
      value: stats.activeFundraisers,
      desc: `${stats.pendingFundraisers} pending approval`,
      color: "from-amber-500 to-orange-500",
      icon: Flame,
      path: "/admin/fundraisers"
    },
    {
      title: "Open Complaints",
      value: stats.openComplaints,
      desc: "Requires review/resolution",
      color: "from-rose-500 to-red-600",
      icon: ShieldAlert,
      path: "/admin/complaints"
    },
    {
      title: "CSR Enquiries",
      value: stats.pendingCsr,
      desc: "New corporate collaborations",
      color: "from-blue-500 to-indigo-500",
      icon: Briefcase,
      path: "/admin/csr-enquiries"
    },
    {
      title: "Unread Enquiries",
      value: stats.unreadContact,
      desc: "New contact messages",
      color: "from-purple-500 to-pink-500",
      icon: Mail,
      path: "/admin/contact-enquiries"
    }
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Admin Control Dashboard"
        description="Real-time statistics, overview, and quick actions for managing foundation operations."
      />

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardItems.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              onClick={() => navigate(c.path)}
              className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm relative overflow-hidden group hover:border-[#FF6600] transition-all duration-300 cursor-pointer hover:shadow-md"
            >
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${c.color} opacity-[0.03] rounded-bl-full`}></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{c.title}</span>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-[#FF6600] group-hover:border-orange-100 transition-colors">
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-2xl font-serif font-black text-charcoal mb-1 relative z-10">
                {c.value}
              </div>
              <p className="text-[11px] text-gray-500">{c.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Latest Donations */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider">Latest Donations</h3>
            <Link to="/admin/donations" className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-grow">
            {recent.latestDonations.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">No donation records.</div>
            ) : (
              recent.latestDonations.map((d) => (
                <div key={d._id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h4 className="font-bold text-charcoal text-xs">{d.fullName}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{d.campaign || d.projectFor} • {new Date(d.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-black text-xs text-charcoal block">₹{d.amount.toLocaleString("en-IN")}</span>
                    <span className="mt-1 block"><StatusBadge status={d.paymentStatus} /></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Applications */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider">Recent Membership Applications</h3>
            <Link to="/admin/membership-applications" className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-grow">
            {recent.latestMemberships.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">No pending applications.</div>
            ) : (
              recent.latestMemberships.map((m) => (
                <div key={m._id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h4 className="font-bold text-charcoal text-xs">{m.fullName}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{m.category.replace("-", " ")} • {m.city}, {m.state}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[10px] text-[#FF6600] block capitalize">{m.level}</span>
                    <span className="mt-1 block"><StatusBadge status={m.applicationStatus} /></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Fundraiser Requests */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider">Latest Fundraisers</h3>
            <Link to="/admin/fundraisers" className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-grow">
            {recent.latestFundraisers.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">No fundraiser requests.</div>
            ) : (
              recent.latestFundraisers.map((f) => (
                <div key={f._id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h4 className="font-bold text-charcoal text-xs">{f.campaignTitle || f.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">By {f.applicantName} • Target: ₹{f.targetAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[10px] text-gray-500 block">{f.campaignCategory || f.category}</span>
                    <span className="mt-1 block"><StatusBadge status={f.status} /></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Complaints */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider">Latest Complaints</h3>
            <Link to="/admin/complaints" className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 flex-grow">
            {recent.latestComplaints.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-xs">No complaint requests.</div>
            ) : (
              recent.latestComplaints.map((c) => (
                <div key={c._id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h4 className="font-mono font-bold text-charcoal text-[11px]">{c.ticketId}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Category: {c.category} • By {c.fullName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">{new Date(c.createdAt).toLocaleDateString()}</span>
                    <span className="mt-1 block"><StatusBadge status={c.status} /></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
