import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  // const { user } = useContext(AuthContext);
  const { userId } = localStorage.getItem('userId');
  if (!userId) {
    // 如果用户未登录，重定向到登录页面
    return <Navigate to="/login" replace />;
  }

  return children; // 如果已登录，渲染子组件
};

export default ProtectedRoute;
