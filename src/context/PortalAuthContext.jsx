import { createContext, useContext, useState } from "react";
import { api } from "../lib/apiClient";

const PortalAuthContext = createContext(null);

export function PortalAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("portal_token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("portal_user") || "null"));
  const [error, setError] = useState("");

  async function login(mobile, password) {
    setError("");
    try {
      const data = await api.login(mobile, password);
      localStorage.setItem("portal_token", data.token);
      localStorage.setItem("portal_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function registerUser(mobile, password, fullName = "", email = "") {
    setError("");
    try {
      const data = await api.register({ mobile, password, fullName, email });
      localStorage.setItem("portal_token", data.token);
      localStorage.setItem("portal_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("portal_token");
    localStorage.removeItem("portal_user");
    setToken(null);
    setUser(null);
  }

  return (
    <PortalAuthContext.Provider value={{ token, user, error, login, logout, registerUser, isAuthenticated: !!token }}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export const usePortalAuth = () => useContext(PortalAuthContext);
