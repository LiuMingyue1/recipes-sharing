import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../style/addpage.css";
import axios from "axios";
// import recipeID from "../../../backend/src/routes/recipes";

const Add = () => {
  const [recipeName, setRecipeName] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState([{ name: '', optional: false, unit: '', quantity: '', method: '' }]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State for preview image
  const [category, setCategory] = useState("");
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleAddRecipe = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You must be logged in to add a recipe.");
        return navigate("/login");
      }
  
      const formData = new FormData();
      formData.append("name", recipeName);
      formData.append("content", content);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }
  
      const response = await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "user-id": userId,
        },
      });
  
      const { pictureID, recipeID } = response.data; // 获取后端返回的 pictureID 和 recipeID
      console.log("Picture ID:", pictureID); // 在控制台打印 pictureID
      console.log("Recipe ID:", recipeID); // 在控制台打印 recipeID
  
      alert("Recipe added successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert(`Failed to add recipe. ${error.response?.data?.message || error.message}`);
    }
  };
  
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Use FileReader to generate a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', optional: false, unit: '', quantity: '', method: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="add-page">
      <Navbar currentPageLink="/add" />

      <div className="add-content">
        <div className="add-pic">
          <label className="image-upload-label">
            Click to upload an image
            <input
              type="file"
              id="image"
              onChange={handleImageChange} // Update image change handler
              className="image-upload"
              style={{ display: 'none' }}
            />
          </label>
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>
        <div className="recipe-table">
          <table>
            <thead>
              <tr>
                <th>Ingredients</th>
                <th>Optional</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ingredient.optional}
                      onChange={(e) => handleIngredientChange(index, 'optional', e.target.checked)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ingredient.method}
                      onChange={(e) => handleIngredientChange(index, 'method', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddIngredient} className="add-ingredient-button">
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="form-group">
        {['Appetizers', 'Main Courses', 'Desserts', 'Beverages'].map((cat) => (
          <button
            key={cat}
            className={`button ${category === cat ? 'selected-button' : ''}`}
            onClick={() => handleCategorySelection(cat)}
          >
            {cat}
          </button>
        ))}
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter the text..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the text..."
        />
      </div>
      <button className="add-button" onClick={handleAddRecipe}>
        Complete
      </button>
    </div>
  );
};

export default Add;
