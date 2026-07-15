import React, { useState, useEffect } from 'react';
import { api } from '../../lib/apiClient';
import { Loader, AlertCircle } from 'lucide-react';

export default function MyReceiptsPanel() {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.getMyReceipts();
        setReceipts(res.receipts || []);
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
      <h3 className="text-xl font-bold text-charcoal mb-6 border-b pb-3">Receipts & Certificates</h3>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {receipts.length === 0 ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 font-devanagari">आपके पास अभी कोई रसीद या प्रमाणपत्र नहीं है।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map(r => (
            <div key={r._id} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-charcoal">{r.title}</h4>
                <p className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-500 font-semibold hover:underline text-sm">
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
