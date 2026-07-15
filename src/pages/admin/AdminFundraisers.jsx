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
import { Eye, Edit2, Play, Pause, Check, X, Flame, ShieldAlert, Star } from "lucide-react";

export default function AdminFundraisers() {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Modals
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // Edit fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);

  // Confirmations
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchFundraisers = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, status };
      const res = await adminApi.getFundraisers(params);
      if (res.success) {
        setFundraisers(res.fundraisers);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load fundraisers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, [page, search, status]);

  const handleOpenDetail = (f) => {
    setSelectedFundraiser(f);
    setDetailOpen(true);
    setReason("");
  };

  const handleOpenEdit = (f) => {
    setSelectedFundraiser(f);
    setTitle(f.title || f.campaignTitle || "");
    setDescription(f.description || f.briefDescription || "");
    setTargetAmount(f.targetAmount || 0);
    setCategory(f.category || f.campaignCategory || "");
    setIsEmergency(f.isEmergency || false);
    setIsPublic(f.isPublic || f.visibilityPublic || true);
    setEditOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await adminApi.updateFundraiser(selectedFundraiser._id, {
        title,
        campaignTitle: title,
        description,
        briefDescription: description,
        targetAmount,
        category,
        campaignCategory: category,
        isEmergency,
        type: isEmergency ? "emergency" : "normal",
        isPublic,
        visibilityPublic: isPublic
      });
      if (res.success) {
        setEditOpen(false);
        fetchFundraisers();
      }
    } catch (err) {
      alert("Failed to edit fundraiser: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.approveFundraiser(selectedFundraiser._id);
      if (res.success) {
        setApproveOpen(false);
        setDetailOpen(false);
        fetchFundraisers();
      }
    } catch (err) {
      alert("Approval failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }
    try {
      setActionLoading(true);
      const res = await adminApi.rejectFundraiser(selectedFundraiser._id, reason);
      if (res.success) {
        setRejectOpen(false);
        setDetailOpen(false);
        fetchFundraisers();
      }
    } catch (err) {
      alert("Rejection failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (nextStatus) => {
    try {
      setActionLoading(true);
      const res = await adminApi.updateFundraiserStatus(selectedFundraiser._id, nextStatus);
      if (res.success) {
        setSelectedFundraiser({ ...selectedFundraiser, status: nextStatus });
        fetchFundraisers();
      }
    } catch (err) {
      alert("Status change failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async () => {
    const nextVal = !selectedFundraiser.isFeatured;
    try {
      setActionLoading(true);
      const res = await adminApi.featureFundraiser(selectedFundraiser._id, nextVal);
      if (res.success) {
        setSelectedFundraiser({ ...selectedFundraiser, isFeatured: nextVal });
        fetchFundraisers();
      }
    } catch (err) {
      alert("Failed to feature fundraiser: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteFundraiser(selectedFundraiser._id);
      if (res.success) {
        setDeleteOpen(false);
        setDetailOpen(false);
        fetchFundraisers();
      }
    } catch (err) {
      alert("Delete/Archive failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Fundraisers & Campaigns"
        description="Review fundraiser requests, verify targets, publish listings, and track donor participation."
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search campaign title, mobile, applicant..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved / Active</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching campaign registers..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchFundraisers} />
      ) : fundraisers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No fundraiser records.</div>
      ) : (
        <>
          <AdminTable headers={["Campaign Name", "Category", "Target", "Raised Amount", "Donors", "Status", "Actions"]}>
            {fundraisers.map((f) => (
              <tr key={f._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-charcoal truncate max-w-[200px]">{f.title || f.campaignTitle}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">By {f.applicantName} ({f.mobile})</div>
                </td>
                <td className="px-6 py-4 text-xs capitalize whitespace-nowrap">{f.category || f.campaignCategory}</td>
                <td className="px-6 py-4 font-serif font-semibold text-charcoal">₹{f.targetAmount.toLocaleString("en-IN")}</td>
                <td className="px-6 py-4 font-serif text-charcoal font-medium">₹{(f.realRaisedAmount || f.raisedAmount || 0).toLocaleString("en-IN")}</td>
                <td className="px-6 py-4 text-xs font-bold text-gray-500 whitespace-nowrap">{f.donorCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={f.status} /></td>
                <td className="px-6 py-4 text-right whitespace-nowrap flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenDetail(f)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Eye size={13} /> Review
                  </button>
                  <button
                    onClick={() => handleOpenEdit(f)}
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

      {/* Details modal */}
      <AdminModal isOpen={detailOpen} onClose={() => setDetailOpen(false)} title="Fundraiser Campaign Review">
        {selectedFundraiser && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-black text-sm text-charcoal">{selectedFundraiser.title || selectedFundraiser.campaignTitle}</h3>
              <p className="text-gray-400 text-[10px] mt-0.5">Applicant: {selectedFundraiser.applicantName} ({selectedFundraiser.mobile})</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Beneficiary Category</span>
                <span className="text-xs text-charcoal font-semibold">{selectedFundraiser.category || selectedFundraiser.campaignCategory}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Emergency Level</span>
                <span className="text-xs text-charcoal font-semibold">
                  {selectedApp => selectedFundraiser.isEmergency ? "High Priority / Emergency" : "Standard campaign"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Goal target amount</span>
                <span className="text-sm font-serif font-black text-[#FF6600]">₹{selectedFundraiser.targetAmount.toLocaleString("en-IN")}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Real raised contributions</span>
                <span className="text-sm font-serif font-black text-emerald-600">₹{(selectedFundraiser.realRaisedAmount || selectedFundraiser.raisedAmount || 0).toLocaleString("en-IN")}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Brief Background Case Description</span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{selectedFundraiser.description || selectedFundraiser.backgroundOfCase}</p>
              </div>
            </div>

            {/* Doc Proofs */}
            {selectedFundraiser.supportingDocsUrls && selectedFundraiser.supportingDocsUrls.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Supporting Case Documents</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFundraiser.supportingDocsUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl text-[10px] text-gray-600 font-bold hover:border-orange-100 uppercase"
                    >
                      Doc Proof #{i+1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Admin actions panel */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Administrative Campaign Control</span>
              
              <div className="flex flex-wrap gap-3">
                {selectedFundraiser.status === "pending" && (
                  <>
                    <button
                      onClick={() => setApproveOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1"
                    >
                      <Check size={14} /> Approve Campaign
                    </button>
                    <button
                      onClick={() => setRejectOpen(true)}
                      className="bg-red-50 hover:bg-red-100 text-red-650 font-bold py-2 px-4 rounded-xl text-xs border border-red-100 flex items-center gap-1"
                    >
                      <X size={14} /> Reject Campaign
                    </button>
                  </>
                )}

                {selectedFundraiser.status === "approved" && (
                  <button
                    onClick={() => handleToggleStatus("completed")}
                    className="bg-charcoal hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-xl text-xs"
                  >
                    Mark as Completed
                  </button>
                )}

                <button
                  onClick={handleToggleFeatured}
                  className="bg-orange-50 hover:bg-orange-100 text-[#FF6600] border border-orange-100 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1"
                >
                  <Star size={14} className={selectedFundraiser.isFeatured ? "fill-[#FF6600]" : ""} />
                  {selectedFundraiser.isFeatured ? "Unfeature from Home" : "Feature on Homepage"}
                </button>

                <button
                  onClick={() => setDeleteOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1 shadow-sm"
                >
                  Delete / Archive
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Edit modal */}
      <AdminModal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Fundraiser campaign information">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Campaign Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Brief Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Target Goal Amount (INR)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="rounded text-[#FF6600] focus:ring-[#FF6600]"
              />
              Is Emergency Campaign
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded text-[#FF6600] focus:ring-[#FF6600]"
              />
              Visible to Public
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
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
              {saving ? "Saving..." : "Save Campaign"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={approveOpen}
        onClose={() => setApproveOpen(false)}
        onConfirm={handleApprove}
        title="Approve Fundraiser"
        message={`Are you sure you want to approve "${selectedFundraiser?.title || selectedFundraiser?.campaignTitle}"? This will make the campaign public.`}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete / Archive Fundraiser"
        message={`Delete campaign "${selectedFundraiser?.title || selectedFundraiser?.campaignTitle}"? If donations have been received, the campaign will be archived/unpublished instead of permanently deleted.`}
        loading={actionLoading}
      />

      {/* Rejection reason modal */}
      <AdminModal isOpen={rejectOpen} onClose={() => setRejectOpen(false)} title="Reject Fundraiser Campaign">
        <div className="space-y-4">
          <p className="text-gray-500 text-xs">Enter rejection reason:</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Insufficient documentation details provided..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRejectOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="px-5 py-2 bg-red-650 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 disabled:opacity-50"
            >
              Reject Campaign
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
