import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Plus, Edit2, Trash2, Calendar, Eye, EyeOff } from "lucide-react";

export default function AdminFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);
  
  // Form fields
  const [festivalName, setFestivalName] = useState("");
  const [festivalDate, setFestivalDate] = useState("");
  const [associatedMission, setAssociatedMission] = useState("");
  const [donationCampaign, setDonationCampaign] = useState("");
  const [donationLink, setDonationLink] = useState("");
  const [status, setStatus] = useState("active");
  const [isPublished, setIsPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminApi.getFestivals();
      if (res.success) {
        setFestivals(res.festivals || res.data || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load festivals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const handleOpenCreate = () => {
    setSelectedFestival(null);
    setFestivalName("");
    setFestivalDate("");
    setAssociatedMission("");
    setDonationCampaign("");
    setDonationLink("");
    setStatus("active");
    setIsPublished(true);
    setDisplayOrder(0);
    setModalOpen(true);
  };

  const handleOpenEdit = (f) => {
    setSelectedFestival(f);
    setFestivalName(f.festivalName || "");
    // Format date for html input yyyy-MM-dd
    const d = f.festivalDate ? new Date(f.festivalDate).toISOString().split("T")[0] : "";
    setFestivalDate(d);
    setAssociatedMission(f.associatedMission || "");
    setDonationCampaign(f.donationCampaign || "");
    setDonationLink(f.donationLink || "");
    setStatus(f.status || "active");
    setIsPublished(f.isPublished !== undefined ? f.isPublished : true);
    setDisplayOrder(f.displayOrder || 0);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      festivalName,
      festivalDate,
      associatedMission,
      donationCampaign,
      donationLink,
      status,
      isPublished,
      displayOrder: Number(displayOrder)
    };
    try {
      if (selectedFestival) {
        await adminApi.updateFestival(selectedFestival._id, data);
      } else {
        await adminApi.createFestival(data);
      }
      setModalOpen(false);
      fetchFestivals();
    } catch (err) {
      alert("Failed to save festival: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (f) => {
    try {
      setActionLoading(true);
      await adminApi.updateFestival(f._id, { ...f, isPublished: !f.isPublished });
      fetchFestivals();
    } catch (err) {
      alert("Failed to toggle visibility: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (f) => {
    setSelectedFestival(f);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await adminApi.deleteFestival(selectedFestival._id);
      setDeleteOpen(false);
      fetchFestivals();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Festival Seva Calendar"
        description="Schedule upcoming religious festivals, connect them to donation campaigns, and display display orders."
        actions={
          <button
            onClick={handleOpenCreate}
            className="bg-[#FF6600] text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-all text-xs flex items-center gap-2 shadow-sm"
          >
            <Plus size={14} /> Add Festival
          </button>
        }
      />

      {loading ? (
        <LoadingState message="Loading calendar dates..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchFestivals} />
      ) : festivals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No festival events scheduled.</div>
      ) : (
        <AdminTable headers={["Display Order", "Festival Event", "Date", "Associated Mission", "Donation Campaign", "Status", "Published", "Actions"]}>
          {festivals
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
            .map((f) => (
              <tr key={f._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-gray-400">{f.displayOrder || 0}</td>
                <td className="px-6 py-4 font-bold text-charcoal">{f.festivalName}</td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {new Date(f.festivalDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-xs text-gray-600 truncate max-w-[150px]">{f.associatedMission}</td>
                <td className="px-6 py-4 text-xs text-[#FF6600] font-bold max-w-[150px] truncate">{f.donationCampaign || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={f.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleTogglePublished(f)}
                    className={`p-1.5 rounded-xl border flex items-center gap-1 text-[10px] font-bold uppercase transition-all ${
                      f.isPublished
                        ? "bg-green-50 text-green-700 border-green-150"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                    }`}
                  >
                    {f.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{f.isPublished ? "Public" : "Hidden"}</span>
                  </button>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(f)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleOpenDelete(f)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl border border-red-100 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </td>
              </tr>
            ))}
        </AdminTable>
      )}

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedFestival ? "Edit Festival Details" : "Create New Festival Event"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Festival Name</label>
              <input
                type="text"
                value={festivalName}
                onChange={(e) => setFestivalName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Festival Date</label>
              <input
                type="date"
                value={festivalDate}
                onChange={(e) => setFestivalDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-gray-600 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Display Order (Display priority)</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Associated Mission / Seva</label>
              <input
                type="text"
                value={associatedMission}
                onChange={(e) => setAssociatedMission(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Donation Campaign Title (Optional)</label>
              <input
                type="text"
                value={donationCampaign}
                onChange={(e) => setDonationCampaign(e.target.value)}
                placeholder="e.g. Ayodhya Bhandara Seva"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Direct Donation Link (Optional override)</label>
              <input
                type="url"
                value={donationLink}
                onChange={(e) => setDonationLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Event Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-[#FF6600] focus:ring-[#FF6600]"
                />
                Publish Event Immediately
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#FF6600] hover:bg-orange-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Festival Deletion"
        message={`Are you sure you want to delete festival event "${selectedFestival?.festivalName}"? This updates the public website calendar immediately.`}
        loading={actionLoading}
      />
    </div>
  );
}
