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
import { Eye, Check, X, ShieldAlert, MessageSquare, ClipboardList, Trash } from "lucide-react";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Detail Modal & Assign Form
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [adminsList, setAdminsList] = useState([]);
  const [assigneeId, setAssigneeId] = useState("");
  
  // Note Form
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [successNoteMsg, setSuccessNoteMsg] = useState("");

  // Resolution Form
  const [resolutionMsg, setResolutionMsg] = useState("");
  const [resolving, setResolving] = useState(false);

  // Archive Confirm
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, status };
      const res = await adminApi.getComplaints(params);
      if (res.success) {
        setComplaints(res.complaints);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await adminApi.getAdminUsers();
      if (res.success) {
        setAdminsList(res.admins);
      }
    } catch (err) {
      console.error("Failed to load admin user list:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAdmins();
  }, [page, search, status]);

  const handleOpenDetail = (c) => {
    setSelectedComplaint(c);
    setDetailOpen(true);
    setNote("");
    setSuccessNoteMsg("");
    setResolutionMsg("");
    setAssigneeId(c.assignedTo?._id || "");
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const res = await adminApi.assignComplaint(selectedComplaint._id, assigneeId);
      if (res.success) {
        setSelectedComplaint(res.complaint);
        fetchComplaints();
      }
    } catch (err) {
      alert("Failed to assign ticket: " + err.message);
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
      const res = await adminApi.addComplaintNote(selectedComplaint._id, note);
      if (res.success) {
        setSelectedComplaint({ ...selectedComplaint, notes: res.notes });
        setSuccessNoteMsg("Private internal note saved successfully.");
        setNote("");
      }
    } catch (err) {
      alert("Failed to save note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleUpdateStatus = async (nextStatus) => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateComplaintStatus(selectedComplaint._id, nextStatus);
      if (res.success) {
        setSelectedComplaint(res.complaint);
        fetchComplaints();
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolve = async (e) => {
    e.preventDefault();
    if (!resolutionMsg.trim()) return;
    try {
      setResolving(true);
      // Record resolution as note, then resolve ticket
      await adminApi.addComplaintNote(selectedComplaint._id, `RESOLUTION RECORDED: ${resolutionMsg}`);
      const res = await adminApi.updateComplaintStatus(selectedComplaint._id, "resolved");
      if (res.success) {
        setSelectedComplaint(res.complaint);
        setResolutionMsg("");
        fetchComplaints();
      }
    } catch (err) {
      alert("Resolution check failed: " + err.message);
    } finally {
      setResolving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteComplaint(selectedComplaint._id);
      if (res.success) {
        setDeleteOpen(false);
        setDetailOpen(false);
        fetchComplaints();
      }
    } catch (err) {
      alert("Failed to remove complaint: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Public Complaints & Grievance Tickets"
        description="Review submitted citizen complaints, assign team members to investigate, record notes, and write resolution logs."
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search ticket ID, name, description..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="pending">Pending</option>
          <option value="investigating">Investigating</option>
          <option value="in-review">In-Review</option>
          <option value="assigned">Assigned</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
          <option value="rejected">Rejected</option>
        </select>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching grievance tickets..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchComplaints} />
      ) : complaints.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No complaints found matching filters.</div>
      ) : (
        <>
          <AdminTable headers={["Ticket ID", "fullName", "Category", "Assigned To", "Date", "Status", "Actions"]}>
            {complaints.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[#FF6600] whitespace-nowrap">{c.ticketId}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-charcoal">{c.fullName}</div>
                  <div className="text-gray-400 text-[10px]">{c.mobile}</div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">{c.category}</td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{c.assignedTo?.fullName || "Unassigned"}</td>
                <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={c.status} /></td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetail(c)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> Investigate
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

      {/* Complaint Detail Modal */}
      <AdminModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Citizen Grievance Investigation"
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-mono font-black text-sm text-[#FF6600]">{selectedComplaint.ticketId}</h3>
                <p className="text-gray-400 text-[10px] mt-0.5">Submitted: {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
              </div>
              <StatusBadge status={selectedComplaint.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Grievance category</span>
                <span className="text-xs text-charcoal font-semibold">{selectedComplaint.category}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Complainant Contact</span>
                <span className="text-xs text-charcoal font-semibold">{selectedComplaint.fullName} ({selectedComplaint.mobile})</span>
              </div>
              {selectedComplaint.dateOfIncident && (
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Date of Incident</span>
                  <span className="text-xs text-gray-600">{new Date(selectedComplaint.dateOfIncident).toLocaleDateString()}</span>
                </div>
              )}
              {selectedComplaint.evidenceUrl && (
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Evidence Attachment</span>
                  <a
                    href={selectedComplaint.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1 mt-1"
                  >
                    Open Document File
                  </a>
                </div>
              )}
              <div className="md:col-span-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Grievance Description Statement</span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{selectedComplaint.description}</p>
              </div>
            </div>

            {/* Assign Form */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Assign Investigation Owner</span>
              <form onSubmit={handleAssign} className="flex gap-3">
                <select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                >
                  <option value="">Choose Administrator...</option>
                  {adminsList.map((a) => (
                    <option key={a._id} value={a._id}>{a.fullName} ({a.role})</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-charcoal text-white font-bold py-2 px-5 rounded-xl text-xs hover:bg-gray-800 disabled:opacity-50 shadow-sm"
                >
                  Assign Owner
                </button>
              </form>
            </div>

            {/* Resolution Form */}
            {selectedComplaint.status !== "resolved" && selectedComplaint.status !== "closed" && (
              <div className="pt-6 border-t border-gray-100">
                <span className="text-[10px] font-extrabold text-[#FF6600] uppercase tracking-widest block mb-2">Log Grievance Resolution</span>
                <form onSubmit={handleResolve} className="space-y-3">
                  <textarea
                    value={resolutionMsg}
                    onChange={(e) => setResolutionMsg(e.target.value)}
                    placeholder="Enter concrete resolution log, action details..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
                    rows={3}
                    required
                  />
                  <button
                    type="submit"
                    disabled={resolving}
                    className="bg-[#FF6600] hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-sm transition-all disabled:opacity-50"
                  >
                    {resolving ? "Resolving..." : "Mark as Resolved"}
                  </button>
                </form>
              </div>
            )}

            {/* Quick Status and Archive button */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("investigating")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Mark Investigating
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("in-review")}
                className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 text-[10px] font-bold text-gray-600 uppercase"
              >
                Mark In-Review
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
                onClick={() => setDeleteOpen(true)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl border border-red-150 text-[10px] font-bold uppercase ml-auto"
              >
                Archive ticket
              </button>
            </div>

            {/* Notes Section */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Internal Private Investigation Logs</span>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                {selectedComplaint.notes?.length === 0 ? (
                  <div className="text-gray-400 text-xs italic text-center p-2">No internal logs added yet.</div>
                ) : (
                  selectedComplaint.notes?.map((n, i) => (
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
                  placeholder="Record investigation status privately..."
                  className="flex-grow px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={savingNote}
                  className="bg-charcoal text-white font-bold py-2 px-5 rounded-xl text-xs hover:bg-gray-800 disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Save Log"}
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
        title="Confirm Ticket Removal"
        message={`Are you sure you want to archive or permanently delete this complaint ticket? Closed or resolved tickets will be safely archived instead of hard deleted.`}
        loading={actionLoading}
      />
    </div>
  );
}
