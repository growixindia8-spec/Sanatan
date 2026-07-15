import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminFilters from "../../components/admin/AdminFilters";
import AdminModal from "../../components/admin/AdminModal";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Eye, Info, User, HelpCircle } from "lucide-react";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Modal State
  const [selectedLog, setSelectedLog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 20, search };
      const res = await adminApi.getAuditLogs(params);
      if (res.success) {
        setLogs(res.logs);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load audit trails.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, search]);

  const handleOpenDetail = (log) => {
    setSelectedLog(log);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Administrative Security Audit Trails"
        description="Review chronological logs of all database actions performed by foundation administrators."
      />

      <AdminFilters>
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search action, administrator, summary..." />
      </AdminFilters>

      {loading ? (
        <LoadingState message="Connecting audit ledger..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchLogs} />
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No audit logs found matching filters.</div>
      ) : (
        <>
          <AdminTable headers={["Timestamp", "Administrator", "Role", "Action Type", "Resource", "Summary Statement", "Details"]}>
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-gray-450 whitespace-nowrap text-[10px]">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 font-bold text-charcoal whitespace-nowrap">
                  {log.adminUser?.fullName || "System Engine"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-[9px] font-extrabold uppercase text-gray-400">{log.adminUser?.role || "System"}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-gray-650 font-semibold">{log.action}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-500">{log.resourceType}</td>
                <td className="px-6 py-4 text-xs text-gray-550 max-w-[200px] truncate">{log.summary}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenDetail(log)}
                    className="p-1.5 bg-gray-550/10 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-[10px] font-bold text-gray-600 transition-all flex items-center gap-1 ml-auto"
                  >
                    <Eye size={12} /> Inspect
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
      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Audit Trail Inspection">
        {selectedLog && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-150 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-[#FF6600]">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-charcoal text-xs">Performed By: {selectedLog.adminUser?.fullName || "System Engine"}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Role: {selectedLog.adminUser?.role || "System"} • IP Address: {selectedLog.ipAddress || "Localhost"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Action type</span>
                <span className="text-xs font-mono text-[#FF6600] font-bold">{selectedLog.action}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Target Resource</span>
                <span className="text-xs font-semibold text-gray-600">{selectedLog.resourceType} (ID: {selectedLog.resourceId || "N/A"})</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Human Summary</span>
                <p className="text-xs text-charcoal font-semibold mt-1">{selectedLog.summary}</p>
              </div>
              {selectedLog.userAgent && (
                <div className="md:col-span-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">User Agent</span>
                  <span className="text-[10px] font-mono text-gray-500 break-all">{selectedLog.userAgent}</span>
                </div>
              )}
            </div>

            {/* Previous vs New Values JSON view */}
            {(selectedLog.previousValues || selectedLog.newValues) && (
              <div className="pt-6 border-t border-gray-150 space-y-4">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Difference Ledger values</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLog.previousValues && (
                    <div>
                      <span className="text-[9px] font-extrabold text-red-500 uppercase tracking-wider block mb-1">Previous Values</span>
                      <pre className="p-3 bg-gray-50 border border-gray-150 rounded-xl overflow-x-auto font-mono text-[9px] text-gray-500 max-h-48">
                        {JSON.stringify(selectedLog.previousValues, null, 2)}
                      </pre>
                    </div>
                  )}
                  {selectedLog.newValues && (
                    <div>
                      <span className="text-[9px] font-extrabold text-green-600 uppercase tracking-wider block mb-1">New Values</span>
                      <pre className="p-3 bg-gray-50 border border-gray-150 rounded-xl overflow-x-auto font-mono text-[9px] text-gray-600 max-h-48">
                        {JSON.stringify(selectedLog.newValues, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
