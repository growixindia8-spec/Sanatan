const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("portal_token");
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  login: (mobile, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ mobile, password }) }),
  register: (data) =>
    request("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  sendOtp: (mobile, purpose) =>
    request("/api/auth/send-otp", { method: "POST", body: JSON.stringify({ mobile, purpose }) }),
  verifyOtp: (mobile, otp, purpose) =>
    request("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ mobile, otp, purpose }) }),
  resetPassword: (mobile, otp, newPassword) =>
    request("/api/auth/reset-password", { method: "POST", body: JSON.stringify({ mobile, otp, newPassword }) }),
  
  // Membership Registration & User Workspace
  registerMembership: (formData) =>
    request("/api/membership/register", { method: "POST", body: formData }),
  markPaidTest: (id) =>
    request(`/api/membership/${id}/mark-paid-test`, { method: "PATCH" }),
  getMyApplications: () =>
    request("/api/membership/my-applications"),

  // Coordinator/Admin Portal
  getDashboardStats: () => request("/api/portal/dashboard-stats"),
  getMemberships: (status) => request(`/api/portal/memberships${status ? `?status=${status}` : ""}`),
  approveMembership: (id) => request(`/api/portal/memberships/${id}/approve`, { method: "PATCH" }),
  rejectMembership: (id) => request(`/api/portal/memberships/${id}/reject`, { method: "PATCH" }),
  getProfile: () => request("/api/portal/profile"),
  updateProfile: (data) => request("/api/portal/profile", { method: "PUT", body: JSON.stringify(data) }),
  getNotifications: () => request("/api/portal/notifications"),
  markNotificationRead: (id) => request(`/api/portal/notifications/${id}/read`, { method: "PATCH" }),
  verifyMembership: (query) => request(`/api/portal/verify-membership?query=${encodeURIComponent(query)}`),
  uploadFinancialReport: (formData) =>
    request("/api/portal/financial-reports", { method: "POST", body: formData }),
  getFinancialReports: (fiscalYear) =>
    request(`/api/portal/financial-reports${fiscalYear ? `?fiscalYear=${fiscalYear}` : ""}`),
};
