import express from 'express';
import db from '../db.js'; // Database connection
import auth from '../middlewares/auth.js'; // Authentication middleware

const router = express.Router();

// Add a like
router.post('/recipes/:id/like', auth, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.userId;

  try {
    // Check if the recipe exists
    const [recipes] = await db.query('SELECT * FROM recipes WHERE recipeID = ?', [recipeId]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user has already liked the recipe
    const [existingLike] = await db.query('SELECT * FROM likes WHERE recipeID = ? AND userID = ?', [recipeId, userId]);
    if (existingLike.length > 0) {
      return res.status(400).json({ message: 'Already liked' });
    }

    // Add like to the database
    await db.query('INSERT INTO likes (likeID, recipeID, userID, time, status) VALUES (?, ?, ?, NOW(), 1)', [
      `${recipeId}-${userId}`,
      recipeId,
      userId,
    ]);

    // // Increment the like count for the recipe
    // await db.query('UPDATE recipes SET likes = likes + 1 WHERE recipeID = ?', [recipeId]);

    res.json({ message: 'Recipe liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a like
router.delete('/recipes/:id/like', auth, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.userId;

  try {
    // Check if the recipe exists
    const [recipes] = await db.query('SELECT * FROM recipes WHERE recipeID = ?', [recipeId]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the user has already liked the recipe
    const [existingLike] = await db.query('SELECT * FROM likes WHERE recipeID = ? AND userID = ?', [recipeId, userId]);
    if (existingLike.length === 0) {
      return res.status(400).json({ message: 'No like found to remove' });
    }

    // Remove like from the database
    await db.query('DELETE FROM likes WHERE recipeID = ? AND userID = ?', [recipeId, userId]);

    // // Decrement the like count for the recipe
    // await db.query('UPDATE recipes SET likes = likes - 1 WHERE recipeID = ?', [recipeId]);

    res.json({ message: 'Recipe unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get like-status for a specific recipe
router.get('/recipes/:recipeId/:userId/like-status', async (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;

  try {
    // Retrieve like-status for the recipe from the database
    const [likes] = await db.query('SELECT * FROM likes WHERE recipeID = ? and userID = ?', [recipeId, userId]);
    res.json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
