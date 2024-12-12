import express from "express";
import path from "path";
import multer from "multer";
import db from "../db.js"; // Database connection
import auth from "../middlewares/auth.js"; // Authentication middleware

const router = express.Router();

// 自定义存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 指定存储目录
  },
  filename: (req, file, cb) => {
    const pictureID = `pic-${Date.now()}`; // 使用自定义命名规则
    const fileExtension = path.extname(file.originalname); // 获取文件扩展名
    cb(null, `${pictureID}${fileExtension}`); // 设置文件名为 pictureID+扩展名
  },
});

const upload = multer({ storage });

// 创建新食谱
router.post("/recipes", auth, upload.single("image"), async (req, res) => {
  const { name, content, category, ingredients } = req.body;
  const userId = req.userId; // 从认证中获取 userID
  const imagePath = req.file ? req.file.path : null; // 获取图片路径

  if (!name || !content || !category || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const recipeID = Date.now().toString();
    let pictureID = null;

    if (imagePath) {
      // 从文件名中提取 pictureID（不包括扩展名）
      pictureID = path.basename(req.file.filename, path.extname(req.file.filename));

      // 插入图片记录到数据库
      await db.query("INSERT INTO pictures (pictureID, url) VALUES (?, ?)", [
        pictureID,
        imagePath,
      ]);
    }
    // 插入食谱记录到 recipes 表
    await db.query(
      "INSERT INTO recipes (recipeID, pictureID, userID, name, content, category) VALUES (?, ?, ?, ?, ?, ?)",
      [recipeID, pictureID, userId, name, content, category]
    );
    console.log(`req: ${req}`);
    console.log(`ingredients: ${ingredients}`);
    if(ingredients) {
      const ingredientArr = JSON.parse(ingredients);
      for (let i = 0; i < ingredientArr.length; i++) {
        const ingredient = ingredientArr[i];
        console.log(`ingredient: `, ingredient);
        const [ingredientTemp] = await db.query("SELECT * FROM ingredients WHERE name = ?", [ingredient.name]);
        console.log(`ingredientTemp:`, ingredientTemp);
        // 插入食谱原料关联表
        await db.query(
          "INSERT INTO recipe_ingredients (ingredientID, recipeID, optional, unit, methods, quantity) VALUES (?, ?, ?, ?, ?, ?)",
          [ingredientTemp[0].ingredientID, recipeID, ingredient.optional, ingredient.unit, ingredient.method, ingredient.quantity]
        );
      }
    }

    

    res.status(201).json({
      message: "Recipe added successfully",
      recipeID,
      userId,
      name,
      content,
      category,
      pictureID,
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// 获取所有食谱
router.get("/recipes", async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes");
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 根据搜索条件获取食谱
router.get("/recipes/searchString/:string", async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes where name like ?", ["%" + req.params.string + "%",]);
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 获取随机食谱
router.get("/recipes/random", async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes");
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes available" });
    }
    const randomIndex = Math.floor(Math.random() * recipes.length);
    res.json(recipes[randomIndex]);
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 根据id获取食谱
router.get("/recipes/:id", async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes WHERE recipeID = ?", [
      req.params.id,
    ]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes available" });
    }
    res.json(recipes[0]);
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 删除食谱
router.delete("/recipes/:id", auth, async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes WHERE recipeID = ?", [
      req.params.id,
    ]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipes[0].userID !== req.userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await db.query("DELETE FROM recipes WHERE recipeID = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
