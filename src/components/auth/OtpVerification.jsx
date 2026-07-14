import { useState, useEffect, useRef } from "react";
import { api } from "../../lib/apiClient";

export default function OtpVerification({ onVerified, purpose = "register" }) {
  const [step, setStep] = useState("mobile"); // "mobile" | "otp" | "verified"
  const [mobile, setMobile] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("sms"); // Default to sms
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverTestOtp, setServerTestOtp] = useState("");
  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (step !== "otp" || canResend) return;
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer, canResend]);

  function validateMobile(value) {
    return /^[6-9]\d{9}$/.test(value); // 10-digit Indian mobile
  }

  async function handleSendOtp() {
    if (loading) return;
    setError("");
    if (!validateMobile(mobile)) {
      setError("कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    setLoading(true);
    try {
      const res = await api.sendOtp(mobile, purpose, deliveryMethod);
      if (res.success) {
        setStep("otp");
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        if (res.testOtp) {
          setServerTestOtp(res.testOtp);
        } else {
          setServerTestOtp("");
        }
      } else {
        setError(res.message || "OTP भेजने में समस्या हुई।");
      }
    } catch (err) {
      setError(err.message || "OTP भेजने में समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.sendOtp(mobile, purpose, deliveryMethod);
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      if (res.testOtp) {
        setServerTestOtp(res.testOtp);
      } else {
        setServerTestOtp("");
      }
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message || "OTP पुनः भेजने में समस्या हुई।");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return; // sirf single digit allow
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    if (loading) return;
    setError("");
    const entered = otp.join("");
    if (entered.length < 6) {
      setError("कृपया पूरा 6-अंकों का OTP दर्ज करें।");
      return;
    }
    setLoading(true);
    try {
      const data = await api.verifyOtp(mobile, entered, purpose);
      if (!data.success) {
        setError("गलत OTP। कृपया पुनः प्रयास करें।");
        return;
      }
      setStep("verified");
      onVerified?.(mobile, data.tempToken);
    } catch (err) {
      setError(err.message || "सत्यापन में समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  }

  if (step === "verified") {
    return (
      <div className="text-center py-6 animate-fadeIn">
        <div className="text-green-600 text-4xl mb-2">✓</div>
        <p className="font-bold text-lg text-charcoal">Mobile Verified</p>
        <p className="text-gray-500 text-sm">{mobile}</p>
      </div>
    );
  }

  const showTestOtp = !import.meta.env.PROD;

  if (step === "otp") {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-655">
          {showTestOtp && serverTestOtp ? (
            <div className="bg-orange-50 border border-orange-200 text-orange-900 px-4 py-2.5 rounded-xl text-center text-sm font-bold font-mono">
              🔧 Test Mode OTP: {serverTestOtp}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-905 px-4 py-2.5 rounded-xl text-center text-sm font-medium">
              📩 OTP sent successfully by SMS to +91 {mobile}
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-10 h-12 text-center text-lg border rounded-lg focus:border-[#FF6600] focus:ring-2 focus:ring-orange-200 outline-none text-charcoal font-bold bg-white"
            />
          ))}
        </div>
        {error && <p className="text-red-650 text-red-600 text-sm text-center font-bold">{error}</p>}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-bold py-3 rounded-full transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
        <div className="text-center text-sm">
          {canResend ? (
            <button 
              onClick={handleResend} 
              disabled={loading}
              className="text-[#FF6600] font-semibold disabled:opacity-50"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-400">Resend OTP in {timer}s</span>
          )}
        </div>
      </div>
    );
  }

  // step === "mobile"
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold text-gray-650 block mb-1">MOBILE NUMBER</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-white">
          <span className="text-gray-450 mr-2">📱</span>
          <input
            type="tel"
            maxLength={10}
            placeholder="98XXXXXXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            className="w-full outline-none text-charcoal text-sm bg-transparent"
          />
        </div>
      </div>


      {error && <p className="text-red-650 text-red-600 text-sm text-center font-bold">{error}</p>}

      <button
        onClick={handleSendOtp}
        disabled={loading}
        className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-bold py-3 rounded-full transition disabled:opacity-50"
      >
        Send OTP
      </button>
    </div>
  );
}
