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
import { Eye, Trash, Check, X, Phone, Globe, DollarSign } from "lucide-react";

export default function AdminCsrEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Modal View
  const [selectedCsr, setSelectedCsr] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Note Form
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [successNoteMsg, setSuccessNoteMsg] = useState("");

  // Actions
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, status };
      const res = await adminApi.getCsrEnquiries(params);
      if (res.success) {
        setEnquiries(res.enquiries);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load CSR enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, search, status]);

  const handleOpenDetail = (csr) => {
    setSelectedCsr(csr);
    setDetailOpen(true);
    setNote("");
    setSuccessNoteMsg("");
  };

  const handleUpdateStatus = async (nextStatus) => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateCsrStatus(selectedCsr._id, nextStatus);
      if (res.success) {
        setSelectedCsr(res.csr);
        fetchEnquiries();
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
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
      const res = await adminApi.addCsrNote(selectedCsr._id, note);
      if (res.success) {
        setSelectedCsr({ ...selectedCsr, notes: res.notes });
        setSuccessNoteMsg("Follow-up note recorded.");
        setNote("");
      }
    } catch (err) {
      alert("Failed to save note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteCsrEnquiry(selectedCsr._id);
      if (res.success) {
        setDeleteOpen(false);
        setDetailOpen(false);
        fetchEnquiries();
      }
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Corporate CSR Partnership Enquiries"
        description="Manage organization profiles, track proposals and budget negotiations, and add follow-up notes."
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search organization, location, industry..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="new">New Proposal</option>
          <option value="contacted">Contacted</option>
          <option value="meeting-scheduled">Meeting Scheduled</option>
          <option value="proposal-sent">Proposal Sent</option>
          <option value="in-negotiation">In-Negotiation</option>
          <option value="approved">Approved</option>
          <option value="closed">Closed</option>
          <option value="not-interested">Not Interested</option>
        </select>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching CSR enquiry ledger..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchEnquiries} />
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No matching CSR enquiries.</div>
      ) : (
        <>
          <AdminTable headers={["Organization", "Contact Person", "Industry", "Location", "Budget / Pref", "Status", "Actions"]}>
            {enquiries.map((e) => (
              <tr key={e._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-charcoal">{e.organizationName}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-charcoal">{e.contactPersonName}</div>
                  <div className="text-gray-400 text-[10px] truncate max-w-[120px]">{e.emailId}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600 whitespace-nowrap">{e.industryType}</td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                  {e.companyLocation} {e.isPanIndia ? "(Pan-India)" : ""}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-700 whitespace-nowrap">
                  {e.contributionRange || `${e.minCustomAmount || 0} - ${e.maxCustomAmount || 0}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={e.status || "new"} /></td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetail(e)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> Open
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
        title="CSR Collaboration Proposal"
      >
        {selectedCsr && (
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-sm text-charcoal">{selectedCsr.organizationName}</h3>
                <p className="text-gray-400 text-[10px] mt-0.5">Submitted: {new Date(selectedCsr.createdAt).toLocaleString()}</p>
              </div>
              <StatusBadge status={selectedCsr.status || "new"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Contact Person</span>
                <span className="text-xs text-charcoal font-semibold">{selectedCsr.contactPersonName} ({selectedCsr.designation})</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Mobile & Website</span>
                <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1"><Phone size={12} /> {selectedCsr.mobileNumber}</span>
                  {selectedCsr.companyWebsite && (
                    <a href={selectedCsr.companyWebsite} target="_blank" rel="noreferrer" className="text-[#FF6600] hover:underline flex items-center gap-1">
                      <Globe size={12} /> Website
                    </a>
                  )}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Industry & Location</span>
                <span className="text-xs text-gray-600">{selectedCsr.industryType} ({selectedCsr.companyLocation})</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Budget contribution</span>
                <span className="text-xs text-gray-600 font-semibold">{selectedCsr.contributionRange || `${selectedCsr.minCustomAmount} - ${selectedCsr.maxCustomAmount}`}</span>
              </div>
              
              {selectedCsr.focusAreas && selectedCsr.focusAreas.length > 0 && (
                <div className="md:col-span-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">Interested Focus Areas</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCsr.focusAreas.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] text-gray-500 font-bold capitalize">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCsr.proposal && (
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">Collaboration Proposal Statement</span>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedCsr.proposal}</p>
                </div>
              )}
            </div>

            {/* Quick Status Modifiers */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("contacted")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Mark Contacted
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("meeting-scheduled")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Schedule Meeting
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("proposal-sent")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Proposal Sent
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("in-negotiation")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                In Negotiation
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("approved")}
                className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-xl text-[10px] font-bold uppercase"
              >
                Approve Partner
              </button>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl border border-red-150 text-[10px] font-bold uppercase ml-auto"
              >
                Delete Query
              </button>
            </div>

            {/* Follow-up Notes Section */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Internal Follow-up logs</span>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                {selectedCsr.notes?.length === 0 ? (
                  <div className="text-gray-400 text-xs italic text-center p-2">No follow-up logs yet.</div>
                ) : (
                  selectedCsr.notes?.map((n, i) => (
                    <div key={i} className="text-xs pb-2 border-b border-gray-150 last:border-b-0">
                      <div className="flex justify-between font-bold text-[10px] text-gray-500">
                        <span>{n.author}</span>
                        <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-charcoal mt-1 leading-normal">{n.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              {successNoteMsg && <p className="mb-2 text-emerald-600 text-xs font-bold">{successNoteMsg}</p>}
              <form onSubmit={handleSaveNote} className="flex gap-3">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Record meeting outcomes or next steps..."
                  className="flex-grow px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={savingNote}
                  className="bg-charcoal text-white font-bold py-2 px-5 rounded-xl text-xs hover:bg-gray-800 disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Add Note"}
                </button>
              </form>
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Proposal Removal"
        message="Are you sure you want to permanently delete this corporate CSR enquiry?"
        loading={actionLoading}
      />
    </div>
  );
}
