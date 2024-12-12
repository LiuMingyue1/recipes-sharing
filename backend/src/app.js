import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import recipesRoutes from './routes/recipes.js'; 
import usersRoutes from './routes/users.js'; 
import commentsRoutes from './routes/comments.js';
import likesRoutes from './routes/likes.js';
import testRoutes from './routes/testRoutes.js';
import ingredientsRoutes from './routes/ingredients.js';

const app = express();

// Middleware
app.use(cors()); // Allow Cross-Origin requests for React app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./uploads"));

// Routes
app.use('/api', recipesRoutes); 
app.use('/api', usersRoutes); 
app.use('/api', commentsRoutes);
app.use('/api', likesRoutes); 
app.use('/api', testRoutes);
app.use('/api', ingredientsRoutes);


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http:/localhost/:${PORT}`);
});
