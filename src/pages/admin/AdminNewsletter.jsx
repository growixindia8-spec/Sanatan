import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminFilters from "../../components/admin/AdminFilters";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Download, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Dialogs
  const [selectedSub, setSelectedSub] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 10, search, status };
      const res = await adminApi.getNewsletterSubscribers(params);
      if (res.success) {
        setSubscribers(res.subscribers);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load newsletter subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, search, status]);

  const handleExportCsv = () => {
    const q = new URLSearchParams({ search, status, exportCsv: "true" }).toString();
    window.open(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/newsletter/subscribers?${q}&Authorization=Bearer ${localStorage.getItem("admin_token")}`, "_blank");
  };

  const handleToggleSubscription = async (sub) => {
    const nextStatus = sub.status === "active" ? "unsubscribed" : "active";
    try {
      setActionLoading(true);
      const res = await adminApi.updateNewsletterStatus(sub._id, nextStatus);
      if (res.success) {
        fetchSubscribers();
      }
    } catch (err) {
      alert("Failed to toggle subscription status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (sub) => {
    setSelectedSub(sub);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const res = await adminApi.deleteNewsletterSubscriber(selectedSub._id);
      if (res.success) {
        setDeleteOpen(false);
        fetchSubscribers();
      }
    } catch (err) {
      alert("Failed to delete record: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Newsletter Subscribers list"
        description="Monitor community mailing lists, unsubscribe contacts manually, and export CSV listings."
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
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search email address..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="active">Active Subscribers</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Fetching email addresses..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchSubscribers} />
      ) : subscribers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No newsletter subscribers found.</div>
      ) : (
        <>
          <AdminTable headers={["Email Address", "Subscription Date", "Status", "Actions"]}>
            {subscribers.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-charcoal">{s.email}</td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                  {new Date(s.subscribedAt || s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={s.status || "active"} />
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap flex justify-end gap-3">
                  <button
                    onClick={() => handleToggleSubscription(s)}
                    disabled={actionLoading}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1.5"
                    title={s.status === "active" ? "Unsubscribe user" : "Re-subscribe user"}
                  >
                    {s.status === "active" ? (
                      <>
                        <ToggleRight size={16} className="text-green-600" />
                        <span>Unsubscribe</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={16} className="text-gray-400" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleOpenDelete(s)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl border border-red-100 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Trash2 size={13} /> Delete
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

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Subscriber Record"
        message={`Are you sure you want to permanently delete subscription email: ${selectedSub?.email}? This action is irreversible.`}
        loading={actionLoading}
      />
    </div>
  );
}
