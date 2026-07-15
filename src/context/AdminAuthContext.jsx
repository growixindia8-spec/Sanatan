import React, { createContext, useContext, useState, useEffect } from "react";
import { adminApi } from "../lib/adminApiClient";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token") || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_user") || "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to validate token and fetch latest user profile from backend
  const refreshAdminProfile = async (currentToken = adminToken) => {
    if (!currentToken) {
      setAdminUser(null);
      setLoading(false);
      return null;
    }
    try {
      const data = await adminApi.adminMe();
      if (data.success && ['admin', 'superadmin', 'viewer'].includes(data.user.role)) {
        setAdminUser(data.user);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        return data.user;
      } else {
        throw new Error("This account is not authorized for administrator access.");
      }
    } catch (err) {
      console.error("Token verification failed:", err.message);
      logoutAdmin();
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAdminProfile();
    
    // Listen for unauthorized 401 events from the API client
    const handleUnauthorized = () => {
      logoutAdmin();
      setErrorMsg("Your admin session has expired. Please log in again.");
      window.location.href = "/admin/login?expired=true";
    };

    window.addEventListener("admin-unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("admin-unauthorized", handleUnauthorized);
    };
  }, [adminToken]);

  const loginAdmin = async (mobile, password) => {
    setErrorMsg("");
    try {
      const data = await adminApi.adminLogin(mobile, password);
      
      if (data.success) {
        const userRole = data.user.role;
        if (!['admin', 'superadmin', 'viewer'].includes(userRole)) {
          throw new Error("This account is not authorized for administrator access.");
        }
        
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        setAdminToken(data.token);
        setAdminUser(data.user);
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || "Invalid admin credentials");
      }
    } catch (err) {
      // Catch specific errors
      let errMsg = err.message;
      if (errMsg.toLowerCase().includes("not found")) {
        errMsg = "Account not found";
      } else if (errMsg.toLowerCase().includes("password")) {
        errMsg = "Incorrect password";
      } else if (errMsg.toLowerCase().includes("not authorized") || errMsg.toLowerCase().includes("role")) {
        errMsg = "This account is not authorized for administrator access.";
      } else if (errMsg.toLowerCase().includes("suspended")) {
        errMsg = "Account suspended";
      } else if (errMsg.toLowerCase().includes("network") || errMsg.toLowerCase().includes("reachable")) {
        errMsg = "Backend unavailable";
      }
      
      setErrorMsg(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdminToken(null);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        isAdminAuthenticated: !!adminToken && !!adminUser,
        loading,
        errorMsg,
        setErrorMsg,
        loginAdmin,
        logoutAdmin,
        refreshAdminProfile
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
