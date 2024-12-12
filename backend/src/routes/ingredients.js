import express from 'express';
import db from '../db.js'; // Database connection

const router = express.Router();

// Get ingredients for a specific recipe
router.get('/recipes/:id/ingredients', async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Retrieve ingredients for the recipe from the database
    const [ingredients] = 
    await db.query('SELECT * FROM recipe_ingredients ri left join ingredients i on ri.ingredientID = i.ingredientID WHERE ri.recipeID = ? ORDER BY ri.ingredientID DESC', [recipeId]);
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
