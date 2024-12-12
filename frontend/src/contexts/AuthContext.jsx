import React, { createContext, useState, useEffect } from "react";

// 创建 AuthContext
export const AuthContext = createContext();

// 提供 AuthContext 的组件
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 从 localStorage 中读取用户信息（如果存在）
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 登录方法
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 存储到 localStorage
    localStorage.setItem("userId", userData.userId); // 保存用户ID
    localStorage.setItem("authToken", userData.token); // 保存认证令牌
  };

  // 登出方法
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 清除 localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
