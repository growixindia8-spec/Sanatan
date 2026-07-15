import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminFilters from "../../components/admin/AdminFilters";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Download, Printer, BarChart3, TrendingUp, Calendar, Coins } from "lucide-react";

export default function AdminReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaign, setCampaign] = useState("");
  const [memberCategory, setMemberCategory] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");
      const params = { startDate, endDate, campaign, memberCategory };
      const res = await adminApi.getReports(params);
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || "Failed to load report analysis statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [startDate, endDate, campaign, memberCategory]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = (type) => {
    let csv = "";
    let filename = "";

    if (type === "monthly" && data?.monthlyCollection) {
      csv = "Year,Month,Total Amount,Donation Count\n";
      data.monthlyCollection.forEach((m) => {
        csv += `${m._id.year},${m._id.month},${m.totalAmount},${m.count}\n`;
      });
      filename = "monthly_collection_report.csv";
    } else if (type === "campaign" && data?.campaignWise) {
      csv = "Campaign Name,Total Collected,Donation Count\n";
      data.campaignWise.forEach((c) => {
        csv += `"${c._id || "Direct"}",${c.totalAmount},${c.count}\n`;
      });
      filename = "campaign_collection_report.csv";
    } else if (type === "members" && data?.memberCategoryWise) {
      csv = "Member Category,Approved Count\n";
      data.memberCategoryWise.forEach((m) => {
        csv += `"${m._id}",${m.count}\n`;
      });
      filename = "membership_distribution_report.csv";
    }

    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.click();
  };

  if (loading) return <LoadingState message="Aggregating transaction ledgers..." />;
  if (error) return <ErrorState error={error} onRetry={fetchReports} />;

  const { monthlyCollection = [], campaignWise = [], festivalWise = [], memberCategoryWise = [] } = data || {};

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <AdminPageHeader
          title="Foundation Collections & Reports"
          description="Audited aggregated summaries of donor transactions, campaigns, and membership metrics."
          actions={
            <>
              <button
                onClick={handlePrint}
                className="bg-charcoal text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-800 transition-all text-xs flex items-center gap-2 shadow-sm"
              >
                <Printer size={14} /> Print Report Sheet
              </button>
            </>
          }
        />

        <AdminFilters>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
            />
            <span className="text-gray-400 text-xs font-bold">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
            />
            
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="Campaign filter..."
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-xs font-semibold text-gray-600 shadow-sm"
            />
          </div>
        </AdminFilters>
      </div>

      {/* Print view header */}
      <div className="hidden print:block text-center border-b border-gray-300 pb-6 mb-6">
        <h1 className="text-2xl font-bold">SANATAN DHARM MANAV KALYAN FOUNDATION</h1>
        <p className="text-sm text-gray-500 mt-1">Administrative Collections Audit & Analytical Report Ledger</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Generated on: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Monthly collection */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 print:border-b-0 print:mb-2">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={16} className="text-[#FF6600]" /> Monthly Collections Timeline
            </h3>
            <button
              onClick={() => handleExportCsv("monthly")}
              className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1 print:hidden"
            >
              <Download size={12} /> CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-150">
                  <th className="p-3">Period</th>
                  <th className="p-3 text-right">Transaction Count</th>
                  <th className="p-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-charcoal">
                {monthlyCollection.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-400 italic">No monthly collection records.</td>
                  </tr>
                ) : (
                  monthlyCollection.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-3 font-semibold">{m._id.year} - Month {m._id.month}</td>
                      <td className="p-3 text-right font-mono">{m.count}</td>
                      <td className="p-3 text-right font-serif font-black text-[#FF6600]">₹{m.totalAmount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign collection */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 print:border-b-0 print:mb-2">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Coins size={16} className="text-[#FF6600]" /> Campaign Distribution
            </h3>
            <button
              onClick={() => handleExportCsv("campaign")}
              className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1 print:hidden"
            >
              <Download size={12} /> CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-150">
                  <th className="p-3">Campaign / Project</th>
                  <th className="p-3 text-right">Donors</th>
                  <th className="p-3 text-right">Total Collected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-charcoal">
                {campaignWise.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-400 italic">No campaign donation records.</td>
                  </tr>
                ) : (
                  campaignWise.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold truncate max-w-[150px]">{c._id || "Direct Donation / Hub"}</td>
                      <td className="p-3 text-right font-mono">{c.count}</td>
                      <td className="p-3 text-right font-serif font-black text-[#FF6600]">₹{c.totalAmount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Festival collection */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 print:border-b-0 print:mb-2">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={16} className="text-[#FF6600]" /> Festival-wise Collections
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-150">
                  <th className="p-3">Festival Event</th>
                  <th className="p-3 text-right">Donors</th>
                  <th className="p-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-charcoal">
                {festivalWise.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-400 italic">No festival collection records.</td>
                  </tr>
                ) : (
                  festivalWise.map((f, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold truncate max-w-[150px]">{f._id}</td>
                      <td className="p-3 text-right font-mono">{f.count}</td>
                      <td className="p-3 text-right font-serif font-black text-[#FF6600]">₹{f.totalAmount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member categorywise */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4 print:border-b-0 print:mb-2">
            <h3 className="font-extrabold text-charcoal text-xs uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 size={16} className="text-[#FF6600]" /> Onboarded Membership Categories
            </h3>
            <button
              onClick={() => handleExportCsv("members")}
              className="text-[#FF6600] font-bold text-xs hover:underline flex items-center gap-1 print:hidden"
            >
              <Download size={12} /> CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-150">
                  <th className="p-3">Category Tag</th>
                  <th className="p-3 text-right">Approved Member Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-charcoal">
                {memberCategoryWise.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-gray-400 italic">No approved member registers.</td>
                  </tr>
                ) : (
                  memberCategoryWise.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-3 font-bold capitalize">{m._id.replace("-", " ")}</td>
                      <td className="p-3 text-right font-mono font-bold text-charcoal">{m.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
