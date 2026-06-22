import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "grlc_admin_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // user: null (loading) | object (authed) | false (not authed)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem(TOKEN_KEY) || null; } catch { return null; }
  });

  // Axios instance that automatically injects Bearer token if present
  const api = useMemo(() => {
    const instance = axios.create({ baseURL: API });
    instance.interceptors.request.use((cfg) => {
      const t = (() => {
        try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
      })();
      if (t) {
        cfg.headers = cfg.headers || {};
        cfg.headers.Authorization = `Bearer ${t}`;
      }
      return cfg;
    });
    return instance;
  }, []);

  const refresh = useCallback(async () => {
    let t;
    try { t = localStorage.getItem(TOKEN_KEY); } catch { t = null; }
    if (!t) { setUser(false); return null; }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
      return data;
    } catch {
      try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
      setToken(null);
      setUser(false);
      return null;
    }
  }, [api]);

  useEffect(() => { refresh(); }, [refresh]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    try { localStorage.setItem(TOKEN_KEY, data.access_token); } catch { /* ignore */ }
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch { /* ignore */ }
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
    setToken(null);
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refresh, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
