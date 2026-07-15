import React, { useState, useEffect } from 'react';
import { api } from '../../lib/apiClient';
import { Loader, AlertCircle, FileText } from 'lucide-react';

export default function MyMembershipPanel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getMyApplications();
        if (res && res.applications) {
          setData(res.applications[0]); // assume first is active
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center"><Loader className="animate-spin text-saffron mx-auto" /></div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-3">My Membership</h3>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {!data ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 mb-4 font-devanagari">आपने अभी तक सदस्यता आवेदन पूरा नहीं किया है।</p>
          <a href="/join-the-mission" className="inline-block bg-[#FF6A00] text-white px-6 py-2 rounded-xl font-bold">
            Apply for Membership
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Status</span>
              <span className="font-semibold text-charcoal capitalize">{data.status}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Membership Type</span>
              <span className="font-semibold text-charcoal">{data.membershipType}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Application Date</span>
              <span className="font-semibold text-charcoal">{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Member ID</span>
              <span className="font-semibold text-charcoal">{data.memberId || 'Pending'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
