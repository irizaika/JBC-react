import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL || "https://localhost:7037/api/auth";

  // LOGIN
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        username,
        password,
      });

      if (response.data.isSuccess) {
        const loginData = response.data.result;

        // Save JWT + user
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        setUser(loginData.user);
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // REGISTER
  const register = async (email, password, name, role = "USER") => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/register`, {
        email: email,
        name: name,
        phoneNumber: "1234567788",
        password: password,
        role: role
      });

      if (response.data.isSuccess) {
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
