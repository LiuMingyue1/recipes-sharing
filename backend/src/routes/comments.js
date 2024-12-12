import express from 'express';
import db from '../db.js'; // Database connection
import auth from '../middlewares/auth.js'; // Authentication middleware

const router = express.Router();

// Add a comment
router.post('/recipes/:id/comments', auth, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.userId;
  const { content } = req.body;

  try {
    // Check if the recipe exists
    const [recipes] = await db.query('SELECT * FROM recipes WHERE recipeID = ?', [recipeId]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Insert new comment into the database
    const commentID = Date.now().toString();
    const commentDate = new Date();
    await db.query('INSERT INTO comments (commentID, userID, recipeID, commentDate, content) VALUES (?, ?, ?, ?, ?)', [
      commentID,
      userId,
      recipeId,
      commentDate,
      content,
    ]);

    res.status(201).json({ commentID, userId, recipeId, content, commentDate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get comments for a specific recipe
router.get('/recipes/:id/comments', async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Retrieve comments for the recipe from the database
    const [comments] = await db.query('SELECT * FROM comments WHERE recipeID = ? ORDER BY commentDate DESC', [recipeId]);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
