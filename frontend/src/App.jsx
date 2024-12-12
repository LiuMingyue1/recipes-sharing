import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext"; // 引入 AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // 受保护路由
import Start from "./Pages/start";
import Profile from "./Pages/profile";
import Home from "./Pages/home";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Detail from "./Pages/detail";
import Add from "./Pages/add";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:recipeId" element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
