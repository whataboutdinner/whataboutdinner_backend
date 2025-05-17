import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      loadUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Load user data using token
  const loadUser = async (authToken) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'x-auth-token': authToken
        }
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`,
        config
      );

      setUser(res.data);
      setError(null);
    } catch (err) {
      console.error('Error loading user:', err);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setError('Failed to authenticate user');
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ name, email, password });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`,
        body,
        config
      );

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser(res.data.token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response && err.response.data.errors
          ? err.response.data.errors[0].msg
          : 'Registration failed'
      );
      setLoading(false);
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`,
        body,
        config
      );

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser(res.data.token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response && err.response.data.errors
          ? err.response.data.errors[0].msg
          : 'Invalid credentials'
      );
      setLoading(false);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
