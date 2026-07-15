const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  } catch (netErr) {
    console.error("Network connection error in adminApiClient:", netErr);
    throw new Error("Backend server is not reachable on port 5000.");
  }

  let data;
  try {
    data = await res.json();
  } catch (parseErr) {
    // Check if it's text CSV
    if (res.ok && res.headers.get("content-type")?.includes("text/csv")) {
      return res; // Return response directly for file download
    }
    throw new Error(`Server returned invalid response (Status ${res.status}).`);
  }

  if (!res.ok) {
    if (res.status === 401) {
      // Trigger token expiration event or reload to clear
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.dispatchEvent(new Event("admin-unauthorized"));
      throw new Error(data.message || "Your admin session has expired. Please log in again.");
    }
    if (res.status === 403) {
      throw new Error(data.message || "You do not have permission to perform this action.");
    }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const adminApi = {
  // Authentication
  adminLogin: (mobile, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ mobile, password }) }),
  adminMe: () =>
    request("/api/admin/me"),

  // Dashboard Statistics
  getDashboardStats: () =>
    request("/api/admin/dashboard/stats"),

  // Donations Management
  getDonations: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/donations?${q}`);
  },
  getDonation: (id) =>
    request(`/api/admin/donations/${id}`),
  updateDonation: (id, data) =>
    request(`/api/admin/donations/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  addDonationNote: (id, note) =>
    request(`/api/admin/donations/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),
  exportDonationsCsv: (params = {}) => {
    const q = new URLSearchParams({ ...params, exportCsv: "true" }).toString();
    return `${API_URL}/api/admin/donations?${q}&Authorization=Bearer ${localStorage.getItem("admin_token")}`;
  },

  // Members Management
  getMembers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/members?${q}`);
  },
  getMember: (id) =>
    request(`/api/admin/members/${id}`),
  createMember: (data) =>
    request("/api/admin/members", { method: "POST", body: JSON.stringify(data) }),
  updateMember: (id, data) =>
    request(`/api/admin/members/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateMemberStatus: (id, status) =>
    request(`/api/admin/members/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteMember: (id) =>
    request(`/api/admin/members/${id}`, { method: "DELETE" }),

  // Membership Applications
  getMembershipApplications: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/membership-applications?${q}`);
  },
  approveMembership: (id) =>
    request(`/api/admin/membership-applications/${id}/approve`, { method: "PATCH" }),
  rejectMembership: (id, reason) =>
    request(`/api/admin/membership-applications/${id}/reject`, { method: "PATCH", body: JSON.stringify({ reason }) }),
  requestMembershipCorrection: (id, message) =>
    request(`/api/admin/membership-applications/${id}/request-correction`, { method: "PATCH", body: JSON.stringify({ message }) }),
  updateMembershipPaymentStatus: (id, paymentStatus) =>
    request(`/api/admin/membership-applications/${id}/payment-status`, { method: "PATCH", body: JSON.stringify({ paymentStatus }) }),
  addMembershipNote: (id, note) =>
    request(`/api/admin/membership-applications/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),

  // Fundraiser Management
  getFundraisers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/fundraisers?${q}`);
  },
  updateFundraiser: (id, data) =>
    request(`/api/admin/fundraisers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  approveFundraiser: (id) =>
    request(`/api/admin/fundraisers/${id}/approve`, { method: "PATCH" }),
  rejectFundraiser: (id, reason) =>
    request(`/api/admin/fundraisers/${id}/reject`, { method: "PATCH", body: JSON.stringify({ reason }) }),
  updateFundraiserStatus: (id, status) =>
    request(`/api/admin/fundraisers/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  featureFundraiser: (id, isFeatured) =>
    request(`/api/admin/fundraisers/${id}/feature`, { method: "PATCH", body: JSON.stringify({ isFeatured }) }),
  deleteFundraiser: (id) =>
    request(`/api/admin/fundraisers/${id}`, { method: "DELETE" }),

  // Complaints Management
  getComplaints: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/complaints?${q}`);
  },
  updateComplaintStatus: (id, status) =>
    request(`/api/admin/complaints/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  assignComplaint: (id, adminUserId) =>
    request(`/api/admin/complaints/${id}/assign`, { method: "PATCH", body: JSON.stringify({ adminUserId }) }),
  addComplaintNote: (id, note) =>
    request(`/api/admin/complaints/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),
  deleteComplaint: (id) =>
    request(`/api/admin/complaints/${id}`, { method: "DELETE" }),

  // CSR Enquiries
  getCsrEnquiries: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/csr-enquiries?${q}`);
  },
  updateCsrStatus: (id, status) =>
    request(`/api/admin/csr-enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  addCsrNote: (id, note) =>
    request(`/api/admin/csr-enquiries/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),
  deleteCsrEnquiry: (id) =>
    request(`/api/admin/csr-enquiries/${id}`, { method: "DELETE" }),

  // Contact Enquiries
  getContactEnquiries: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/contact-enquiries?${q}`);
  },
  updateContactStatus: (id, status) =>
    request(`/api/admin/contact-enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  addContactNote: (id, note) =>
    request(`/api/admin/contact-enquiries/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),
  deleteContactEnquiry: (id) =>
    request(`/api/admin/contact-enquiries/${id}`, { method: "DELETE" }),

  // Newsletter Management
  getNewsletterSubscribers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/newsletter/subscribers?${q}`);
  },
  updateNewsletterStatus: (id, status) =>
    request(`/api/admin/newsletter/subscribers/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteNewsletterSubscriber: (id) =>
    request(`/api/admin/newsletter/subscribers/${id}`, { method: "DELETE" }),

  // Festival Calendar
  getFestivals: () =>
    request("/api/admin/festivals"),
  createFestival: (data) =>
    request("/api/admin/festivals", { method: "POST", body: JSON.stringify(data) }),
  updateFestival: (id, data) =>
    request(`/api/admin/festivals/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFestival: (id) =>
    request(`/api/admin/festivals/${id}`, { method: "DELETE" }),
  updateFestivalStatus: (id, status) =>
    request(`/api/admin/festivals/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),

  // Website Content Management
  getContentSections: () =>
    request("/api/admin/content"),
  updateContentSection: (data) =>
    request("/api/admin/content", { method: "POST", body: JSON.stringify(data) }),

  // Reports
  getReports: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/reports?${q}`);
  },

  // Admin User Management
  getAdminUsers: () =>
    request("/api/admin/users"),
  createAdminUser: (data) =>
    request("/api/admin/users", { method: "POST", body: JSON.stringify(data) }),
  updateAdminUser: (id, data) =>
    request(`/api/admin/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  // Audit Logs
  getAuditLogs: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/admin/audit-logs?${q}`);
  }
};
