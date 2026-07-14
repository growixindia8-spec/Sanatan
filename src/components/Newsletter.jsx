import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage('कृपया ईमेल पता दर्ज करें। / Please enter an email address.');
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setStatusMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch(`${getApiUrl()}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setStatusMessage('सफलतापूर्वक सब्सक्राइब किया गया! / Subscribed successfully!');
        setEmail('');
      } else {
        setIsSuccess(false);
        setStatusMessage(data.message || 'सदस्यता में त्रुटि। / Error subscribing.');
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
      setStatusMessage('नेटवर्क त्रुटि। कृपया बाद में प्रयास करें। / Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-cream border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">सेवा, संस्कार और समाज से जुड़े रहने के लिए</h2>
        <p className="text-gray-600 font-devanagari mb-8">🚩 सनातन पर्व, सेवा अभियान, विशेष कार्यक्रमों एवं महत्वपूर्ण अपडेट्स की जानकारी प्राप्त करने के लिए Subscribe करें।</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto gap-4 mb-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Your Email Address" 
            className="flex-1 rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron bg-white disabled:opacity-75" 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-saffron text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 shadow-lg disabled:bg-orange-400 cursor-pointer"
          >
            {loading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>

        {statusMessage && (
          <p className={`text-sm font-devanagari font-semibold transition-opacity duration-300 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </section>
  );
}

