import React, { useState, useEffect } from 'react';
import { api } from '../../lib/apiClient';
import { Loader, AlertCircle } from 'lucide-react';

export default function MyFundraisersPanel() {
  const [loading, setLoading] = useState(true);
  const [fundraisers, setFundraisers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getMyFundraisers();
        setFundraisers(res.fundraisers || []);
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
      <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-3">My Fundraisers</h3>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {fundraisers.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 mb-4 font-devanagari">आपने अभी तक कोई फंडरेज़र अभियान शुरू नहीं किया है।</p>
          <a href="/donate/start-fundraiser" className="inline-block bg-[#FF6A00] text-white px-6 py-2 rounded-xl font-bold">
            Start a Fundraiser
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {fundraisers.map(f => (
            <div key={f._id} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-charcoal">{f.title}</h4>
                <p className="text-sm text-gray-500">Raised: ₹{f.amountRaised} / ₹{f.targetAmount}</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold capitalize">
                {f.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
