import React, { useState, useEffect } from 'react';
import PortalHeader from '../components/PortalHeader';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { usePortalAuth } from '../context/PortalAuthContext';
import { api } from '../lib/apiClient';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  User, 
  Bell, 
  LogOut, 
  UploadCloud, 
  Check, 
  X, 
  AlertCircle, 
  Loader, 
  PlusCircle, 
  ClipboardList, 
  Info,
  Lock,
  Calendar
} from 'lucide-react';

import MyMembershipPanel from '../components/portal/MyMembershipPanel';
import MyDonationsPanel from '../components/portal/MyDonationsPanel';
import MyFundraisersPanel from '../components/portal/MyFundraisersPanel';
import MyReceiptsPanel from '../components/portal/MyReceiptsPanel';
export default function Portal() {
  const { user, error, login, logout, isAuthenticated } = usePortalAuth();
  const isManagementRole = user?.role === 'coordinator' || user?.role === 'admin';
  const [activeTab, setActiveTab] = useState(isManagementRole ? 'dashboard' : 'profile');
  // Auth Form State
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  useEffect(() => {
    if (user) {
      const isMgmt = user.role === 'coordinator' || user.role === 'admin';
      if (isMgmt) {
        if (window.location.pathname.endsWith('/admin/festivals') || window.location.pathname.endsWith('/festivals')) {
          setActiveTab('festivals');
        } else {
          setActiveTab('dashboard');
        }
      } else {
        setActiveTab('profile');
      }
    }
  }, [user]);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    const success = await login(mobile, password);
    setAuthLoading(false);
    if (success) {
      // useEffect handles tab setting
    }
  };
  // If user is not logged in, display the Login Panel
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-50">
        <PortalHeader />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-saffron" />
              </div>
              <h3 className="text-2xl font-bold text-center text-charcoal mb-2">Member Portal Login</h3>
              <p className="text-gray-500 text-center mb-8 text-sm">
                Access your member profile, status tracking, and secure workspace.
              </p>
              {error && (
                <div className="mb-6 p-4 bg-red-550/10 bg-red-50 text-red-750 text-red-700 text-sm rounded-xl flex items-center gap-2 border border-red-100">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Mobile Number</label>
                  <input 
                    type="text" 
                    required 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 8888888888" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-250 border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="w-full bg-[#FF6A00] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {authLoading ? <Loader size={20} className="animate-spin" /> : 'Login / Access Portal'}
                </button>
              </form>
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-xs text-gray-400 font-bold">
               SANATAN DHARM MANAV KALYAN FOUNDATION
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  // Render Portal Dashboard Layout once authenticated
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <PortalHeader />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* PortalSidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-6">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">ONLINE WORKSPACE</span>
              </div>
              <h4 className="font-bold text-charcoal truncate">{user?.fullName || 'System User'}</h4>
              <p className="text-[10px] font-bold text-gray-400 capitalize">{user?.role} • {user?.zone || 'All Zones'}</p>
            </div>
                        <nav className="p-4 space-y-1">
              {isManagementRole && (
                <>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                      activeTab === 'dashboard' 
                        ? 'bg-orange-50 text-[#FF6A00]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                    }`}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </button>
                  <button 
                    onClick={() => setActiveTab('memberships')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                      activeTab === 'memberships' 
                        ? 'bg-orange-50 text-[#FF6A00]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                    }`}
                  >
                    <ClipboardList size={18} /> Memberships
                  </button>
                  <button 
                    onClick={() => setActiveTab('verify-member')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                      activeTab === 'verify-member' 
                        ? 'bg-orange-50 text-[#FF6A00]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                    }`}
                  >
                    <Search size={18} /> Verify Member
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                      activeTab === 'notifications' 
                        ? 'bg-orange-50 text-[#FF6A00]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                    }`}
                  >
                    <Bell size={18} /> Notifications
                  </button>
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => setActiveTab('festivals')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                        activeTab === 'festivals' 
                          ? 'bg-orange-50 text-[#FF6A00]' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                      }`}
                    >
                      <Calendar size={18} /> Festivals Calendar
                    </button>
                  )}
                </>
              )}
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === 'profile' 
                    ? 'bg-orange-50 text-[#FF6A00]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <User size={18} /> My Profile
              </button>
              <button 
                onClick={() => setActiveTab('membership')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === 'membership' 
                    ? 'bg-orange-50 text-[#FF6A00]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <ClipboardList size={18} /> My Membership
              </button>
              <button 
                onClick={() => setActiveTab('donations')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === 'donations' 
                    ? 'bg-orange-50 text-[#FF6A00]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <FileText size={18} /> My Donations
              </button>
              <button 
                onClick={() => setActiveTab('fundraisers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === 'fundraisers' 
                    ? 'bg-orange-50 text-[#FF6A00]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <UploadCloud size={18} /> My Fundraisers
              </button>
              <button 
                onClick={() => setActiveTab('receipts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                  activeTab === 'receipts' 
                    ? 'bg-orange-50 text-[#FF6A00]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <Check size={18} /> Receipts & Certificates
              </button>
              {!isManagementRole && (
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                    activeTab === 'notifications' 
                      ? 'bg-orange-50 text-[#FF6A00]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                  }`}
                >
                  <Bell size={18} /> Notifications
                </button>
              )}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-sm"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </nav>
          </div>
        </div>
        {/* Active Panel Content */}
        <div className="flex-grow min-w-0">
          {activeTab === 'dashboard' && <DashboardPanel logout={logout} />}
          {activeTab === 'memberships' && <MembershipsPanel />}
          {activeTab === 'verify-member' && <VerifyMembershipPanel />}
          {activeTab === 'notifications' && <NotificationsPanel />}
          {activeTab === 'festivals' && <FestivalsPanel />}
          {activeTab === 'profile' && <MyProfilePanel />}
          {activeTab === 'membership' && <MyMembershipPanel />}
          {activeTab === 'donations' && <MyDonationsPanel />}
          {activeTab === 'fundraisers' && <MyFundraisersPanel />}
          {activeTab === 'receipts' && <MyReceiptsPanel />}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
// ==========================================
// SUB-COMPONENTS / PANELS
// ==========================================
// --- DashboardPanel ---
function DashboardPanel({ logout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboardStats();
        setStats(data.data);
      } catch (err) {
        setError(err.message);
        // Logout if token failed or is invalid
        if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('token')) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [logout]);
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 flex justify-center items-center shadow-sm">
        <Loader size={36} className="text-saffron animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
        <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
        <h4 className="text-lg font-bold text-charcoal mb-2">Failed to load statistics</h4>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }
  const statCards = [
    { title: 'Active Members in Zone', count: stats?.activeMembersInZone, desc: 'Approved registrations' },
    { title: 'Pending Verifications', count: stats?.pendingVerifications, desc: 'Needs regional check' },
    { title: 'Reports Published (Month)', count: stats?.reportsThisMonth, desc: 'Audited statements upload' },
    { title: 'Pending Fundraisers', count: stats?.pendingFundraisers, desc: 'Awaiting approvals' },
    { title: 'Pending Complaints', count: stats?.pendingComplaints, desc: 'Active open complaints' }
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-2xl font-bold font-serif text-charcoal mb-2">Welcome Back!</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Here is a summary of active social initiatives, memberships, and pending actions requiring attention in your assigned region.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden group hover:border-saffron transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-6 -mt-6 group-hover:bg-orange-100 transition-colors"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">{card.title}</span>
            <div className="text-3xl font-extrabold text-charcoal mb-1 relative z-10">{card.count ?? 0}</div>
            <p className="text-xs text-gray-500">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// --- MembershipsPanel ---
function MembershipsPanel() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(''); // '', 'pending', 'approved', 'rejected'
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [message, setMessage] = useState('');
  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const data = await api.getMemberships(statusFilter);
      setMemberships(data.memberships);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMemberships();
  }, [statusFilter]);
  const handleApprove = async (id) => {
    setActionLoadingId(id);
    setMessage('');
    try {
      const res = await api.approveMembership(id);
      setMessage(`Successfully approved application. Allocated Member ID: ${res.data.memberId}`);
      fetchMemberships();
    } catch (err) {
      setMessage(`Approval failed: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };
  const handleReject = async (id) => {
    setActionLoadingId(id);
    setMessage('');
    try {
      await api.rejectMembership(id);
      setMessage('Membership application successfully rejected.');
      fetchMemberships();
    } catch (err) {
      setMessage(`Rejection failed: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/20">
        <div>
          <h3 className="text-xl font-bold text-charcoal">Membership Applications</h3>
          <p className="text-xs text-gray-500">Manage and verify membership registrations</p>
        </div>
        <div className="flex gap-2">
          {['', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                statusFilter === status 
                  ? 'bg-charcoal text-white border-charcoal' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {status || 'All'}
            </button>
          ))}
        </div>
      </div>
      {message && (
        <div className="mx-6 mt-6 p-4 bg-orange-50 text-saffron text-sm rounded-xl border border-orange-100 flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="text-gray-400 hover:text-charcoal"><X size={16} /></button>
        </div>
      )}
      {loading ? (
        <div className="p-12 text-center"><Loader className="animate-spin text-saffron mx-auto" /></div>
      ) : memberships.length === 0 ? (
        <div className="p-12 text-center text-gray-500 text-sm">No membership registrations found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase font-bold">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {memberships.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-semibold text-charcoal">{member.fullName}</td>
                  <td className="p-4 capitalize text-gray-600">{member.category?.replace('-', ' ')}</td>
                  <td className="p-4 text-gray-600">{member.mobile}</td>
                  <td className="p-4 text-gray-600">{member.city}, {member.state}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                      member.applicationStatus === 'approved' 
                        ? 'bg-green-50 text-green-700' 
                        : member.applicationStatus === 'rejected'
                        ? 'bg-red-50 text-red-700' 
                        : 'bg-yellow-50 text-yellow-750 text-yellow-700'
                    }`}>
                      {member.applicationStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {member.applicationStatus === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={actionLoadingId === member._id}
                          onClick={() => handleApprove(member._id)}
                          className="bg-green-600 text-white p-1.5 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          disabled={actionLoadingId === member._id}
                          onClick={() => handleReject(member._id)}
                          className="bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// --- VerifyMembershipPanel ---
function VerifyMembershipPanel() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.verifyMembership(query);
      setResults(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <Search size={22} className="text-saffron" /> Search Membership Database
        </h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter name, mobile number, or member ID..."
            className="flex-grow px-4 py-3 rounded-xl border border-gray-250 border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-charcoal text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : 'Search'}
          </button>
        </form>
      </div>
      {searched && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h4 className="font-bold text-charcoal">Matching Records ({results.length})</h4>
          </div>
          {loading ? (
            <div className="p-12 text-center"><Loader className="animate-spin text-saffron mx-auto" /></div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">No membership records match the search query.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 font-bold uppercase">
                  <tr>
                    <th className="p-4">Member ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-mono text-charcoal font-semibold">{item.memberId || 'PENDING'}</td>
                      <td className="p-4 font-semibold text-charcoal">{item.fullName}</td>
                      <td className="p-4 capitalize text-gray-600">{item.category?.replace('-', ' ')}</td>
                      <td className="p-4 text-gray-600">{item.city}, {item.state}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                          item.applicationStatus === 'approved' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-yellow-50 text-yellow-750 text-yellow-700'
                        }`}>
                          {item.applicationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// --- AddFinancialReportPanel ---
function AddFinancialReportPanel() {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState('');
  const [fiscalYear, setFiscalYear] = useState('2025-2026');
  const [category, setCategory] = useState('audit');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await api.getFinancialReports();
      setReports(data.reports);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a PDF or DOCX report file to upload');
      setIsSuccess(false);
      return;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('fiscalYear', fiscalYear);
    formData.append('category', category);
    formData.append('file', file);
    try {
      await api.uploadFinancialReport(formData);
      setMessage('Financial report uploaded and published successfully!');
      setIsSuccess(true);
      setTitle('');
      setFile(null);
      // Reset input element
      document.getElementById('report-file-input').value = '';
      fetchReports();
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
      setIsSuccess(false);
    } finally {
      setUploading(false);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 20 * 1024 * 1024) {
      setMessage('File exceeds the 20MB maximum size limit');
      setIsSuccess(false);
      setFile(null);
      e.target.value = '';
    } else {
      setFile(selectedFile);
      setMessage('');
    }
  };
  // Check if active user is admin
  const user = JSON.parse(localStorage.getItem('portal_user') || '{}');
  const isAdmin = user.role === 'admin';
  return (
    <div className="space-y-8">
      {/* Upload Box (Visible to Admins only) */}
      {isAdmin ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UploadCloud size={20} className="text-saffron" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal">Publish Financial Statement</h3>
              <p className="text-xs text-gray-500">Upload audited reports directly to transparency portal</p>
            </div>
          </div>
          {message && (
            <div className={`mb-6 p-4 rounded-xl border text-sm flex items-center gap-2 ${
              isSuccess 
                ? 'bg-green-50 text-green-700 border-green-100' 
                : 'bg-red-50 text-red-755 text-red-700 border-red-100'
            }`}>
              <AlertCircle size={18} className="shrink-0" />
              <span>{message}</span>
            </div>
          )}
          <form onSubmit={handleUploadSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Statement Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Audit Report FY 2025-26"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Fiscal Year</label>
                <select
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-white transition-all"
                >
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Category Tag</label>
              <div className="flex gap-4">
                {['audit', 'donation-utilization', 'budget-plan'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer capitalize">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      className="text-saffron focus:ring-saffron"
                    />
                    {cat.replace('-', ' ')}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Report File (PDF or DOCX)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-orange-50/30 hover:border-saffron/50 transition-colors p-6 flex flex-col items-center justify-center text-center relative">
                <UploadCloud size={28} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 block mb-1">
                  {file ? file.name : 'Select statement file'}
                </span>
                <span className="text-xs text-gray-400 block mb-3">Max size: 20MB</span>
                <input
                  type="file"
                  id="report-file-input"
                  required
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button type="button" className="bg-white border border-gray-250 border-gray-200 text-charcoal font-semibold py-1.5 px-4 rounded-lg text-xs hover:border-saffron transition-all">
                  Browse Files
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="bg-[#FF6A00] text-white font-bold py-2.5 px-8 rounded-xl hover:bg-orange-600 transition-all text-sm flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {uploading ? <Loader size={16} className="animate-spin" /> : 'Publish Document'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-3 text-sm text-gray-600 shadow-sm">
          <Info size={20} className="text-blue-500" />
          <span>Publishing financial reports is restricted to administrators. Contact the state coordinator if updates are required.</span>
        </div>
      )}
      {/* Reports Listing */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-charcoal">Published Reports</h3>
          <p className="text-xs text-gray-500">Live active transparency statements served to public</p>
        </div>
        {loading ? (
          <div className="p-12 text-center"><Loader className="animate-spin text-saffron mx-auto" /></div>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No reports have been published yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase font-bold">
                <tr>
                  <th className="p-4">Report Name</th>
                  <th className="p-4">Fiscal Year</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Published Date</th>
                  <th className="p-4 text-right">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold text-charcoal">{report.reportTitle}</td>
                    <td className="p-4 text-gray-600">{report.fiscalYear}</td>
                    <td className="p-4 capitalize text-gray-600">{report.categoryTag?.replace('-', ' ')}</td>
                    <td className="p-4 text-gray-505 text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <a
                        href={`${import.meta.env.VITE_API_URL}${report.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-saffron font-bold hover:underline text-xs"
                      >
                        Open File
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
// --- NotificationsPanel ---
function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [zone, setZone] = useState('');
  const [type, setType] = useState('info');
  const [createMsg, setCreateMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('portal_user') || '{}');
  const isAdmin = user.role === 'admin';
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await api.getNotifications();
      setNotifications(data.notifications);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const handleRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      fetchNotifications();
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    setCreateMsg('');
    try {
      await api.createNotification({ title, message, zone: zone || null, type });
      setCreateMsg('Notification broadcasted successfully!');
      setTitle('');
      setMessage('');
      setZone('');
      fetchNotifications();
    } catch (err) {
      setCreateMsg(`Failed to broadcast: ${err.message}`);
    }
  };
  return (
    <div className="space-y-8">
      {/* Broadcast Box (Admin Only) */}
      {isAdmin && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-saffron" /> Broadcast Announcement
          </h3>
          {createMsg && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-100 text-saffron text-sm rounded-xl">
              {createMsg}
            </div>
          )}
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Server Maintenance Window"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Zone (Leave blank for All)</label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="e.g. Maharashtra or Delhi"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Announcement Message</label>
              <textarea
                required
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type the announcement details here..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {['info', 'alert', 'success'].map((notifType) => (
                  <label key={notifType} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer capitalize">
                    <input
                      type="radio"
                      name="notifType"
                      checked={type === notifType}
                      onChange={() => setType(notifType)}
                      className="text-saffron focus:ring-saffron"
                    />
                    {notifType}
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="bg-charcoal text-white font-bold px-6 py-2 rounded-xl hover:bg-gray-800 text-xs transition-all"
              >
                Broadcast
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Notifications Listing */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <Bell size={22} className="text-saffron" /> Foundation Bulletin
        </h3>
        {loading ? (
          <div className="p-6 text-center"><Loader className="animate-spin text-saffron mx-auto" /></div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">No announcements or bulletins published.</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => {
              const isRead = n.isReadBy.includes(user.id);
              return (
                <div
                  key={n._id}
                  onClick={() => !isRead && handleRead(n._id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isRead 
                      ? 'bg-white border-gray-200 hover:bg-gray-50/50' 
                      : 'bg-orange-50/30 border-orange-100 hover:bg-orange-50/60 shadow-sm relative'
                  }`}
                >
                  {!isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                      n.type === 'alert' 
                        ? 'bg-red-50 text-red-600 border border-red-100' 
                        : n.type === 'success'
                        ? 'bg-green-50 text-green-600 border border-green-100'
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {n.type}
                    </span>
                    <span className="text-[10px] text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <h4 className="font-bold text-charcoal text-sm mb-1">{n.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
// --- MyProfilePanel ---
function MyProfilePanel() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('');
  const [message, setMessage] = useState('');
  const [updating, setUpdating] = useState(false);
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.getProfile();
      setProfile(res.user);
      setFullName(res.user.fullName || '');
      setEmail(res.user.email || '');
      setZone(res.user.zone || '');
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchApplications = async () => {
    try {
      setAppsLoading(true);
      const res = await api.getMyApplications();
      setApplications(res.applications || []);
    } catch (err) {
      console.error('Failed to load applications:', err.message);
    } finally {
      setAppsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchApplications();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');
    try {
      const res = await api.updateProfile({ fullName, email, zone });
      setProfile(res.user);
      setMessage('Profile updated successfully!');
      localStorage.setItem('portal_user', JSON.stringify(res.user));
    } catch (err) {
      setMessage(`Update failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };
  if (loading) {
    return <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-sm"><Loader className="animate-spin text-saffron mx-auto" /></div>;
  }
  return (
    <div className="space-y-8">
      {/* Profile Details Panel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <User size={22} className="text-saffron" /> Profile Details
        </h3>
        {message && (
          <div className="mb-6 p-3 bg-orange-50 border border-orange-100 text-saffron text-sm rounded-xl">
            {message}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-5 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile Number (Locked)</label>
              <input
                type="text"
                disabled
                value={profile?.mobile || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Assigned Role (Locked)</label>
              <input
                type="text"
                disabled
                value={profile?.role || 'donor'}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 text-sm focus:outline-none capitalize"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm text-charcoal font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm text-charcoal font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Assigned Zone</label>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="e.g. Maharashtra, Uttar Pradesh"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm text-charcoal font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-charcoal text-white font-bold py-2.5 px-8 rounded-xl hover:bg-gray-800 text-sm transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
          >
            {updating ? <Loader size={16} className="animate-spin" /> : 'Save Changes'}
          </button>
        </form>
      </div>
      {/* Applications list */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h4 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <ClipboardList size={22} className="text-saffron" /> My Membership Applications
        </h4>
        {appsLoading ? (
          <div className="p-12 text-center text-gray-500 font-semibold flex items-center justify-center gap-2">
            <Loader className="animate-spin text-saffron" size={20} />
            <span>Loading applications...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-devanagari font-medium mb-3">
            </p>
            <p className="text-xs text-gray-400 mb-6">
              You haven't applied for any membership yet.
            </p>
            <Link 
              to="/join-the-mission" 
              className="inline-block bg-[#FF6A00] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/10 active:scale-95"
            >
              Join The Mission
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                {/* Top orange stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6A00]"></div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold text-charcoal text-base capitalize font-serif">
                        {app.category === 'patron' || app.category === 'patronMember' ? 'Patron Member' : app.category.replace(/-/g, ' ')}
                      </h5>
                      <p className="text-[10px] text-gray-400 font-medium">Applied on: {new Date(app.createdAt).toLocaleDateString('hi-IN')}</p>
                    </div>
                    {/* Application Status Badge */}
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      app.applicationStatus === 'approved' 
                        ? 'bg-green-50 text-green-700' 
                        : app.applicationStatus === 'rejected'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-orange-50 text-[#FF6A00]'
                    }`}>
                      {app.applicationStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-gray-100 py-3 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Membership Level</span>
                      <span className="font-semibold text-charcoal">{app.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Contribution Fee</span>
                      <span className="font-black text-[#FF6A00] text-sm">₹{app.amount}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Payment Status</span>
                      <span className={`font-bold inline-flex items-center gap-1 capitalize ${
                        app.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${app.paymentStatus === 'paid' ? 'bg-green-600' : 'bg-yellow-500'}`}></span>
                        {app.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Member ID</span>
                      <span className="font-mono font-bold text-charcoal">
                        {app.memberId ? app.memberId : '—'}
                      </span>
                    </div>
                  </div>
                  {app.applicationStatus === 'pending' && (
                    <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-2.5 text-xs text-saffron font-bold font-devanagari text-center">
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- FestivalsPanel ---
function FestivalsPanel() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Form State
  const [editId, setEditId] = useState(null); // null means creating, otherwise editing ID
  const [festivalName, setFestivalName] = useState('');
  const [festivalDate, setFestivalDate] = useState('');
  const [associatedMission, setAssociatedMission] = useState('');
  const [donationCampaign, setDonationCampaign] = useState('');
  const [donationLink, setDonationLink] = useState('');
  const [status, setStatus] = useState('active');
  const [isPublished, setIsPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.adminGetFestivals();
      setFestivals(data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load festivals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setFestivalName('');
    setFestivalDate('');
    setAssociatedMission('');
    setDonationCampaign('');
    setDonationLink('');
    setStatus('active');
    setIsPublished(true);
    setDisplayOrder(0);
  };

  const handleEditClick = (fest) => {
    setEditId(fest._id);
    setFestivalName(fest.festivalName);
    const formattedDate = fest.festivalDate ? new Date(fest.festivalDate).toISOString().substring(0, 10) : '';
    setFestivalDate(formattedDate);
    setAssociatedMission(fest.associatedMission);
    setDonationCampaign(fest.donationCampaign || '');
    setDonationLink(fest.donationLink || '');
    setStatus(fest.status || 'active');
    setIsPublished(fest.isPublished !== undefined ? fest.isPublished : true);
    setDisplayOrder(fest.displayOrder || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!festivalName || !festivalDate || !associatedMission) {
      setError('Please fill in all required fields (Festival Name, Date, Associated Mission).');
      return;
    }

    const payload = {
      festivalName,
      festivalDate,
      associatedMission,
      donationCampaign,
      donationLink,
      status,
      isPublished,
      displayOrder: Number(displayOrder) || 0
    };

    try {
      if (editId) {
        await api.adminUpdateFestival(editId, payload);
        setSuccess('Festival successfully updated!');
      } else {
        await api.adminCreateFestival(payload);
        setSuccess('Festival successfully created!');
      }
      resetForm();
      fetchFestivals();
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप वाकई इस पर्व को हटाना चाहते हैं? / Are you sure you want to delete this festival?')) {
      return;
    }

    setError('');
    setSuccess('');
    setActionLoadingId(id);

    try {
      await api.adminDeleteFestival(id);
      setSuccess('Festival successfully deleted!');
      fetchFestivals();
    } catch (err) {
      setError(err.message || 'Delete operation failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  const togglePublish = async (fest) => {
    setError('');
    setSuccess('');
    setActionLoadingId(fest._id);
    try {
      await api.adminUpdateFestival(fest._id, { isPublished: !fest.isPublished });
      setSuccess(`Festival status set to ${!fest.isPublished ? 'Published' : 'Unpublished'}`);
      fetchFestivals();
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  const toggleStatus = async (fest) => {
    setError('');
    setSuccess('');
    setActionLoadingId(fest._id);
    const newStatus = fest.status === 'active' ? 'completed' : 'active';
    try {
      await api.adminPatchFestivalStatus(fest._id, newStatus);
      setSuccess(`Festival status set to ${newStatus}`);
      fetchFestivals();
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 text-charcoal">
      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-charcoal mb-2 flex items-center gap-2">
          <PlusCircle size={22} className="text-saffron" />
          {editId ? 'पर्व संपादित करें / Edit Festival' : 'नया पर्व जोड़ें / Add New Festival'}
        </h3>
        <p className="text-gray-500 text-xs mb-6">
          Create or update festivals that display in the public Festival & Seva Calendar.
        </p>

        {error && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3.5 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <Check size={16} className="shrink-0 text-green-500" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Festival Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Festival Name *</label>
              <input
                type="text"
                required
                value={festivalName}
                onChange={(e) => setFestivalName(e.target.value)}
                placeholder="e.g. 🕉️ मकर संक्रांति"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>

            {/* Festival Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Festival Date *</label>
              <input
                type="date"
                required
                value={festivalDate}
                onChange={(e) => setFestivalDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>

            {/* Associated Mission */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Associated Mission / Seva *</label>
              <input
                type="text"
                required
                value={associatedMission}
                onChange={(e) => setAssociatedMission(e.target.value)}
                placeholder="e.g. अन्न सेवा • कंबल वितरण"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>

            {/* Donation Campaign */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Donation Campaign ID (Optional)</label>
              <input
                type="text"
                value={donationCampaign}
                onChange={(e) => setDonationCampaign(e.target.value)}
                placeholder="e.g. makar-sankranti"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>

            {/* Donation Link */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Custom Donation URL (Optional)</label>
              <input
                type="text"
                value={donationLink}
                onChange={(e) => setDonationLink(e.target.value)}
                placeholder="e.g. /donate?campaign=makar-sankranti"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Status:</span>
              {['active', 'completed'].map((st) => (
                <label key={st} className="flex items-center gap-1.5 text-xs text-gray-650 cursor-pointer capitalize">
                  <input
                    type="radio"
                    name="festivalStatus"
                    checked={status === st}
                    onChange={() => setStatus(st)}
                    className="text-saffron focus:ring-saffron"
                  />
                  {st}
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-gray-300 text-saffron focus:ring-saffron"
              />
              Publish to Calendar Page
            </label>
          </div>

          <div className="flex gap-3 justify-end border-t border-gray-100 pt-5">
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 font-bold text-xs uppercase transition-all"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-charcoal hover:bg-gray-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              {editId ? 'Save Changes' : 'Publish Festival'}
            </button>
          </div>
        </form>
      </div>

      {/* Festivals List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <Calendar size={22} className="text-saffron" />
          पर्व सूची डेस्क / Festival List Desk
        </h3>

        {loading ? (
          <div className="py-12 text-center">
            <Loader size={32} className="animate-spin text-saffron mx-auto" />
            <p className="text-xs text-gray-400 mt-2">Loading festivals...</p>
          </div>
        ) : festivals.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm font-devanagari">कोई पर्व पंजीकृत नहीं है।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Weight</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Festival</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Associated Mission</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-sm">
                {festivals.map((fest) => (
                  <tr key={fest._id} className={actionLoadingId === fest._id ? 'opacity-40 pointer-events-none' : ''}>
                    <td className="px-4 py-3.5 text-gray-500 font-mono font-bold">{fest.displayOrder}</td>
                    <td className="px-4 py-3.5 font-bold text-charcoal font-devanagari">{fest.festivalName}</td>
                    <td className="px-4 py-3.5 font-semibold text-gray-600">
                      {new Date(fest.festivalDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 font-devanagari leading-relaxed max-w-xs truncate">{fest.associatedMission}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => toggleStatus(fest)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-center border w-fit ${
                            fest.status === 'active'
                              ? 'bg-green-50 text-green-600 border-green-150 hover:bg-green-100/50'
                              : 'bg-orange-50 text-orange-600 border-orange-150 hover:bg-orange-100/50'
                          }`}
                        >
                          {fest.status}
                        </button>
                        <button
                          onClick={() => togglePublish(fest)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-center border w-fit ${
                            fest.isPublished
                              ? 'bg-blue-50 text-blue-600 border-blue-150 hover:bg-blue-100/50'
                              : 'bg-gray-100 text-gray-500 border-gray-250 hover:bg-gray-200/50'
                          }`}
                        >
                          {fest.isPublished ? 'Published' : 'Hidden'}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(fest)}
                        className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg hover:bg-amber-100/50 text-xs font-bold transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(fest._id)}
                        className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg hover:bg-red-100/50 text-xs font-bold transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
