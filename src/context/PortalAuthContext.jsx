import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/apiClient";

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("sanatan_portal_token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("sanatan_portal_user") || "null"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Validate token on load
  useEffect(() => {
    async function validateSession() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getProfile();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("sanatan_portal_user", JSON.stringify(data.user));
        }
      } catch (err) {
        console.error("Session validation failed:", err);
        logout(); // clear expired session
      } finally {
        setLoading(false);
      }
    }
    validateSession();
  }, [token]);

  async function refreshProfile() {
    try {
      const data = await api.getProfile();
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("sanatan_portal_user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  }

  async function login(mobile, password) {
    setError("");
    setLoading(true);
    try {
      const data = await api.login(mobile, password);
      localStorage.setItem("sanatan_portal_token", data.token);
      localStorage.setItem("sanatan_portal_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function registerUser(mobile, password, fullName = "", email = "") {
    setError("");
    setLoading(true);
    try {
      const data = await api.register({ mobile, password, fullName, email });
      localStorage.setItem("sanatan_portal_token", data.token);
      localStorage.setItem("sanatan_portal_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("sanatan_portal_token");
    localStorage.removeItem("sanatan_portal_user");
    setToken(null);
    setUser(null);
  }

  return (
    <PortalAuthContext.Provider value={{ token, user, error, loading, login, logout, registerUser, refreshProfile, isAuthenticated: !!token }}>
      {children}
    </PortalAuthContext.Provider>
  );
}


export const usePortalAuth = () => useContext(PortalAuthContext);
