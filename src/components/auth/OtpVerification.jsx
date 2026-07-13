import { useState, useEffect, useRef } from "react";
import { api } from "../../lib/apiClient";

export default function OtpVerification({ onVerified, purpose = "register" }) {
  const [step, setStep] = useState("mobile"); // "mobile" | "otp" | "verified"
  const [mobile, setMobile] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("whatsapp"); // "whatsapp" | "sms"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
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
    setError("");
    if (!validateMobile(mobile)) {
      setError("कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    try {
      const res = await api.sendOtp(mobile, purpose);
      if (res.success) {
        setStep("otp");
        setTimer(30);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError(res.message || "OTP भेजने में समस्या हुई।");
      }
    } catch (err) {
      setError(err.message || "OTP भेजने में समस्या हुई। कृपया पुनः प्रयास करें।");
    }
  }

  async function handleResend() {
    setError("");
    try {
      await api.sendOtp(mobile, purpose);
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message || "OTP पुनः भेजने में समस्या हुई।");
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
    setError("");
    const entered = otp.join("");
    if (entered.length < 6) {
      setError("कृपया पूरा 6-अंकों का OTP दर्ज करें।");
      return;
    }
    try {
      const data = await api.verifyOtp(mobile, entered, purpose);
      if (!data.success) {
        setError("गलत OTP। कृपया पुनः प्रयास करें। (Test Mode में सही OTP: 123456)");
        return;
      }
      setStep("verified");
      onVerified?.(mobile, data.tempToken);
    } catch (err) {
      setError(err.message || "सत्यापन में समस्या हुई। कृपया पुनः प्रयास करें।");
    }
  }

  if (step === "verified") {
    return (
      <div className="text-center py-6">
        <div className="text-green-600 text-4xl mb-2">✓</div>
        <p className="font-bold text-lg text-charcoal">Mobile Verified</p>
        <p className="text-gray-500 text-sm">{mobile}</p>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {mobile} पर भेजा गया 6-अंकों का OTP दर्ज करें।
        </p>
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
          className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-bold py-3 rounded-full transition"
        >
          Verify & Continue
        </button>
        <div className="text-center text-sm">
          {canResend ? (
            <button onClick={handleResend} className="text-[#FF6600] font-semibold">
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
        <label className="text-xs font-bold text-gray-600">MOBILE NUMBER</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1 bg-white">
          <span className="text-gray-400 mr-2">📱</span>
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

      <div>
        <label className="text-xs font-bold text-gray-600 block mb-2">OTP कैसे प्राप्त करें?</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDeliveryMethod("whatsapp")}
            className={`flex-1 py-2 rounded-full border text-sm font-semibold transition ${
              deliveryMethod === "whatsapp"
                ? "bg-[#FF6600] text-white border-[#FF6600]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            💬 WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMethod("sms")}
            className={`flex-1 py-2 rounded-full border text-sm font-semibold transition ${
              deliveryMethod === "sms"
                ? "bg-[#FF6600] text-white border-[#FF6600]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            📩 SMS
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handleSendOtp}
        className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-bold py-3 rounded-full transition animate-pulse"
      >
        Send OTP
      </button>
    </div>
  );
}
