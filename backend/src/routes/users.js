import express from 'express';
import db from '../db.js'; // Database connection
import multer from 'multer';
import auth from '../middlewares/auth.js'; // Authentication middleware

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Register
router.post('/users', upload.single('avatar'), async (req, res) => {
  const { email, phone, password, age, gender } = req.body;
  const avatarPath = req.file ? req.file.path : null;

  try {
    // Check email duplicate
    const [emailCheck] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (emailCheck.length > 0) {
      return res.status(400).json({ message: 'Email address is already in use' });
    }

    // Check phone duplicate
    const [phoneCheck] = await db.query('SELECT * FROM users WHERE phoneNum = ?', [phone]);
    if (phoneCheck.length > 0) {
      return res.status(400).json({ message: 'Phone number is already in use' });
    }

    // Insert new user into the database
    const userID = Date.now().toString();
    await db.query('INSERT INTO users (userID, email, phoneNum, password, age, gender) VALUES (?, ?, ?, ?, ?, ?)', [
      userID,
      email,
      phone,
      password,
      age,
      gender,
    ]);

    res.status(201).json({ userID, email, phone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if email is available
router.get('/users/check-email', async (req, res) => {
  const { email } = req.query;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    res.json({ available: rows.length === 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if phone number is available
router.get('/users/check-phone', async (req, res) => {
  const { phone } = req.query;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE phoneNum = ?', [phone]);
    res.json({ available: rows.length === 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Log in
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    const userId = users[0].userID; // 获取用户ID

    // 返回用户ID
    res.json({ userId }); // 仅返回用户ID
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Edit avatar
router.put('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
  const userId = req.userId;
  const avatarPath = req.file ? req.file.path : null;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE userID = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.query('UPDATE users SET avatarID = ? WHERE userID = ?', [avatarPath, userId]);
    res.json({ userId, avatar: avatarPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get liked recipes
router.get('/users/:userId/liked-recipes', async (req, res) => {
  try {
    const [likedRecipes] = await db.query(
      `SELECT recipes.* FROM likes
       JOIN recipes ON likes.recipeID = recipes.recipeID
       WHERE likes.userID = ?`,
      [req.params.userId]
    );
    res.json(likedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get published recipes
router.get('/users/:userId/my-recipes', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [recipes] = await db.query('SELECT * FROM recipes WHERE userID = ?', [userId]);
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check user login status
router.get('/auth/check', async (req, res) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).json({ isLoggedIn: false });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE userID = ?', [userId]);
    res.json({ isLoggedIn: users.length > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get total likes received by the user
router.get('/users/total-likes', auth, async (req, res) => {
  const userId = req.userId;

  try {
    const [totalLikes] = await db.query(`
      SELECT COUNT(*) AS totalLikes FROM likes
      JOIN recipes ON likes.recipeID = recipes.recipeID
      WHERE recipes.userID = ?`, [userId]);

    res.json({ totalLikes: totalLikes[0].totalLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const userId = String(req.params.userId); // 确保 userId 是字符串
    console.log("Received userId:", userId);

    const [users] = await db.query('SELECT * FROM users WHERE userID = ?', [userId]);
    console.log("Query result:", users);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error("Error in GET /users/:userId:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});





export default router;
