import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import RecipeCard from "../components/recipeCard";
import "../style/homepage.css";
import axios from "axios";
import pic004 from "../assets/pic004.png";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes");
      if (Array.isArray(response.data)) {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // 默认显示所有食谱
      } else {
        console.error("Unexpected data format:", response.data);
        setRecipes([]);
        setFilteredRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
      setFilteredRecipes([]);
    }
  };

  const handleCategoryFilter = (category) => {
    if (category === activeCategory) {
      // 如果再次点击已激活的类别，则复原显示所有食谱
      setFilteredRecipes(recipes);
      setActiveCategory("");
    } else {
      // 否则根据类别过滤食谱
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered);
      setActiveCategory(category);
    }
  };

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      // 如果搜索关键字为空，加载所有菜谱
      fetchRecipes();
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/searchString/${query}`
      );
      if (Array.isArray(response.data)) {
        setFilteredRecipes(response.data); // 更新搜索结果
      } else {
        setFilteredRecipes([]);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      setFilteredRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="homenavbar">
        <Navbar currentPageLink="/home" onSearch={handleSearch} />
      </div>

      <div className="category-navigation">
        <button
          className={`category-button ${activeCategory === "Appetizers" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Appetizers")}
        >
          Appetizers
        </button>
        <button
          className={`category-button ${activeCategory === "Main Courses" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Main Courses")}
        >
          Main Courses
        </button>
        <button
          className={`category-button ${activeCategory === "Desserts" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Desserts")}
        >
          Desserts
        </button>
        <button
          className={`category-button ${activeCategory === "Beverages" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Beverages")}
        >
          Beverages
        </button>
      </div>

      <div className="home-container">
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipeID}
              id={recipe.recipeID}
              // image={recipe.pictureID+'.png'}
              image={'http://localhost:5000/'+recipe.pictureID+'.jpg'}
              name={recipe.name}
              author={recipe.author || "Unknown Author"}
              userId={recipe.userID}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
