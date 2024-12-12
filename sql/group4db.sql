CREATE database group4db;

-- DROP DATABASE group4db;
use group4db;

-- CREATE SCHEMA recipe;

DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pictures;

CREATE TABLE pictures(
	pictureID VARCHAR(30) PRIMARY KEY,
	url VARCHAR(100),
	usage_info VARCHAR(30)
	);

CREATE TABLE users(
	userID VARCHAR(30) PRIMARY KEY,
	name VARCHAR(30),
	gender VARCHAR(30),
	age INT,
	email VARCHAR(30),
	phoneNum VARCHAR(30),
	password VARCHAR(30),
	avatarID VARCHAR(30),
	FOREIGN KEY (avatarID) REFERENCES pictures(pictureID)
	);

CREATE TABLE recipes(
	recipeID VARCHAR(30) PRIMARY KEY,
	pictureID VARCHAR(30),
	userID VARCHAR(30),
	name VARCHAR(100),
	content TEXT,
	category VARCHAR(50),
	FOREIGN KEY (pictureID) REFERENCES pictures(pictureID),
	FOREIGN KEY (userID) REFERENCES users(userID)
	);

CREATE TABLE ingredients(
	ingredientID VARCHAR(30) PRIMARY KEY,
	name VARCHAR(50)
	);

CREATE TABLE recipe_ingredients(
	ingredientID VARCHAR(30),
	recipeID VARCHAR(30),
	optional TINYINT,
	unit VARCHAR(30),
	methods VARCHAR(30),
	quantity INT,
	PRIMARY KEY (ingredientID, recipeID),
	FOREIGN KEY (ingredientID) REFERENCES ingredients(ingredientID),
	FOREIGN KEY (recipeID) REFERENCES recipes(recipeID)
	);

CREATE TABLE comments(
	commentID VARCHAR(30) PRIMARY KEY,
	userID VARCHAR(30),
	recipeID VARCHAR(30),
	commentDate DATETIME,
	content TEXT,
	FOREIGN KEY (userID) REFERENCES users(userID),
	FOREIGN KEY (recipeID) REFERENCES recipes(recipeID)
	);

CREATE TABLE likes(
	likeID VARCHAR(30) PRIMARY KEY,
	recipeID VARCHAR(30),
	userID VARCHAR(30),
	time DATETIME,
	status TINYINT,
	FOREIGN KEY (recipeID) REFERENCES recipes(recipeID),
	FOREIGN KEY (userID) REFERENCES users(userID)
	);


INSERT INTO pictures (pictureID, url, usage_info) 
VALUES
('pic001', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/a001.jpg', 'Avatar'),
('pic002', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r001.jpg', 'Recipes'),
('pic003', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/a002.png', 'Avatar'),
('pic004', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r002.jpg', 'Recipes'),
('pic005', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/a003.jpg', 'Avatar'),
('pic006', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r003.jpg', 'Recipes'),
('pic007', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/a004.jpg', 'Avatar'),
('pic008', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r004.jpg', 'Recipes'),
('pic009', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/a005.jpg', 'Avatar'),
('pic010', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r005.jpg', 'Recipes'),
('pic011', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r006.jpg', 'Recipes'),
('pic012', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r007.jpg', 'Recipes'),
('pic013', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r008.jpg', 'Recipes'),
('pic014', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r009.jpg', 'Recipes'),
('pic015', 'https://6224-fa24-g4.s3.us-east-1.amazonaws.com/r010.jpg', 'Recipes');


INSERT INTO users (userID, name, gender, age, email, phoneNum, password, avatarID)
VALUES
('101', 'Alice Johnson', 'female', 28, 'alice.johnson@example.com', '1234567890', '123456789', 'pic001'),
('103', 'Charlie Brown', 'male', 25, 'charlie.brown@example.com', '2345678901', '123456789', 'pic003'),
('104', 'Diana Lee', 'female', 30, 'diana.lee@example.com', '3456789012', '123456789', 'pic004'),
('102', 'Emma Smith', 'female', 24, 'emma.smith@example.com', '4567890123', '123456789', 'pic002'),
('105', 'Miller William', 'male', 32, 'miller.william@example.com', '5678901234', '123456789', 'pic005');

INSERT INTO recipes (recipeID, pictureID, userID, name, content, category) 
VALUES
('r001', 'pic002', '101', 'Spaghetti Bolognese', '1. Heat oil in a pan and sauté onions and garlic. 2. Add ground meat and cook until browned. 3. Stir in tomato paste and seasonings. 4. Simmer for 20 minutes. 5. Serve over cooked spaghetti.', 'Main Courses'),
('r002', 'pic004', '103', 'Chicken Curry', '1. Heat oil and fry onions until golden. 2. Add chicken pieces and cook until seared. 3. Stir in spices, coconut milk, and simmer. 4. Cook until the chicken is tender. 5. Serve with rice.', 'Main Courses'),
('r003', 'pic006', '104', 'Vegetable Stir Fry', '1. Heat oil in a wok and add garlic. 2. Add chopped vegetables and stir fry on high heat. 3. Add soy sauce and seasonings. 4. Stir until vegetables are cooked but crunchy. 5. Serve hot.', 'Main Courses'),
('r004', 'pic008', '102', 'Chocolate Cake', '1. Preheat oven to 180°C. 2. Mix flour, cocoa powder, and sugar. 3. Add eggs, butter, and milk to form a batter. 4. Pour into a greased pan and bake for 30 minutes. 5. Cool and frost.', 'Desserts'),
('r005', 'pic010', '105', 'Caesar Salad', '1. Chop lettuce and prepare croutons. 2. Mix dressing ingredients (lemon, olive oil, garlic, and parmesan). 3. Toss lettuce with dressing. 4. Add croutons and grated cheese. 5. Serve chilled.', 'Appetizers'),
('r006', 'pic011', '101', 'Margarita Pizza', '1. Prepare pizza dough and roll it out. 2. Spread tomato sauce over the base. 3. Add sliced mozzarella and fresh basil leaves. 4. Bake in a preheated oven at 220°C for 15 minutes.', 'Main Courses'),
('r007', 'pic012', '103', 'Fruit Salad', '1. Wash and peel the fruits as needed. 2. Chop all fruits into bite-sized pieces. 3. Mix them in a large bowl. 4. Optionally, drizzle with honey or lemon juice.', 'Appetizers'),
('r008', 'pic013', '104', 'Mango Smoothie', '1. Peel and dice the mangoes. 2. Add mangoes, milk, and sugar into a blender. 3. Blend until smooth. 4. Serve chilled.', 'Beverages'),
('r009', 'pic014', '102', 'Grilled Salmon', '1. Preheat the grill. 2. Season the salmon with salt, pepper, and herbs. 3. Place the salmon on the grill and cook for 5-7 minutes on each side. 4. Serve with lemon wedges.', 'Main Courses'),
('r010', 'pic015', '105', 'Vanilla Ice Cream', '1. Whisk eggs and sugar until pale. 2. Heat milk and cream, then mix with vanilla. 3. Combine with the egg mixture and churn in an ice cream maker.', 'Desserts');

INSERT INTO ingredients (ingredientID, name)
VALUES
('ing001', 'Tomato'),
('ing002', 'Chicken'),
('ing003', 'Onion'),
('ing004', 'Garlic'),
('ing005', 'Carrot'),
('ing006', 'Flour'),
('ing007', 'Egg'),
('ing008', 'Cheese'),
('ing009', 'Lettuce'),
('ing010', 'Chocolate');

INSERT INTO recipe_ingredients (ingredientID, recipeID, optional, unit, methods, quantity)
VALUES
('ing001', 'r001', 0, 'pcs', 'Chopped', 3),
('ing003', 'r001', 0, 'pcs', 'Chopped', 1),
('ing004', 'r001', 1, 'cloves', 'Minced', 2),
('ing002', 'r002', 0, 'g', 'Sliced', 500),
('ing005', 'r002', 1, 'pcs', 'Diced', 2),
('ing006', 'r004', 0, 'cups', 'Mixed', 2),
('ing007', 'r004', 0, 'pcs', 'Beaten', 3),
('ing010', 'r004', 0, 'g', 'Melted', 200),
('ing008', 'r005', 1, 'g', 'Grated', 50),
('ing009', 'r005', 0, 'pcs', 'Chopped', 1),
('ing001', 'r006', 0, 'pcs', 'Sliced', 3),
('ing008', 'r006', 0, 'g', 'Grated', 100),
('ing009', 'r007', 0, 'pcs', 'Chopped', 5),
('ing005', 'r007', 1, 'pcs', 'Diced', 2),
('ing001', 'r008', 0, 'pcs', 'Pureed', 2),
('ing010', 'r008', 1, 'ml', 'Blended', 100),
('ing002', 'r009', 0, 'g', 'Grilled', 300),
('ing004', 'r009', 1, 'pcs', 'Minced', 1),
('ing007', 'r010', 0, 'pcs', 'Whipped', 3),
('ing006', 'r010', 1, 'cups', 'Mixed', 1);

INSERT INTO comments (commentID, userID, recipeID, commentDate, content)
VALUES
('cmt001', '101', 'r001', '2024-11-21 10:00:00', 'Delicious recipe! My family loved it.'),
('cmt002', '103', 'r002', '2024-11-21 11:30:00', 'The chicken curry was amazing!'),
('cmt003', '104', 'r003', '2024-11-21 12:45:00', 'Healthy and easy to make.'),
('cmt004', '102', 'r004', '2024-11-21 13:15:00', 'Best chocolate cake ever!'),
('cmt005', '105', 'r005', '2024-11-21 14:00:00', 'The salad was so fresh and tasty.'),
('cmt006', '101', 'r006', '2024-11-21 15:00:00', 'The pizza was delicious and easy to make!'),
('cmt007', '102', 'r006', '2024-11-21 15:30:00', 'Loved the crispy crust and fresh toppings!'),
('cmt008', '103', 'r007', '2024-11-21 16:00:00', 'A great appetizer for summer parties!'),
('cmt009', '104', 'r007', '2024-11-21 16:30:00', 'Refreshing and healthy, perfect for hot days.'),
('cmt010', '105', 'r008', '2024-11-21 17:00:00', 'Smooth and creamy, my favorite smoothie!'),
('cmt011', '101', 'r008', '2024-11-21 17:30:00', 'The mango flavor is so rich!'),
('cmt012', '102', 'r009', '2024-11-21 18:00:00', 'The salmon was perfectly cooked!'),
('cmt013', '103', 'r009', '2024-11-21 18:30:00', 'Juicy and flavorful, a new favorite.'),
('cmt014', '104', 'r010', '2024-11-21 19:00:00', 'The vanilla flavor was so creamy!'),
('cmt015', '105', 'r010', '2024-11-21 19:30:00', 'Loved the texture and sweetness.');

INSERT INTO likes (likeID, recipeID, userID, time, status)
VALUES
('like001', 'r001', '101', '2024-11-21 10:15:00', 1),
('like002', 'r002', '103', '2024-11-21 11:45:00', 1),
('like003', 'r003', '104', '2024-11-21 12:50:00', 1),
('like004', 'r004', '102', '2024-11-21 13:30:00', 1),
('like005', 'r005', '105', '2024-11-21 14:15:00', 1),
('like006', 'r001', '103', '2024-11-21 10:20:00', 1),
('like007', 'r002', '104', '2024-11-21 11:50:00', 1),
('like008', 'r003', '105', '2024-11-21 12:55:00', 1),
('like009', 'r004', '101', '2024-11-21 13:35:00', 1),
('like010', 'r005', '102', '2024-11-21 14:20:00', 1),
('like011', 'r006', '101', '2024-11-21 15:05:00', 1),
('like012', 'r006', '102', '2024-11-21 15:35:00', 1),
('like013', 'r007', '103', '2024-11-21 16:05:00', 1),
('like014', 'r007', '104', '2024-11-21 16:35:00', 1),
('like015', 'r008', '105', '2024-11-21 17:05:00', 1),
('like016', 'r008', '101', '2024-11-21 17:35:00', 1),
('like017', 'r009', '102', '2024-11-21 18:05:00', 1),
('like018', 'r009', '103', '2024-11-21 18:35:00', 1),
('like019', 'r010', '104', '2024-11-21 19:05:00', 1),
('like020', 'r010', '105', '2024-11-21 19:35:00', 1);

SELECT * FROM group4db.recipes;
