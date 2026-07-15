import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Plus, Edit2, Lock, ShieldAlert, Key } from "lucide-react";

export default function AdminUsers() {
  const { adminUser } = useAdminAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminApi.getAdminUsers();
      if (res.success) {
        setAdmins(res.admins);
      }
    } catch (err) {
      setError(err.message || "Failed to load administrative users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminUser?.role === "superadmin") {
      fetchAdmins();
    } else {
      setError("Unauthorized access. Superadmin privileges required to view this panel.");
      setLoading(false);
    }
  }, [adminUser]);

  const handleOpenCreate = () => {
    setSelectedAdmin(null);
    setFullName("");
    setMobile("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setZone("");
    setStatus("active");
    setCreateOpen(true);
  };

  const handleOpenEdit = (adm) => {
    setSelectedAdmin(adm);
    setFullName(adm.fullName || "");
    setMobile(adm.mobile || "");
    setEmail(adm.email || "");
    setPassword("");
    setRole(adm.role || "admin");
    setZone(adm.zone || "");
    setStatus(adm.status || "active");
    setEditOpen(true);
  };

  const handleSaveCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminApi.createAdminUser({ fullName, mobile, email, password, role, zone });
      if (res.success) {
        setCreateOpen(false);
        fetchAdmins();
      }
    } catch (err) {
      alert("Failed to create admin user: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { fullName, email, role, zone, status };
    if (password.trim()) {
      data.password = password;
    }
    try {
      const res = await adminApi.updateAdminUser(selectedAdmin._id, data);
      if (res.success) {
        setEditOpen(false);
        fetchAdmins();
      }
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading administrative users list..." />;
  if (error && adminUser?.role !== "superadmin") return <ErrorState error={error} />;
  if (error) return <ErrorState error={error} onRetry={fetchAdmins} />;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admin Users & Role Control"
        description="Add new administrative personnel, change scope zones, adjust permission levels, or suspend accounts."
        actions={
          <button
            onClick={handleOpenCreate}
            className="bg-[#FF6600] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-all text-xs flex items-center gap-2 shadow-sm"
          >
            <Plus size={14} /> Add System User
          </button>
        }
      />

      <AdminTable headers={["Administrator", "Mobile", "Email", "Zone Focus", "Role Level", "Status", "Actions"]}>
        {admins.map((adm) => (
          <tr key={adm._id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4 font-bold text-charcoal">{adm.fullName}</td>
            <td className="px-6 py-4 text-xs font-mono whitespace-nowrap">{adm.mobile}</td>
            <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap lowercase">{adm.email || "N/A"}</td>
            <td className="px-6 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">{adm.zone || "All India"}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${
                adm.role === "superadmin"
                  ? "bg-red-550/10 bg-red-50 text-red-700 border-red-200"
                  : adm.role === "admin"
                  ? "bg-orange-50 text-[#FF6600] border-orange-100"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}>
                {adm.role}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={adm.status || "active"} />
            </td>
            <td className="px-6 py-4 text-right whitespace-nowrap">
              <button
                onClick={() => handleOpenEdit(adm)}
                className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1 ml-auto"
              >
                <Edit2 size={13} /> Edit Account
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* Create Modal */}
      <AdminModal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Admin User Account">
        <form onSubmit={handleSaveCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Mobile (10-digit Indian)</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                maxLength={10}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Login Password (min 8 chars)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Permission Level</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              >
                <option value="admin">Administrator (Operational CRUD)</option>
                <option value="superadmin">Superadmin (Full Access + User Control)</option>
                <option value="viewer">Viewer (Read-only access)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Assigned Zone Scope</label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="e.g. Delhi, Maharashtra, All India"
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6600] hover:bg-orange-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              {saving ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Modify Admin User Settings">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-205 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Registered Mobile (Read-Only)</label>
              <input
                type="tel"
                value={mobile}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-400 bg-gray-50/50"
                disabled
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Reset Password (leave empty to keep current)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Permission Level</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              >
                <option value="admin">Administrator</option>
                <option value="superadmin">Superadmin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Assigned Zone Focus</label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Account Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6600] hover:bg-orange-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
