import React from "react";
import "../style/startpage.css";
import { Link, useNavigate } from "react-router-dom";
import randomIcon from "../assets/random.svg";
import coeaterIcon from "../assets/co-eater.svg";
import axios from "axios";

const Start = () => {
  const navigate = useNavigate();

  const handleRandomPick = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes/random");
      if (response.data && response.data.recipeID) {
        navigate(`/recipes/${response.data.recipeID}`);
      } else {
        alert("No recipes available.");
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      alert("Failed to fetch a random recipe. Please try again later.");
    }
  };

  return (
    <>
      <div className="background">
        <div className="startNavbar">
          <div className="startIcons"></div>
          <img src={coeaterIcon} alt="coeaters Icon" className="coeatericon" />
          <div className="startLinks">
            <Link to="/home" className="homebutton1">
              Recipes
            </Link>
            <Link to="/login" className="loginbutton">
              Login
            </Link>
          </div>
        </div>

        <div className="startMain">
          <h1 className="mealtime">Meal Time!</h1>
          <h5 className="solgan">Enter ingredients to get recommended recipes.</h5>
          <div className="startlinks-container">
            <Link to="/home" className="homebutton">
              Get Recipes
            </Link>
            <button className="detialbutton" onClick={handleRandomPick}>
              <img src={randomIcon} alt="Random Icon" className="icon" />
              <span>Random Pick</span>
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Start;
