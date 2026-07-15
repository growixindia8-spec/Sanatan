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
import { Eye, Download, Plus, Clock, Receipt, UserCheck } from "lucide-react";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  // Modal Detail View
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [successNoteMsg, setSuccessNoteMsg] = useState("");

  // Receipt & Status Updates
  const [updating, setUpdating] = useState(false);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {
        page,
        limit: 10,
        search,
        status,
        paymentMode,
        startDate,
        endDate
      };
      const res = await adminApi.getDonations(params);
      if (res.success) {
        setDonations(res.donations);
        setCount(res.count);
        setPages(res.pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [page, search, status, paymentMode, startDate, endDate]);

  const handleExportCsv = () => {
    const params = { search, status, paymentMode, startDate, endDate };
    const exportUrl = adminApi.exportDonationsCsv(params);
    window.open(exportUrl, "_blank");
  };

  const handleViewDetails = async (id) => {
    try {
      setUpdating(true);
      const res = await adminApi.getDonation(id);
      if (res.success) {
        setSelectedDonation(res.donation);
        setDetailOpen(true);
        setNote("");
        setSuccessNoteMsg("");
      }
    } catch (err) {
      alert("Error loading donation details: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    try {
      setSavingNote(true);
      setSuccessNoteMsg("");
      const res = await adminApi.addDonationNote(selectedDonation._id, note);
      if (res.success) {
        setSuccessNoteMsg("Internal admin note saved successfully.");
        setNote("");
      }
    } catch (err) {
      alert("Failed to save note: " + err.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleUpdateMetadata = async (fields) => {
    try {
      setUpdating(true);
      const res = await adminApi.updateDonation(selectedDonation._id, fields);
      if (res.success) {
        setSelectedDonation(res.donation);
        fetchDonations();
      }
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Donations & Contributions"
        description="Verify payments, process 80G tax claims, add notes, and generate detailed report receipts."
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
        <AdminSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search donor name, mobile, payment ID..." />
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Statuses</option>
          <option value="verified">Verified / Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={paymentMode}
          onChange={(e) => { setPaymentMode(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-bold text-gray-600"
        >
          <option value="">All Modes</option>
          <option value="razorpay">Razorpay</option>
          <option value="bank-transfer">Bank Transfer</option>
          <option value="qr">QR Code</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          />
          <span className="text-gray-400 text-xs font-bold">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          />
        </div>
      </AdminFilters>

      {loading ? (
        <LoadingState message="Searching donation records..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchDonations} />
      ) : donations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-250 p-12 text-center text-gray-400 text-xs">No matching donation records.</div>
      ) : (
        <>
          <AdminTable headers={["Date", "Donor", "Contact", "Amount", "Campaign", "Mode", "Status", "Actions"]}>
            {donations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-bold text-charcoal">{d.fullName}</td>
                <td className="px-6 py-4 text-xs">
                  <div>{d.mobile}</div>
                  <div className="text-gray-400 text-[10px] lowercase truncate max-w-[120px]">{d.email}</div>
                </td>
                <td className="px-6 py-4 font-serif font-black text-charcoal">₹{d.amount.toLocaleString("en-IN")}</td>
                <td className="px-6 py-4 text-xs font-medium text-gray-600 max-w-[150px] truncate">{d.campaign || d.projectFor}</td>
                <td className="px-6 py-4 text-xs capitalize text-gray-500 whitespace-nowrap">{d.paymentMode}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={d.paymentStatus} /></td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(d._id)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] flex items-center gap-1.5 text-xs font-bold text-gray-600 transition-all"
                  >
                    <Eye size={14} /> View Details
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

      {/* Donation Detail Modal */}
      <AdminModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Donation Transaction Details"
      >
        {selectedDonation && (
          <div className="space-y-6">
            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Donor Full Name</span>
                <span className="text-sm font-bold text-charcoal">{selectedDonation.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Donation Amount</span>
                <span className="text-sm font-serif font-black text-[#FF6600]">₹{selectedDonation.amount.toLocaleString("en-IN")}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Mobile Number</span>
                <span className="text-xs text-gray-600">{selectedDonation.mobile}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Email Address</span>
                <span className="text-xs text-gray-600 lowercase">{selectedDonation.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Campaign / Project</span>
                <span className="text-xs text-gray-600">{selectedDonation.campaign || selectedDonation.projectFor}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Contribution Type</span>
                <span className="text-xs text-gray-600 capitalize">{selectedDonation.contributionType}</span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Payment Status / Mode</span>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={selectedDonation.paymentStatus} />
                  <span className="text-xs font-semibold text-gray-500 uppercase">({selectedDonation.paymentMode})</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Created Date / Time</span>
                <span className="text-xs text-gray-500">{new Date(selectedDonation.createdAt).toLocaleString()}</span>
              </div>
              
              {selectedDonation.razorpayOrderId && (
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Razorpay Order ID</span>
                  <span className="text-xs font-mono text-gray-500">{selectedDonation.razorpayOrderId}</span>
                </div>
              )}
              {selectedDonation.razorpayPaymentId && (
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Razorpay Payment ID</span>
                  <span className="text-xs font-mono text-gray-500">{selectedDonation.razorpayPaymentId}</span>
                </div>
              )}
              {selectedDonation.transactionRef && (
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">UTR Transaction Reference</span>
                  <span className="text-xs font-mono text-gray-500">{selectedDonation.transactionRef}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">80G tax claim / PAN Status</span>
                <span className="text-xs text-gray-600">
                  {selectedDonation.want80G ? `Claim Requested (PAN: ${selectedDonation.panNumber || "N/A"})` : "No 80G Claim requested"}
                </span>
              </div>
            </div>

            {selectedDonation.paymentScreenshotUrl && (
              <div className="pt-4 border-t border-gray-100">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Payment Verification Screenshot</span>
                <a
                  href={selectedDonation.paymentScreenshotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block"
                >
                  <img
                    src={selectedDonation.paymentScreenshotUrl}
                    alt="Proof of Transfer"
                    className="max-h-48 border border-gray-200 rounded-xl hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
            )}

            {/* Quick Actions (e.g. verify manually bank transfer or update receipt URL) */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              {selectedDonation.paymentMode !== "razorpay" && selectedDonation.paymentStatus !== "verified" && (
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateMetadata({ paymentStatus: "verified" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <UserCheck size={14} /> Verify Bank Transfer Manually
                </button>
              )}
              
              <button
                type="button"
                onClick={() => {
                  const receiptUrl = prompt("Enter generated receipt PDF URL:", selectedDonation.receiptUrl || "");
                  if (receiptUrl !== null) handleUpdateMetadata({ receiptUrl });
                }}
                className="bg-charcoal hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Receipt size={14} /> Update Receipt URL
              </button>
              
              {selectedDonation.receiptUrl && (
                <a
                  href={selectedDonation.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-50 hover:bg-orange-100 text-[#FF6600] font-bold py-2 px-4 rounded-xl text-xs border border-orange-100 flex items-center gap-1.5 transition-colors"
                >
                  Open Current Receipt
                </a>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div className="pt-6 border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-3">Add Internal Admin Note</span>
              {successNoteMsg && (
                <p className="mb-3 text-emerald-600 font-bold text-xs">{successNoteMsg}</p>
              )}
              <form onSubmit={handleSaveNote} className="flex gap-3">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Record verification call date or manual notes..."
                  className="flex-grow px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={savingNote}
                  className="bg-charcoal hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-sm disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Add Note"}
                </button>
              </form>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
