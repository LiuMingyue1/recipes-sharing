import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";
import commentIcon from "../assets/comment.svg";
import "../style/detail.css";

const Detail = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipeResponse = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
        const recipeData = recipeResponse.data;
        setRecipe(recipeData);

        const userResponse = await axios.get(`http://localhost:5000/api/users/${recipeData.userID}`);
        setAuthorName(userResponse.data.name);

        const commentsResponse = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/comments`);
        const commentData = await Promise.all(
          commentsResponse.data.map(async (comment) => {
            const userResponse = await axios.get(`http://localhost:5000/api/users/${comment.userID}`);
            return { ...comment, username: userResponse.data.name };
          })
        );
        setComments(commentData);

        const ingredientsResponse = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/ingredients`);
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          ingredients: ingredientsResponse.data,
        }));

        const userId = localStorage.getItem("userId");
        const likeStatusResponse = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/${userId}/like-status`);
        setIsLiked(likeStatusResponse.data[0] ? likeStatusResponse.data[0].status:0);

        // const currentUserResponse = await axios.get("http://localhost:5000/api/auth/check", {
        //   headers: { "user-id": localStorage.getItem("userId") },
        // });
        // setUserName(currentUserResponse.data.name || "Unknown User");
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Unable to fetch recipe details. Please try again later.");
      }
    };

    fetchRecipeData();
  }, [recipeId]);

  const handleLikeToggle = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      if (isLiked) {
        await axios.delete(`http://localhost:5000/api/recipes/${recipeId}/like`, {
          headers: { "user-id": userId },
        });
      } else {
        await axios.post(`http://localhost:5000/api/recipes/${recipeId}/like`, {}, {
          headers: { "user-id": userId },
        });
      }
      setIsLiked(!isLiked);
	  alert("Set like success!");
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/recipes/${recipeId}/comments`,
        { content: newComment },
        { headers: { "user-id": userId } }
      );
      setComments([
        ...comments,
        {
          commentID: Date.now().toString(),
          userID: userId,
          username: userName,
          commentDate: new Date().toISOString(),
          content: newComment,
        },
      ]);
      setNewComment("");
      setShowCommentModal(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <Navbar currentPageLink="/recipes" hideSearch={true} />
      <div className="recipe-detail">
        <div className="detail-left">
          <div className="detail-image-container">
            <img src={'http://localhost:5000/'+recipe.pictureID+'.jpg'} alt={recipe.name} className="detail-image" />
          </div>
          <div className="detail-comments">
            <ul>
              {comments.map((comment) => (
                <li key={comment.commentID} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-username">{comment.username}</span>
                    <span className="comment-date">
                      {new Date(comment.commentDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-header-fixed">
            <div className="detail-header">
              <h1>{recipe.name}</h1>
              <div className="detail-icons">
                <img
                  src={isLiked ? likedIcon : likeIcon}
                  alt={isLiked ? "Liked" : "Like"}
                  className="icon"
                  onClick={handleLikeToggle}
                />
                <img
                  src={commentIcon}
                  alt="Comment"
                  className="icon"
                  onClick={() => setShowCommentModal(true)}
                />
              </div>
            </div>
            <div className="author-section">
              <Link to={`/profile/${recipe.userID}`} className="recipe-author-link">
                <p>By {authorName || "Unknown Author"}</p>
              </Link>
            </div>
          </div>
          <div className="detail-scrollable">
            <hr />
            <h3 className="section-title">Ingredients:</h3>
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <strong>{ingredient.name}</strong> - {`${ingredient.quantity}${ingredient.unit}`}
                    {ingredient.methods && <span> {ingredient.methods}</span>}
                    {ingredient.optional ? <span> (Optional)</span> : null}
                  </li>
                ))}
            </ul>
            <hr />
            <h3 className="section-title">Steps:</h3>
            <ol>
              {recipe.content
                ? recipe.content.split(/(?:\d+\.\s)/).filter(Boolean).map((step, index) => (
                    <li key={index}>{step.trim()}</li>
                  ))
                : <li>No steps available.</li>}
            </ol>
          </div>

        </div>
      </div>

      {showCommentModal && (
        <div className="comment-modal">
          <div className="modal-content">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment..."
            />
            <div className="modal-actions">
              <button onClick={handleCommentSubmit}>Submit</button>
              <button onClick={() => setShowCommentModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
