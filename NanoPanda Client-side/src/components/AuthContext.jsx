// src/components/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';
import { getToken, clearToken } from '../services/secureStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, token }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const token = await getToken();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ name: payload.name, email: payload.email, token });
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (res.success) {
      const { token, user: userInfo } = res;
      setUser({ name: userInfo.name, email: userInfo.email, token });
    }
    return res;
  };

  const signup = async (name, email, password, companyName) => {
    const res = await apiRegister(name, email, password, companyName);
    if (res.success) {
      const { token, user: userInfo } = res;
      setUser({ name: userInfo.name, email: userInfo.email, token });
    }
    return res;
  };

  const logout = async () => {
    await clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
