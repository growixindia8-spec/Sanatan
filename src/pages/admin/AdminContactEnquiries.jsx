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
import { Eye, Copy, Trash, MessageCircle, AlertTriangle } from "lucide-react";

export default function AdminContactEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
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
      const res = await adminApi.getContactEnquiries(params);
      if (res.success) {
        setEnquiries(res.enquiries);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load contact enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, search, status]);

  const handleOpenDetail = async (e) => {
    setSelectedEnquiry(e);
    setDetailOpen(true);
    setNote("");
    setSuccessNoteMsg("");

    // Mark as read automatically when opened if it's new
    if (e.status === "new") {
      try {
        await adminApi.updateContactStatus(e._id, "read");
        fetchEnquiries();
      } catch (err) {
        console.error("Failed to update status to read:", err);
      }
    }
  };

  const handleUpdateStatus = async (nextStatus) => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateContactStatus(selectedEnquiry._id, nextStatus);
      if (res.success) {
        setSelectedEnquiry(res.contact);
        fetchEnquiries();
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNote = async (ev) => {
    ev.preventDefault();
    if (!note.trim()) return;
    try {
      setSavingNote(true);
      setSuccessNoteMsg("");
      const res = await adminApi.addContactNote(selectedEnquiry._id, note);
      if (res.success) {
        setSelectedEnquiry({ ...selectedEnquiry, notes: res.notes });
        setSuccessNoteMsg("Reply note recorded.");
        setNote("");
        // Mark status as replied if it's read/new
        if (selectedEnquiry.status !== "replied") {
          await adminApi.updateContactStatus(selectedEnquiry._id, "replied");
          fetchEnquiries();
        }
      }
    } catch (err) {
      alert("Failed to save note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteContactEnquiry(selectedEnquiry._id);
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
        title="Public Website Contact Messages"
        description="View generic website enquiries, manage responses, and archive spam or closed discussions."
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search name, email, subject..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="new">New / Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
          <option value="spam">Spam / Blocked</option>
        </select>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching public inbox..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchEnquiries} />
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No contact queries found.</div>
      ) : (
        <>
          <AdminTable headers={["Sender", "Subject", "Message Snippet", "Date", "Status", "Actions"]}>
            {enquiries.map((e) => (
              <tr key={e._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-charcoal">{e.fullName}</div>
                  <div className="text-gray-400 text-[10px] truncate max-w-[120px]">{e.email}</div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-gray-600 truncate max-w-[150px]">{e.subject}</td>
                <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-[200px]">{e.message}</td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={e.status || "new"} /></td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetail(e)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> Open Inbox
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

      {/* Enquiry details modal */}
      <AdminModal isOpen={detailOpen} onClose={() => setDetailOpen(false)} title="Contact Message Review">
        {selectedEnquiry && (
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-sm text-charcoal">{selectedEnquiry.fullName}</h3>
                <p className="text-gray-400 text-[10px] mt-0.5">Mobile: {selectedEnquiry.mobile} • Email: {selectedEnquiry.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(selectedEnquiry.email)}
                  className="p-2 bg-gray-550/10 hover:bg-gray-50 text-gray-500 rounded-xl border border-gray-150 text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <Copy size={12} /> Email
                </button>
                <button
                  onClick={() => handleCopy(selectedEnquiry.mobile)}
                  className="p-2 bg-gray-550/10 hover:bg-gray-50 text-gray-500 rounded-xl border border-gray-150 text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <Copy size={12} /> Phone
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">Subject Header</span>
              <h4 className="text-xs font-bold text-charcoal">{selectedEnquiry.subject}</h4>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1.5">Submitted Inquiry Message</span>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedEnquiry.message}</p>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("read")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Mark Read
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("closed")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Mark Closed
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("spam")}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl border border-red-150 text-[10px] font-bold uppercase"
              >
                Mark Spam
              </button>
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold uppercase ml-auto flex items-center gap-1 shadow-sm"
              >
                <Trash size={12} /> Delete / Archive
              </button>
            </div>

            {/* Follow-up Notes Section */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Reply / Follow-up Notes Log</span>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                {selectedEnquiry.notes?.length === 0 ? (
                  <div className="text-gray-400 text-xs italic text-center p-2">No follow-up notes recorded.</div>
                ) : (
                  selectedEnquiry.notes?.map((n, i) => (
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
                  placeholder="Record call discussion details..."
                  className="flex-grow px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={savingNote}
                  className="bg-charcoal text-white font-bold py-2 px-5 rounded-xl text-xs hover:bg-gray-800 disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Add Log"}
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
        title="Confirm Inbox Removal"
        message="Are you sure you want to permanently delete this citizen query?"
        loading={actionLoading}
      />
    </div>
  );
}
