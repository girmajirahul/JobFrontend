import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!isOpen) return null;

  const sendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`, {
        email,
      });
      toast.success("OTP sent");
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/verify-otp`, {
        email,
        otp,
      });
      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`, {
        email,
        newPassword,
      });
      toast.success("Password reset successful");
      onClose();
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3">✖</button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input mb-4"
            />
            <button onClick={sendOtp} className="btn-primary w-full">
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input mb-4"
            />
            <button onClick={verifyOtp} className="btn-primary w-full">
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input mb-4"
            />
            <button onClick={resetPassword} className="btn-primary w-full">
              Reset Password
            </button>
          </>
        )}

        {/* Step indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-6 rounded ${
                step >= s ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .input { width:100%; padding:10px; border:1px solid #ddd; border-radius:8px }
        .btn-primary { background:#2563eb; color:white; padding:10px; border-radius:8px }
      `}</style>
    </div>
  );
}