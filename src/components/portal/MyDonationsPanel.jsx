import React, { useState, useEffect } from 'react';
import { api } from '../../lib/apiClient';
import { Loader, AlertCircle } from 'lucide-react';

export default function MyDonationsPanel() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getMyDonations();
        setDonations(res.donations || []);
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
      <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-3">My Donations</h3>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {donations.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 font-devanagari">आपने अभी तक कोई दान नहीं किया है।</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.map(d => (
                <tr key={d._id} className="hover:bg-gray-50/50">
                  <td className="p-4">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-bold text-green-600">₹{d.amount}</td>
                  <td className="p-4 capitalize">{d.status}</td>
                  <td className="p-4 text-right">
                    {d.status === 'successful' && (
                      <span className="text-blue-500 cursor-pointer hover:underline">Download</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
