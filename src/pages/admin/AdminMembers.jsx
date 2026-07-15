import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminFilters from "../../components/admin/AdminFilters";
import AdminModal from "../../components/admin/AdminModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Eye, Edit2, Lock, UserX, UserCheck, Download, Plus } from "lucide-react";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [zone, setZone] = useState("");
  const [page, setPage] = useState(1);

  // Details & Edit Modals
  const [selectedMember, setSelectedMember] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  // Edit Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete & Suspend Confirm
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, category, zone };
      const res = await adminApi.getMembers(params);
      if (res.success) {
        setMembers(res.members);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch approved members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, search, category, zone]);

  const handleExportCsv = () => {
    const q = new URLSearchParams({ search, category, zone, exportCsv: "true" }).toString();
    window.open(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/members?${q}&Authorization=Bearer ${localStorage.getItem("admin_token")}`, "_blank");
  };

  const handleOpenDetail = (member) => {
    setSelectedMember(member);
    setDetailOpen(true);
  };

  const handleOpenEdit = (member) => {
    setSelectedMember(member);
    setFullName(member.fullName || "");
    setEmail(member.email || "");
    setState(member.state || "");
    setDistrict(member.district || "");
    setCity(member.city || "");
    setLevel(member.level || "");
    setEditOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await adminApi.updateMember(selectedMember._id, {
        fullName,
        email,
        state,
        district,
        city,
        level
      });
      if (res.success) {
        setEditOpen(false);
        fetchMembers();
      }
    } catch (err) {
      alert("Edit failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    const newPass = prompt("Enter new password for member (min 8 characters):");
    if (!newPass) return;
    if (newPass.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    try {
      setActionLoading(true);
      // Change using updateAdminUser or standard admin API
      // Since it's a member, let's call the status/password reset endpoint if available,
      // or we can update the User password through User updates.
      // Wait, let's look at the users collection matching this mobile.
      const usersRes = await adminApi.getAdminUsers();
      const matchedUser = usersRes.admins.find(u => u.mobile === selectedMember.mobile);
      if (!matchedUser) {
        alert("This member does not have an active login account (User model record).");
        return;
      }
      const res = await adminApi.updateAdminUser(matchedUser._id, { password: newPass });
      if (res.success) {
        alert("Member password reset successfully.");
      }
    } catch (err) {
      alert("Failed to reset password: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuspendMember = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateMemberStatus(selectedMember._id, "suspended");
      if (res.success) {
        setSuspendOpen(false);
        setDetailOpen(false);
        fetchMembers();
      }
    } catch (err) {
      alert("Suspension failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivateMember = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateMemberStatus(selectedMember._id, "active");
      if (res.success) {
        setReactivateOpen(false);
        setDetailOpen(false);
        fetchMembers();
      }
    } catch (err) {
      alert("Reactivation failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleArchiveMember = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteMember(selectedMember._id);
      if (res.success) {
        setArchiveOpen(false);
        setDetailOpen(false);
        fetchMembers();
      }
    } catch (err) {
      alert("Archival failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Registered Approved Members"
        description="Verify fully onboarded active members, view ID cards, edit zones, suspend, or reactivate accounts."
        actions={
          <button
            onClick={handleExportCsv}
            className="bg-[#FF6600] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-all text-xs flex items-center gap-2 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search name, mobile, member ID..." />
        
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Categories</option>
          <option value="sanatani-sena">Sanatani Sena</option>
          <option value="active-member">Active Member</option>
          <option value="vigilance">Vigilance</option>
          <option value="seva-network">Seva Network</option>
          <option value="patron">Patron</option>
        </select>

        <input
          type="text"
          value={zone}
          onChange={(e) => { setZone(e.target.value); setPage(1); }}
          placeholder="Filter state or zone..."
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-semibold text-gray-600 shadow-sm"
        />
      </AdminFilters>

      {loading ? (
        <LoadingState message="Loading approved member list..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchMembers} />
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No onboarded members found matching filters.</div>
      ) : (
        <>
          <AdminTable headers={["Member ID", "Full Name", "Category", "Contact Info", "Location", "Actions"]}>
            {members.map((m) => (
              <tr key={m._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[#FF6600] whitespace-nowrap">{m.memberId || "PENDING"}</td>
                <td className="px-6 py-4 font-bold text-charcoal">{m.fullName}</td>
                <td className="px-6 py-4 text-xs capitalize whitespace-nowrap">{m.category?.replace("-", " ")}</td>
                <td className="px-6 py-4 text-xs whitespace-nowrap">
                  <div>{m.mobile}</div>
                  <div className="text-gray-400 text-[10px] lowercase truncate max-w-[120px]">{m.email}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{m.city}, {m.state}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenDetail(m)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </AdminTable>

          <AdminPagination
            currentPage={page}
            totalPages={pages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}

      {/* Member Details Modal */}
      <AdminModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Member Profile Overview"
      >
        {selectedMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                {selectedMember.photoUrl ? (
                  <img src={selectedMember.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif font-black text-2xl text-[#FF6600]">
                    {selectedMember.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif font-black text-base text-charcoal">{selectedMember.fullName}</h3>
                <span className="font-mono text-[11px] font-bold text-[#FF6600] tracking-wide block mt-0.5">
                  ID: {selectedMember.memberId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Mobile Contact</span>
                <span className="text-xs text-gray-600 font-bold">{selectedMember.mobile}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Email Address</span>
                <span className="text-xs text-gray-600 lowercase">{selectedMember.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Date of Birth</span>
                <span className="text-xs text-gray-600">
                  {selectedMember.dob ? new Date(selectedMember.dob).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Gender</span>
                <span className="text-xs text-gray-600 capitalize">{selectedMember.gender}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Occupation</span>
                <span className="text-xs text-gray-600">{selectedMember.occupation}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Membership Category</span>
                <span className="text-xs text-gray-600 capitalize">{selectedMember.category.replace("-", " ")}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Coordinator level</span>
                <span className="text-xs text-gray-600 capitalize">{selectedMember.level}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Registration Fee Paid</span>
                <span className="text-xs text-gray-600 font-bold">₹{selectedMember.amount}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Complete Address</span>
                <span className="text-xs text-gray-600">
                  {selectedMember.completeAddress || "N/A"} (Pincode: {selectedMember.pincode || "N/A"})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">State & City</span>
                <span className="text-xs text-gray-600">{selectedMember.city}, {selectedMember.state}</span>
              </div>
            </div>

            {/* Document Links */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4">
              {selectedMember.idProofUrl && (
                <a
                  href={selectedMember.idProofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider"
                >
                  View Identity Proof Doc
                </a>
              )}
              {selectedMember.idCardUrl && (
                <a
                  href={selectedMember.idCardUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-orange-50 border border-orange-100 text-[10px] font-bold text-[#FF6600] uppercase tracking-wider"
                >
                  Open PDF Member ID Card
                </a>
              )}
            </div>

            {/* Admin Management Actions */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleResetPassword}
                className="bg-charcoal hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Lock size={14} /> Reset Passwords
              </button>

              <button
                type="button"
                onClick={() => setArchiveOpen(true)}
                className="bg-red-50 hover:bg-red-100 text-red-650 text-red-600 font-bold py-2.5 px-4 rounded-xl text-xs border border-red-100 flex items-center gap-1.5 transition-all"
              >
                <UserX size={14} /> Archive / Delete
              </button>

              <button
                type="button"
                onClick={() => setSuspendOpen(true)}
                className="bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2.5 px-4 rounded-xl text-xs border border-yellow-200 text-yellow-750 flex items-center gap-1.5 transition-all"
              >
                <UserX size={14} /> Suspend Member
              </button>

              <button
                type="button"
                onClick={() => setReactivateOpen(true)}
                className="bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2.5 px-4 rounded-xl text-xs border border-green-150 flex items-center gap-1.5 transition-all"
              >
                <UserCheck size={14} /> Reactivate Member
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Member edit modal */}
      <AdminModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Member Information"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Level / Designation</label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
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
              className="px-5 py-2 bg-charcoal text-white rounded-xl text-xs font-bold hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Edits"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        onConfirm={handleArchiveMember}
        title="Confirm Archival / Deletion"
        message={`Are you sure you want to archive or permanently delete member ${selectedMember?.fullName}? Archiving is automatic if financial or campaign history exists.`}
        loading={actionLoading}
      />
      
      <ConfirmDialog
        isOpen={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        onConfirm={handleSuspendMember}
        title="Suspend Member Account"
        message={`Are you sure you want to suspend member ${selectedMember?.fullName}? Suspended accounts cannot log in to the portal.`}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={reactivateOpen}
        onClose={() => setReactivateOpen(false)}
        onConfirm={handleReactivateMember}
        title="Reactivate Member Account"
        message={`Reactivate member ${selectedMember?.fullName}? This restores full login capability to the portal.`}
        loading={actionLoading}
      />
    </div>
  );
}
