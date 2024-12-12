import express from 'express';
import db from '../db.js'; // 确保正确导入数据库连接

const router = express.Router();

// 数据库测试路由
router.get('/test-db', async (req, res) => {
  try {
    const [result] = await db.query('SELECT 1');
    res.json({ message: 'Database connection successful', result });
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

export default router;
