import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import navsearchIcon from "../assets/navsearch.svg";
import navaddIcon from "../assets/navadd.svg";
import navuserIcon from "../assets/navuser.svg";
import navlikeIcon from "../assets/navlike.svg";
import "../style/navbar.css";

const Navbar = ({ currentPageLink, onSearch }) => {
  const { user } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      onSearch(""); 
    }
  };

  return (
    <div className={`navbar ${currentPageLink !== "/home" ? "no-search" : ""}`}>
      {/* 搜索框，仅在 Homepage 显示 */}
      {currentPageLink === "/home" && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search Recipes or Ingredients"
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <img
            src={navsearchIcon}
            alt="Search Icon"
            className="search-icon"
            onClick={handleSearchClick}
          />
        </div>
      )}

      {/* 中间 LOGO 按钮 */}
      <div className="navbar-center">
        <Link to="/home" className="navbar-logo-button">
          co-eater
        </Link>
      </div>

      {/* 右侧图标 */}
      <div className="navbar-right">
        <Link to="/add">
          <img src={navaddIcon} alt="Add Icon" className="navbar-icon" />
        </Link>
        <Link to={userId ? `/profile/${userId}` : "/login"}>
          <img src={navuserIcon} alt="User Icon" className="navbar-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
