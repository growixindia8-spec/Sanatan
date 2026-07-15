import React, { useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { Save, ShieldAlert } from "lucide-react";

export default function AdminSettings() {
  const [orgName, setOrgName] = useState("Sanatan Dharm Manav Kalyan Foundation");
  const [websiteUrl, setWebsiteUrl] = useState("https://sanatanfoundation.org");
  const [publicEmail, setPublicEmail] = useState("info@sanatanfoundation.org");
  const [publicPhone, setPublicPhone] = useState("+91 88888 88888");
  const [registeredAddress, setRegisteredAddress] = useState("Delhi, India");
  const [receiptPrefix, setReceiptPrefix] = useState("SDMKF");
  const [currency, setCurrency] = useState("INR");
  const [maintenance, setMaintenance] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Application settings saved successfully (local state updated).");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Application Configuration Settings"
        description="Modify public contact details, registered addresses, receipt prefixes, and other administrative properties."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Website Base URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Public Support Email</label>
                <input
                  type="email"
                  value={publicEmail}
                  onChange={(e) => setPublicEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Public Support Mobile</label>
                <input
                  type="text"
                  value={publicPhone}
                  onChange={(e) => setPublicPhone(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Donation Receipt Prefix</label>
                <input
                  type="text"
                  value={receiptPrefix}
                  onChange={(e) => setReceiptPrefix(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Default Base Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                >
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Registered HQ Address</label>
                <textarea
                  value={registeredAddress}
                  onChange={(e) => setRegisteredAddress(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-gray-100">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenance}
                  onChange={(e) => setMaintenance(e.target.checked)}
                  className="rounded text-[#FF6600] focus:ring-[#FF6600]"
                />
                Enable Public Maintenance Landing page
              </label>

              <button
                type="submit"
                disabled={saving}
                className="bg-[#FF6600] hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>

        {/* Security Warning Panel */}
        <div className="bg-white rounded-3xl border border-gray-250 border-orange-200 p-6 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-orange-50 text-[#FF6600] rounded-2xl flex items-center justify-center mb-4 border border-orange-100">
              <ShieldAlert size={24} />
            </div>
            <h4 className="font-extrabold text-charcoal text-sm uppercase tracking-wider mb-2">Environment Isolation Policy</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              For security compliance, sensitive integration keys, databases URI strings, and API secrets are never displayed or editable in the browser. 
            </p>
            <p className="text-gray-500 text-xs mt-3 leading-relaxed">
              These properties are protected in server environment configurations (e.g. <code>.env</code> file) on hosting servers:
            </p>
            <ul className="text-[10px] font-mono text-gray-400 mt-3 space-y-1 list-disc pl-4">
              <li>MONGODB_URI</li>
              <li>JWT_SECRET</li>
              <li>RAZORPAY_KEY_SECRET</li>
              <li>FAST2SMS_API_KEY</li>
              <li>SMTP_AUTH_PASS</li>
            </ul>
          </div>
          
          <div className="pt-6 border-t border-gray-150 text-[10px] font-bold text-[#FF6600] uppercase tracking-wider">
            Sanatan Security Guard
          </div>
        </div>

      </div>
    </div>
  );
}
