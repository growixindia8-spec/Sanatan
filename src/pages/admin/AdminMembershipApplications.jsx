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
import { Eye, Check, X, FileText, IndianRupee, MessageSquare, Download } from "lucide-react";

export default function AdminMembershipApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters & Tabs
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("pending"); // 'pending', 'approved', 'rejected'
  const [page, setPage] = useState(1);

  // Modals
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
  const [rejectConfirmOpen, setRejectConfirmOpen] = useState(false);
  const [correctionConfirmOpen, setCorrectionConfirmOpen] = useState(false);
  
  // Note Form
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [successNoteMsg, setSuccessNoteMsg] = useState("");

  // Action variables
  const [reason, setReason] = useState("");
  const [correctionMessage, setCorrectionMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, status: statusTab };
      const res = await adminApi.getMembershipApplications(params);
      if (res.success) {
        setApplications(res.applications);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, search, statusTab]);

  const handleExportCsv = () => {
    const q = new URLSearchParams({ search, status: statusTab, exportCsv: "true" }).toString();
    window.open(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/membership-applications?${q}&Authorization=Bearer ${localStorage.getItem("admin_token")}`, "_blank");
  };

  const handleOpenDetail = (app) => {
    setSelectedApp(app);
    setDetailOpen(true);
    setNote("");
    setSuccessNoteMsg("");
    setReason("");
    setCorrectionMessage("");
  };

  const handleApprove = async () => {
    if (selectedApp.paymentStatus !== "paid") {
      alert("Verification Safety Check: This application has a pending payment status. You cannot approve unpaid members.");
      setApproveConfirmOpen(false);
      return;
    }
    try {
      setActionLoading(true);
      const res = await adminApi.approveMembership(selectedApp._id);
      if (res.success) {
        setApproveConfirmOpen(false);
        setDetailOpen(false);
        fetchApplications();
      }
    } catch (err) {
      alert("Approval failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please specify a reason for rejecting this application.");
      return;
    }
    try {
      setActionLoading(true);
      const res = await adminApi.rejectMembership(selectedApp._id, reason);
      if (res.success) {
        setRejectConfirmOpen(false);
        setDetailOpen(false);
        fetchApplications();
      }
    } catch (err) {
      alert("Rejection failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCorrection = async () => {
    if (!correctionMessage.trim()) {
      alert("Please enter details about what corrections are required.");
      return;
    }
    try {
      setActionLoading(true);
      const res = await adminApi.requestMembershipCorrection(selectedApp._id, correctionMessage);
      if (res.success) {
        setCorrectionConfirmOpen(false);
        setDetailOpen(false);
        fetchApplications();
      }
    } catch (err) {
      alert("Correction request failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    try {
      setSavingNote(true);
      setSuccessNoteMsg("");
      const res = await adminApi.addMembershipNote(selectedApp._id, note);
      if (res.success) {
        setSuccessNoteMsg("Internal admin note saved.");
        setNote("");
      }
    } catch (err) {
      alert("Failed to save note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleTogglePaymentStatus = async () => {
    const nextStatus = selectedApp.paymentStatus === "paid" ? "pending" : "paid";
    const confirm = window.confirm(`Update payment status of application to ${nextStatus.toUpperCase()}?`);
    if (!confirm) return;
    try {
      setActionLoading(true);
      const res = await adminApi.updateMembershipPaymentStatus(selectedApp._id, nextStatus);
      if (res.success) {
        setSelectedApp(res.member);
        fetchApplications();
      }
    } catch (err) {
      alert("Failed to update payment status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Membership Applications"
        description="Verify pending state registrations, inspect identity proof documents, check payment status, and approve/reject applications."
        actions={
          <button
            onClick={handleExportCsv}
            className="bg-[#FF6600] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-all text-xs flex items-center gap-2 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-2 mb-6">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setStatusTab(tab); setPage(1); }}
            className={`py-3 px-6 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
              statusTab === tab
                ? "border-[#FF6600] text-[#FF6600]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab} Applications
          </button>
        ))}
      </div>

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search name, mobile, app number..." />
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching membership applications..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchApplications} />
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No applications found in this tab.</div>
      ) : (
        <>
          <AdminTable headers={["App Number", "Applicant", "Category", "Payment Info", "Date", "Actions"]}>
            {applications.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[#FF6600] whitespace-nowrap">{a.applicationNumber || "PENDING"}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-charcoal">{a.fullName}</div>
                  <div className="text-gray-400 text-[10px]">{a.mobile}</div>
                </td>
                <td className="px-6 py-4 text-xs capitalize whitespace-nowrap">{a.category?.replace("-", " ")}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full ${a.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className="text-xs font-bold text-gray-600 capitalize">{a.paymentStatus}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">₹{a.amount || a.totalAmountPaid || 0}</div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                  {new Date(a.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetail(a)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> View Details
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

      {/* Detail Modal */}
      <AdminModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Membership Application Review"
      >
        {selectedApp && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                {selectedApp.photoUrl ? (
                  <img src={selectedApp.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif font-black text-2xl text-[#FF6600]">
                    {selectedApp.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif font-black text-base text-charcoal">{selectedApp.fullName}</h3>
                <span className="font-mono text-[10px] font-bold text-[#FF6600] tracking-wide block mt-0.5">
                  App No: {selectedApp.applicationNumber || "Pending generation"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Contact Mobile</span>
                <span className="text-xs text-gray-600 font-bold">{selectedApp.mobile}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Email ID</span>
                <span className="text-xs text-gray-600 lowercase">{selectedApp.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">State / District / City</span>
                <span className="text-xs text-gray-600">{selectedApp.city}, {selectedApp.district}, {selectedApp.state}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Date of Birth / Gender</span>
                <span className="text-xs text-gray-600">
                  {selectedApp.dob ? new Date(selectedApp.dob).toLocaleDateString() : "N/A"} ({selectedApp.gender})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Category & Level</span>
                <span className="text-xs text-gray-600 font-bold capitalize">{selectedApp.category.replace("-", " ")} ({selectedApp.level})</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Payment Status & Fee</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    selectedApp.paymentStatus === "paid" ? "bg-green-50 text-green-700 border-green-150" : "bg-red-50 text-red-750 border-red-100"
                  }`}>
                    {selectedApp.paymentStatus}
                  </span>
                  <span className="text-xs font-bold text-gray-600">₹{selectedApp.amount || selectedApp.totalAmountPaid || 0}</span>
                </div>
              </div>
              
              {selectedApp.message && (
                <div className="md:col-span-2 bg-orange-50 border border-orange-100 p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold text-[#FF6600] uppercase tracking-widest block mb-1">Status Message / Rejection Log</span>
                  <p className="text-xs text-charcoal font-semibold leading-relaxed">{selectedApp.message}</p>
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-3">Uploaded Identity Verification Documents</span>
              <div className="flex flex-wrap gap-4">
                {selectedApp.idProofUrl && (
                  <a
                    href={selectedApp.idProofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1"
                  >
                    <FileText size={14} /> Identity Proof PDF / Image
                  </a>
                )}
                {selectedApp.identityVerification?.aadhaarFrontUrl && (
                  <a
                    href={selectedApp.identityVerification.aadhaarFrontUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1"
                  >
                    <FileText size={14} /> Aadhaar Card Front
                  </a>
                )}
                {selectedApp.identityVerification?.aadhaarBackUrl && (
                  <a
                    href={selectedApp.identityVerification.aadhaarBackUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1"
                  >
                    <FileText size={14} /> Aadhaar Card Back
                  </a>
                )}
              </div>
            </div>

            {/* Verification Status Updates */}
            {statusTab === "pending" && (
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Administrative Decision Panel</span>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setApproveConfirmOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Check size={14} /> Approve Registration
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setCorrectionConfirmOpen(true)}
                    className="bg-amber-50 hover:bg-amber-100 text-yellow-800 text-amber-700 font-bold py-2.5 px-5 rounded-xl text-xs border border-yellow-200 flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare size={14} /> Request Correction
                  </button>

                  <button
                    type="button"
                    onClick={() => setRejectConfirmOpen(true)}
                    className="bg-red-50 hover:bg-red-100 text-red-750 border-red-100 border text-red-650 font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <X size={14} /> Reject Candidate
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleTogglePaymentStatus}
                    className="bg-charcoal hover:bg-gray-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <IndianRupee size={14} /> Mark Payment {selectedApp.paymentStatus === "paid" ? "Pending" : "Paid"}
                  </button>
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Add Admin Notes</span>
              {successNoteMsg && <p className="mb-2 text-emerald-600 text-xs font-bold">{successNoteMsg}</p>}
              <form onSubmit={handleSaveNote} className="flex gap-3">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Record interview date, verification notes..."
                  className="flex-grow px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={savingNote}
                  className="bg-charcoal text-white font-bold py-2 px-4 rounded-xl text-xs hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Save Note"}
                </button>
              </form>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Action Dialogs */}
      <ConfirmDialog
        isOpen={approveConfirmOpen}
        onClose={() => setApproveConfirmOpen(false)}
        onConfirm={handleApprove}
        title="Approve Candidate Registration"
        message={`Are you sure you want to approve ${selectedApp?.fullName}? This generates a unique member ID and enables portal account access.`}
        loading={actionLoading}
      />

      {/* Reject Dialog */}
      <AdminModal isOpen={rejectConfirmOpen} onClose={() => setRejectConfirmOpen(false)} title="Reject Application Reason">
        <div className="space-y-4">
          <p className="text-gray-500 text-xs">Please provide the rejection reason to send to candidate email/portal:</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Identity documents mismatch, verification code check failed..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRejectConfirmOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              Reject Application
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Correction Dialog */}
      <AdminModal isOpen={correctionConfirmOpen} onClose={() => setCorrectionConfirmOpen(false)} title="Correction Request Details">
        <div className="space-y-4">
          <p className="text-gray-500 text-xs">Enter specific details about what fields/documents the candidate needs to update:</p>
          <textarea
            value={correctionMessage}
            onChange={(e) => setCorrectionMessage(e.target.value)}
            placeholder="Aadhaar selfie is blurred. Please upload a clear photo..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setCorrectionConfirmOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCorrection}
              disabled={actionLoading}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              Send Request
            </button>
          </div>
        </div>
      </AdminModal>

    </div>
  );
}
