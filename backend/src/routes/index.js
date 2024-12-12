import express from 'express';

import recipesRoutes from './recipes.js';
import usersRoutes from './users.js';
import commentsRoutes from './comments.js';
import likesRoutes from './likes.js';

const router = express.Router();

router.use('/recipes', recipesRoutes);
router.use('/users', usersRoutes);
router.use('/comments', commentsRoutes);
router.use('/likes', likesRoutes);

export default router;
