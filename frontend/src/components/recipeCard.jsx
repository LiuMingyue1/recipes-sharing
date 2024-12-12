import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // 确保 axios 已导入
import { Link } from "react-router-dom";
import "../style/recipeCard.css";

const images = import.meta.glob("../assets/*.png", { eager: true });

const RecipeCard = ({ image, name, id, userId }) => {
  const [authorName, setAuthorName] = useState("Loading...");

  useEffect(() => {
    let isMounted = true; // 标记组件是否仍在挂载状态

    const fetchAuthorName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (isMounted && response.data.name) {
          setAuthorName(response.data.name); // 更新作者名称
        } else {
          setAuthorName("Unknown Author"); // 确保接口无数据时有默认值
        }
      } catch (error) {
        console.error("Error fetching author name:", error);
        if (isMounted) setAuthorName("Unknown Author");
      }
    };

    fetchAuthorName();

    return () => {
      isMounted = false; // 组件卸载时设置为 false，避免状态更新警告
    };
  }, [userId]);

  const imageSrc = images[`../assets/${image.split("/").pop()}`]?.default || image;

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`} className="recipe-image-link">
        <img src={imageSrc} alt={name} className="recipe-image" />
      </Link>
      <div className="recipe-details">
        <Link to={`/recipes/${id}`} className="recipe-name-link">
          <h3 className="recipe-name">{name}</h3>
        </Link>
        <Link to={`/profile/${userId}`} className="recipe-author-link">
          <p className="recipe-author">By {authorName}</p>
        </Link>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default RecipeCard;
