import React from "react";
import LoginForm from "../components/loginform";
import Navbar from "../components/navbar";

const Login = () => {
  
  return (
    <div style={{ backgroundColor: "#FFF8DC", minHeight: "100vh" }}>
      <Navbar currentPageLink={`/login`} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
