import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import RecipeCard from "../components/recipeCard";
import "../style/profile.css";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [viewMode, setViewMode] = useState("publish");

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in params");
      return;
    }

    const fetchProfileData = async () => {
      try {
        // Fetch user data
        const userInfoResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setProfileData(userInfoResponse.data);

        // Fetch recipes data
        const endpoint =
          viewMode === "publish"
            ? `http://localhost:5000/api/users/${userId}/my-recipes`
            : `http://localhost:5000/api/users/${userId}/liked-recipes`;
        const recipesResponse = await axios.get(endpoint);
        setRecipes(recipesResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId, viewMode]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container-custom">
      <Navbar currentPageLink={`/profile/${userId}`} hideSearch={true} />
      <div className="profile-card-custom">
        <img
          src={profileData.avatarID ? 'http://localhost:5000/'+profileData.avatarID+'.jpg' : "/src/assets/avatar.svg"}
          alt={profileData.name}
          className="profile-avatar-custom"
        />
        <h2 className="profile-name-custom">{profileData.name}</h2>
        <div className="profile-info-group-custom">
          <div className="profile-info-item-custom">
            <span>ID:</span> {profileData.userID}
          </div>
          <div className="profile-info-item-custom">
            <span>Age:</span> {profileData.age || "N/A"}
          </div>
          <div className="profile-info-item-custom">
            <span>Email:</span> {profileData.email}
          </div>
        </div>
      </div>

      <div className="button-wrapper">
        <div className="button-group-custom">
          <button
            className={`toggle-button-custom ${viewMode === "publish" ? "active" : ""}`}
            onClick={() => setViewMode("publish")}
          >
            Published Recipes
          </button>
          <button
            className={`toggle-button-custom ${viewMode === "like" ? "active" : ""}`}
            onClick={() => setViewMode("like")}
          >
            Liked Recipes
          </button>
        </div>
      </div>

      <div className="profile-recipe-section">
        <div className="profile-recipe-list-custom">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipeID}
              id={recipe.recipeID}
              image={'http://localhost:5000/'+recipe.pictureID+'.jpg'}
              name={recipe.name}
              author={recipe.author}
              userId={recipe.userID}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
