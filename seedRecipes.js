// Recipe Seed Script for WhatAboutDinner App
// This script populates the database with an initial set of recipes
// Run with: node scripts/seedRecipes.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup environment variables
dotenv.config();

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Recipe model
import Recipe from '../models/Recipe.js';

// MongoDB connection with increased timeout and options
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log(`Using URI: ${process.env.MONGODB_URI}`);
    
    // Add connection options to improve reliability
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout
      connectTimeoutMS: 30000, // Increase connection timeout
      maxPoolSize: 10, // Limit pool size
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample recipes data
const recipes = [
  // BREAKFAST RECIPES
  {
    title: "Classic Avocado Toast",
    description: "A simple, nutritious breakfast that's quick to prepare and infinitely customizable.",
    ingredients: [
      { name: "bread", quantity: "2", unit: "slices", notes: "whole grain or sourdough" },
      { name: "avocado", quantity: "1", unit: "medium", notes: "ripe" },
      { name: "lemon juice", quantity: "1", unit: "teaspoon" },
      { name: "salt", quantity: "1/4", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/8", unit: "teaspoon", notes: "freshly ground" },
      { name: "red pepper flakes", quantity: "1/8", unit: "teaspoon", notes: "optional" }
    ],
    steps: [
      { order: 1, instruction: "Toast the bread slices until golden and crisp." },
      { order: 2, instruction: "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl." },
      { order: 3, instruction: "Add lemon juice, salt, and pepper to the avocado and mash with a fork to desired consistency." },
      { order: 4, instruction: "Spread the avocado mixture evenly on the toast slices." },
      { order: 5, instruction: "Sprinkle with red pepper flakes if desired and serve immediately." }
    ],
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "American",
    categories: ["Quick & Easy", "Healthy", "Vegetarian"],
    dietaryCategories: ["Vegetarian", "Vegan", "Dairy-Free"],
    tags: ["avocado", "toast", "healthy", "quick breakfast"],
    imageUrl: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    isPublic: true
  },
  {
    title: "Fluffy Blueberry Pancakes",
    description: "Light and fluffy pancakes studded with fresh blueberries, perfect for a weekend breakfast.",
    ingredients: [
      { name: "all-purpose flour", quantity: "1", unit: "cup" },
      { name: "sugar", quantity: "2", unit: "tablespoons" },
      { name: "baking powder", quantity: "2", unit: "teaspoons" },
      { name: "salt", quantity: "1/4", unit: "teaspoon" },
      { name: "milk", quantity: "3/4", unit: "cup" },
      { name: "egg", quantity: "1", unit: "large" },
      { name: "butter", quantity: "2", unit: "tablespoons", notes: "melted" },
      { name: "vanilla extract", quantity: "1", unit: "teaspoon" },
      { name: "blueberries", quantity: "1", unit: "cup", notes: "fresh or frozen" },
      { name: "maple syrup", quantity: "1/4", unit: "cup", notes: "for serving" }
    ],
    steps: [
      { order: 1, instruction: "In a large bowl, whisk together flour, sugar, baking powder, and salt." },
      { order: 2, instruction: "In another bowl, whisk together milk, egg, melted butter, and vanilla extract." },
      { order: 3, instruction: "Pour the wet ingredients into the dry ingredients and stir just until combined. Do not overmix." },
      { order: 4, instruction: "Gently fold in the blueberries." },
      { order: 5, instruction: "Heat a griddle or non-stick pan over medium heat. Lightly grease with butter or cooking spray." },
      { order: 6, instruction: "Pour 1/4 cup of batter onto the griddle for each pancake." },
      { order: 7, instruction: "Cook until bubbles form on the surface, then flip and cook until golden brown on the other side." },
      { order: 8, instruction: "Serve warm with maple syrup." }
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "American",
    categories: ["Weekend Breakfast", "Family Favorite"],
    dietaryCategories: ["Vegetarian"],
    tags: ["pancakes", "blueberry", "breakfast", "brunch"],
    imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    isPublic: true
  },
  {
    title: "Mediterranean Breakfast Bowl",
    description: "A protein-packed breakfast bowl with Mediterranean flavors featuring eggs, hummus, and fresh vegetables.",
    ingredients: [
      { name: "eggs", quantity: "2", unit: "large" },
      { name: "hummus", quantity: "1/4", unit: "cup" },
      { name: "cherry tomatoes", quantity: "1/2", unit: "cup", notes: "halved" },
      { name: "cucumber", quantity: "1/4", unit: "medium", notes: "diced" },
      { name: "kalamata olives", quantity: "10", unit: "", notes: "pitted and halved" },
      { name: "feta cheese", quantity: "2", unit: "tablespoons", notes: "crumbled" },
      { name: "olive oil", quantity: "1", unit: "teaspoon" },
      { name: "za'atar spice blend", quantity: "1/2", unit: "teaspoon", notes: "optional" },
      { name: "salt", quantity: "1/4", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/8", unit: "teaspoon" }
    ],
    steps: [
      { order: 1, instruction: "Cook eggs to your preference (poached, fried, or soft-boiled)." },
      { order: 2, instruction: "Spread hummus on the bottom of a serving bowl." },
      { order: 3, instruction: "Arrange tomatoes, cucumber, and olives around the edge of the bowl." },
      { order: 4, instruction: "Place the cooked eggs in the center of the bowl." },
      { order: 5, instruction: "Sprinkle with feta cheese, za'atar (if using), salt, and pepper." },
      { order: 6, instruction: "Drizzle with olive oil and serve immediately." }
    ],
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "Mediterranean",
    categories: ["Protein-Rich", "Healthy"],
    dietaryCategories: ["Gluten-Free", "Vegetarian"],
    tags: ["breakfast bowl", "mediterranean", "protein", "healthy"],
    imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
    isPublic: true
  },

  // LUNCH RECIPES
  {
    title: "Chicken Caesar Wrap",
    description: "A portable and delicious lunch option featuring grilled chicken, crisp romaine lettuce, and Caesar dressing wrapped in a tortilla.",
    ingredients: [
      { name: "chicken breast", quantity: "1", unit: "medium", notes: "grilled and sliced" },
      { name: "romaine lettuce", quantity: "2", unit: "cups", notes: "chopped" },
      { name: "parmesan cheese", quantity: "2", unit: "tablespoons", notes: "grated" },
      { name: "Caesar dressing", quantity: "2", unit: "tablespoons" },
      { name: "flour tortilla", quantity: "1", unit: "large", notes: "10-inch" },
      { name: "croutons", quantity: "1/4", unit: "cup", notes: "crushed" },
      { name: "black pepper", quantity: "1/8", unit: "teaspoon", notes: "freshly ground" }
    ],
    steps: [
      { order: 1, instruction: "In a bowl, toss the chopped romaine with Caesar dressing until well coated." },
      { order: 2, instruction: "Warm the tortilla slightly to make it more pliable." },
      { order: 3, instruction: "Lay the tortilla flat and place the dressed lettuce in the center." },
      { order: 4, instruction: "Top with sliced grilled chicken, crushed croutons, and grated parmesan." },
      { order: 5, instruction: "Season with black pepper." },
      { order: 6, instruction: "Fold in the sides of the tortilla, then roll tightly from the bottom up." },
      { order: 7, instruction: "Cut in half diagonally and serve immediately, or wrap in foil for a portable lunch." }
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    mealType: "Lunch",
    cuisine: "American",
    categories: ["Wraps", "Quick & Easy"],
    dietaryCategories: [],
    tags: ["chicken", "wrap", "caesar", "lunch"],
    imageUrl: "https://images.unsplash.com/photo-1550507992-eb63ffee0847",
    isPublic: true
  },
  {
    title: "Quinoa Vegetable Bowl",
    description: "A nutritious and colorful lunch bowl featuring protein-rich quinoa and roasted vegetables.",
    ingredients: [
      { name: "quinoa", quantity: "1/2", unit: "cup", notes: "rinsed" },
      { name: "water", quantity: "1", unit: "cup" },
      { name: "bell peppers", quantity: "1", unit: "medium", notes: "assorted colors, diced" },
      { name: "zucchini", quantity: "1", unit: "small", notes: "diced" },
      { name: "red onion", quantity: "1/4", unit: "medium", notes: "diced" },
      { name: "olive oil", quantity: "2", unit: "tablespoons", notes: "divided" },
      { name: "salt", quantity: "1/2", unit: "teaspoon", notes: "divided" },
      { name: "black pepper", quantity: "1/4", unit: "teaspoon", notes: "divided" },
      { name: "chickpeas", quantity: "1/2", unit: "cup", notes: "canned, drained and rinsed" },
      { name: "lemon juice", quantity: "1", unit: "tablespoon" },
      { name: "feta cheese", quantity: "2", unit: "tablespoons", notes: "crumbled (optional)" },
      { name: "fresh parsley", quantity: "1", unit: "tablespoon", notes: "chopped" }
    ],
    steps: [
      { order: 1, instruction: "Preheat oven to 425°F (220°C)." },
      { order: 2, instruction: "In a saucepan, combine quinoa and water. Bring to a boil, then reduce heat, cover, and simmer for 15 minutes until water is absorbed." },
      { order: 3, instruction: "On a baking sheet, toss bell peppers, zucchini, and red onion with 1 tablespoon olive oil, 1/4 teaspoon salt, and 1/8 teaspoon black pepper." },
      { order: 4, instruction: "Roast vegetables in the preheated oven for 15-20 minutes, stirring halfway through." },
      { order: 5, instruction: "Fluff the cooked quinoa with a fork and season with remaining salt and pepper." },
      { order: 6, instruction: "In a bowl, combine quinoa, roasted vegetables, and chickpeas." },
      { order: 7, instruction: "Drizzle with remaining olive oil and lemon juice, then toss to combine." },
      { order: 8, instruction: "Top with crumbled feta cheese (if using) and chopped parsley before serving." }
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    mealType: "Lunch",
    cuisine: "Mediterranean",
    categories: ["Bowls", "Healthy", "Meal Prep"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["quinoa", "vegetable", "bowl", "healthy", "meal prep"],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    isPublic: true
  },

  // DINNER RECIPES
  {
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with a rich and meaty tomato sauce.",
    ingredients: [
      { name: "spaghetti", quantity: "1", unit: "pound" },
      { name: "ground beef", quantity: "1", unit: "pound" },
      { name: "onion", quantity: "1", unit: "medium", notes: "finely chopped" },
      { name: "carrot", quantity: "1", unit: "medium", notes: "finely chopped" },
      { name: "celery", quantity: "1", unit: "stalk", notes: "finely chopped" },
      { name: "garlic", quantity: "3", unit: "cloves", notes: "minced" },
      { name: "tomato paste", quantity: "2", unit: "tablespoons" },
      { name: "crushed tomatoes", quantity: "28", unit: "ounces", notes: "canned" },
      { name: "beef broth", quantity: "1/2", unit: "cup" },
      { name: "red wine", quantity: "1/2", unit: "cup", notes: "optional" },
      { name: "dried oregano", quantity: "1", unit: "teaspoon" },
      { name: "dried basil", quantity: "1", unit: "teaspoon" },
      { name: "bay leaf", quantity: "1" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/2", unit: "teaspoon" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "parmesan cheese", quantity: "1/4", unit: "cup", notes: "grated, for serving" },
      { name: "fresh basil", quantity: "2", unit: "tablespoons", notes: "chopped, for garnish" }
    ],
    steps: [
      { order: 1, instruction: "Heat olive oil in a large pot over medium heat. Add onion, carrot, and celery, and cook until softened, about 5 minutes." },
      { order: 2, instruction: "Add garlic and cook for another minute until fragrant." },
      { order: 3, instruction: "Increase heat to medium-high and add ground beef. Cook, breaking it up with a spoon, until browned." },
      { order: 4, instruction: "Stir in tomato paste and cook for 1-2 minutes." },
      { order: 5, instruction: "Add red wine (if using) and cook until mostly evaporated, about 3 minutes." },
      { order: 6, instruction: "Add crushed tomatoes, beef broth, dried herbs, bay leaf, salt, and pepper. Stir to combine." },
      { order: 7, instruction: "Reduce heat to low, cover, and simmer for at least 30 minutes (or up to 2 hours for deeper flavor), stirring occasionally." },
      { order: 8, instruction: "Meanwhile, cook spaghetti according to package instructions until al dente." },
      { order: 9, instruction: "Drain pasta and return to pot." },
      { order: 10, instruction: "Remove bay leaf from sauce. Taste and adjust seasoning if needed." },
      { order: 11, instruction: "Serve sauce over spaghetti, topped with grated parmesan cheese and fresh basil." }
    ],
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: "Medium",
    mealType: "Dinner",
    cuisine: "Italian",
    categories: ["Pasta", "Family Dinner", "Comfort Food"],
    dietaryCategories: [],
    tags: ["pasta", "italian", "beef", "tomato sauce"],
    imageUrl: "https://images.unsplash.com/photo-1622973536968-3ead9e780960",
    isPublic: true
  },
  {
    title: "Vegetable Stir-Fry with Tofu",
    description: "A colorful and nutritious stir-fry featuring crispy tofu and fresh vegetables in a savory sauce.",
    ingredients: [
      { name: "extra-firm tofu", quantity: "14", unit: "ounces", notes: "pressed and cubed" },
      { name: "cornstarch", quantity: "2", unit: "tablespoons" },
      { name: "broccoli florets", quantity: "2", unit: "cups" },
      { name: "red bell pepper", quantity: "1", unit: "medium", notes: "sliced" },
      { name: "carrots", quantity: "2", unit: "medium", notes: "julienned" },
      { name: "snow peas", quantity: "1", unit: "cup" },
      { name: "garlic", quantity: "3", unit: "cloves", notes: "minced" },
      { name: "ginger", quantity: "1", unit: "tablespoon", notes: "minced" },
      { name: "vegetable oil", quantity: "3", unit: "tablespoons", notes: "divided" },
      { name: "soy sauce", quantity: "3", unit: "tablespoons", notes: "low-sodium" },
      { name: "rice vinegar", quantity: "1", unit: "tablespoon" },
      { name: "sesame oil", quantity: "1", unit: "teaspoon" },
      { name: "maple syrup or honey", quantity: "1", unit: "tablespoon" },
      { name: "vegetable broth", quantity: "1/4", unit: "cup" },
      { name: "cornstarch", quantity: "1", unit: "teaspoon", notes: "for sauce" },
      { name: "water", quantity: "1", unit: "tablespoon", notes: "for sauce" },
      { name: "sesame seeds", quantity: "1", unit: "tablespoon", notes: "for garnish" },
      { name: "green onions", quantity: "2", unit: "", notes: "sliced, for garnish" },
      { name: "cooked rice", quantity: "2", unit: "cups", notes: "for serving" }
    ],
    steps: [
      { order: 1, instruction: "Pat tofu dry with paper towels. Cut into 1-inch cubes and toss with 2 tablespoons cornstarch until coated." },
      { order: 2, instruction: "Heat 2 tablespoons vegetable oil in a large wok or skillet over medium-high heat. Add tofu and cook until golden and crispy on all sides, about 5-7 minutes. Remove to a plate lined with paper towels." },
      { order: 3, instruction: "In the same wok, add remaining 1 tablespoon oil. Add garlic and ginger, and stir-fry for 30 seconds until fragrant." },
      { order: 4, instruction: "Add broccoli and carrots, stir-fry for 3 minutes." },
      { order: 5, instruction: "Add bell pepper and snow peas, stir-fry for another 2 minutes until vegetables are crisp-tender." },
      { order: 6, instruction: "In a small bowl, whisk together soy sauce, rice vinegar, sesame oil, maple syrup, and vegetable broth." },
      { order: 7, instruction: "In another small bowl, mix 1 teaspoon cornstarch with 1 tablespoon water to create a slurry." },
      { order: 8, instruction: "Pour the sauce mixture into the wok and bring to a simmer." },
      { order: 9, instruction: "Add the cornstarch slurry and stir until the sauce thickens, about 1 minute." },
      { order: 10, instruction: "Return the tofu to the wok and toss to coat with the sauce and vegetables." },
      { order: 11, instruction: "Garnish with sesame seeds and green onions." },
      { order: 12, instruction: "Serve hot over cooked rice." }
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    mealType: "Dinner",
    cuisine: "Asian",
    categories: ["Stir-Fry", "Healthy", "Quick Dinner"],
    dietaryCategories: ["Vegetarian", "Vegan", "Dairy-Free"],
    tags: ["tofu", "stir-fry", "vegetables", "asian"],
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    isPublic: true
  },
  {
    title: "Baked Salmon with Lemon-Dill Sauce",
    description: "Tender baked salmon fillets topped with a creamy lemon-dill sauce, perfect for a healthy weeknight dinner.",
    ingredients: [
      { name: "salmon fillets", quantity: "4", unit: "6-ounce", notes: "skin-on" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/2", unit: "teaspoon" },
      { name: "garlic powder", quantity: "1/2", unit: "teaspoon" },
      { name: "lemon", quantity: "1", unit: "", notes: "half sliced, half juiced" },
      { name: "Greek yogurt", quantity: "1/2", unit: "cup", notes: "plain" },
      { name: "fresh dill", quantity: "2", unit: "tablespoons", notes: "chopped" },
      { name: "dijon mustard", quantity: "1", unit: "teaspoon" },
      { name: "honey", quantity: "1", unit: "teaspoon" },
      { name: "garlic", quantity: "1", unit: "clove", notes: "minced" }
    ],
    steps: [
      { order: 1, instruction: "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper." },
      { order: 2, instruction: "Place salmon fillets skin-side down on the prepared baking sheet." },
      { order: 3, instruction: "Brush salmon with 1 tablespoon olive oil and season with salt, pepper, and garlic powder." },
      { order: 4, instruction: "Place lemon slices on top of or alongside the salmon." },
      { order: 5, instruction: "Bake for 12-15 minutes, until salmon flakes easily with a fork but is still moist." },
      { order: 6, instruction: "While salmon is baking, prepare the sauce: In a small bowl, combine Greek yogurt, remaining olive oil, lemon juice, chopped dill, dijon mustard, honey, minced garlic, and a pinch of salt and pepper." },
      { order: 7, instruction: "Whisk sauce ingredients until smooth and well combined." },
      { order: 8, instruction: "When salmon is done, transfer to serving plates and top each fillet with a generous spoonful of the lemon-dill sauce." },
      { order: 9, instruction: "Garnish with additional fresh dill and lemon slices if desired." }
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dinner",
    cuisine: "American",
    categories: ["Seafood", "Healthy", "Quick Dinner"],
    dietaryCategories: ["Gluten-Free", "High-Protein", "Low-Carb"],
    tags: ["salmon", "fish", "healthy", "baked"],
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    isPublic: true
  },

  // DESSERT RECIPES
  {
    title: "Classic Chocolate Chip Cookies",
    description: "Soft and chewy chocolate chip cookies with crisp edges and melty chocolate chips.",
    ingredients: [
      { name: "all-purpose flour", quantity: "2 1/4", unit: "cups" },
      { name: "baking soda", quantity: "1", unit: "teaspoon" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "unsalted butter", quantity: "1", unit: "cup", notes: "softened" },
      { name: "granulated sugar", quantity: "3/4", unit: "cup" },
      { name: "brown sugar", quantity: "3/4", unit: "cup", notes: "packed" },
      { name: "vanilla extract", quantity: "2", unit: "teaspoons" },
      { name: "eggs", quantity: "2", unit: "large" },
      { name: "semi-sweet chocolate chips", quantity: "2", unit: "cups" },
      { name: "walnuts or pecans", quantity: "1", unit: "cup", notes: "chopped, optional" }
    ],
    steps: [
      { order: 1, instruction: "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper." },
      { order: 2, instruction: "In a small bowl, whisk together flour, baking soda, and salt." },
      { order: 3, instruction: "In a large bowl, beat butter, granulated sugar, brown sugar, and vanilla extract until creamy." },
      { order: 4, instruction: "Add eggs one at a time, beating well after each addition." },
      { order: 5, instruction: "Gradually beat in flour mixture until just combined." },
      { order: 6, instruction: "Stir in chocolate chips and nuts (if using)." },
      { order: 7, instruction: "Drop rounded tablespoons of dough onto prepared baking sheets, spacing them about 2 inches apart." },
      { order: 8, instruction: "Bake for 9-11 minutes or until golden brown." },
      { order: 9, instruction: "Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely." }
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 36,
    difficulty: "Easy",
    mealType: "Dessert",
    cuisine: "American",
    categories: ["Cookies", "Baking", "Family Favorite"],
    dietaryCategories: ["Vegetarian"],
    tags: ["chocolate chip", "cookies", "baking", "dessert"],
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    isPublic: true
  },
  {
    title: "Fresh Berry Parfait",
    description: "A light and refreshing dessert featuring layers of yogurt, fresh berries, and crunchy granola.",
    ingredients: [
      { name: "Greek yogurt", quantity: "2", unit: "cups", notes: "plain or vanilla" },
      { name: "honey", quantity: "2", unit: "tablespoons", notes: "plus more to taste" },
      { name: "vanilla extract", quantity: "1/2", unit: "teaspoon" },
      { name: "strawberries", quantity: "1", unit: "cup", notes: "hulled and sliced" },
      { name: "blueberries", quantity: "1", unit: "cup" },
      { name: "raspberries", quantity: "1", unit: "cup" },
      { name: "granola", quantity: "1", unit: "cup" },
      { name: "mint leaves", quantity: "4", unit: "", notes: "for garnish, optional" }
    ],
    steps: [
      { order: 1, instruction: "In a bowl, mix Greek yogurt with honey and vanilla extract until well combined." },
      { order: 2, instruction: "In clear serving glasses or bowls, begin layering: start with 2 tablespoons of yogurt mixture at the bottom." },
      { order: 3, instruction: "Add a layer of mixed berries." },
      { order: 4, instruction: "Sprinkle a layer of granola." },
      { order: 5, instruction: "Repeat the layers until the glasses are filled, ending with berries on top." },
      { order: 6, instruction: "Drizzle with additional honey if desired." },
      { order: 7, instruction: "Garnish with mint leaves if using." },
      { order: 8, instruction: "Serve immediately to keep the granola crunchy, or refrigerate for up to 2 hours before serving." }
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dessert",
    cuisine: "American",
    categories: ["No-Bake", "Healthy", "Quick & Easy"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["parfait", "berries", "yogurt", "healthy dessert"],
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    isPublic: true
  },

  // VEGETARIAN RECIPES
  {
    title: "Mushroom and Spinach Risotto",
    description: "A creamy Italian rice dish with sautéed mushrooms, spinach, and parmesan cheese.",
    ingredients: [
      { name: "arborio rice", quantity: "1 1/2", unit: "cups" },
      { name: "mushrooms", quantity: "8", unit: "ounces", notes: "cremini or button, sliced" },
      { name: "shallots", quantity: "2", unit: "medium", notes: "finely chopped" },
      { name: "garlic", quantity: "3", unit: "cloves", notes: "minced" },
      { name: "fresh spinach", quantity: "4", unit: "cups", notes: "packed" },
      { name: "vegetable broth", quantity: "6", unit: "cups", notes: "warm" },
      { name: "white wine", quantity: "1/2", unit: "cup", notes: "dry" },
      { name: "butter", quantity: "3", unit: "tablespoons", notes: "divided" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "parmesan cheese", quantity: "1/2", unit: "cup", notes: "freshly grated" },
      { name: "fresh thyme", quantity: "1", unit: "tablespoon", notes: "leaves only" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/2", unit: "teaspoon" }
    ],
    steps: [
      { order: 1, instruction: "In a large pot or Dutch oven, heat 1 tablespoon butter and olive oil over medium heat." },
      { order: 2, instruction: "Add mushrooms and cook until browned and their liquid has evaporated, about 5-7 minutes. Remove to a plate." },
      { order: 3, instruction: "In the same pot, add 1 tablespoon butter. Add shallots and cook until softened, about 3 minutes." },
      { order: 4, instruction: "Add garlic and cook for 30 seconds until fragrant." },
      { order: 5, instruction: "Add arborio rice and stir to coat with butter and oil. Toast the rice for 1-2 minutes." },
      { order: 6, instruction: "Pour in white wine and stir until absorbed." },
      { order: 7, instruction: "Begin adding warm vegetable broth, one ladle at a time, stirring frequently. Wait until each addition is absorbed before adding more." },
      { order: 8, instruction: "Continue this process for about 18-20 minutes, until rice is creamy and al dente." },
      { order: 9, instruction: "Stir in the cooked mushrooms, spinach, remaining 1 tablespoon butter, parmesan cheese, and thyme." },
      { order: 10, instruction: "Cook until spinach is wilted, about 2 minutes." },
      { order: 11, instruction: "Season with salt and pepper to taste." },
      { order: 12, instruction: "Serve immediately, topped with additional parmesan cheese if desired." }
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    mealType: "Dinner",
    cuisine: "Italian",
    categories: ["Risotto", "Comfort Food"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["risotto", "mushroom", "spinach", "italian"],
    imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    isPublic: true
  },

  // VEGAN RECIPES
  {
    title: "Chickpea Curry",
    description: "A flavorful and protein-rich vegan curry with chickpeas, tomatoes, and aromatic spices.",
    ingredients: [
      { name: "chickpeas", quantity: "2", unit: "15-ounce cans", notes: "drained and rinsed" },
      { name: "onion", quantity: "1", unit: "large", notes: "finely chopped" },
      { name: "garlic", quantity: "4", unit: "cloves", notes: "minced" },
      { name: "ginger", quantity: "1", unit: "tablespoon", notes: "freshly grated" },
      { name: "tomatoes", quantity: "1", unit: "14-ounce can", notes: "diced" },
      { name: "coconut milk", quantity: "1", unit: "14-ounce can" },
      { name: "vegetable broth", quantity: "1/2", unit: "cup" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "ground cumin", quantity: "2", unit: "teaspoons" },
      { name: "ground coriander", quantity: "1", unit: "teaspoon" },
      { name: "turmeric", quantity: "1", unit: "teaspoon" },
      { name: "garam masala", quantity: "1", unit: "teaspoon" },
      { name: "cayenne pepper", quantity: "1/4", unit: "teaspoon", notes: "adjust to taste" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "fresh cilantro", quantity: "1/4", unit: "cup", notes: "chopped" },
      { name: "lime", quantity: "1", unit: "", notes: "cut into wedges for serving" },
      { name: "cooked rice", quantity: "3", unit: "cups", notes: "for serving" }
    ],
    steps: [
      { order: 1, instruction: "Heat olive oil in a large pot over medium heat." },
      { order: 2, instruction: "Add onion and cook until softened, about 5 minutes." },
      { order: 3, instruction: "Add garlic and ginger, cook for 1 minute until fragrant." },
      { order: 4, instruction: "Add cumin, coriander, turmeric, garam masala, and cayenne pepper. Stir and cook for 30 seconds to toast the spices." },
      { order: 5, instruction: "Add diced tomatoes and cook for 3-4 minutes, stirring occasionally." },
      { order: 6, instruction: "Add chickpeas, coconut milk, vegetable broth, and salt. Stir to combine." },
      { order: 7, instruction: "Bring to a simmer, then reduce heat to low and cook, uncovered, for 15-20 minutes, stirring occasionally." },
      { order: 8, instruction: "If the curry is too thick, add a little more vegetable broth. If too thin, simmer longer to reduce." },
      { order: 9, instruction: "Taste and adjust seasoning as needed." },
      { order: 10, instruction: "Stir in half of the chopped cilantro." },
      { order: 11, instruction: "Serve over cooked rice, garnished with remaining cilantro and lime wedges." }
    ],
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dinner",
    cuisine: "Indian",
    categories: ["Curry", "One-Pot"],
    dietaryCategories: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    tags: ["chickpea", "curry", "indian", "vegan"],
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    isPublic: true
  },

  // GLUTEN-FREE RECIPES
  {
    title: "Zucchini Noodles with Pesto",
    description: "Fresh zucchini noodles tossed with homemade basil pesto for a light and healthy gluten-free meal.",
    ingredients: [
      { name: "zucchini", quantity: "4", unit: "medium", notes: "spiralized" },
      { name: "cherry tomatoes", quantity: "1", unit: "cup", notes: "halved" },
      { name: "fresh basil leaves", quantity: "2", unit: "cups", notes: "packed" },
      { name: "pine nuts", quantity: "1/3", unit: "cup", notes: "plus more for garnish" },
      { name: "garlic", quantity: "2", unit: "cloves" },
      { name: "parmesan cheese", quantity: "1/2", unit: "cup", notes: "grated" },
      { name: "olive oil", quantity: "1/2", unit: "cup", notes: "plus 1 tablespoon" },
      { name: "lemon juice", quantity: "1", unit: "tablespoon" },
      { name: "salt", quantity: "1/2", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/4", unit: "teaspoon" },
      { name: "red pepper flakes", quantity: "1/8", unit: "teaspoon", notes: "optional" }
    ],
    steps: [
      { order: 1, instruction: "Make the pesto: In a food processor, combine basil, pine nuts, garlic, parmesan cheese, lemon juice, salt, and pepper. Pulse until coarsely chopped." },
      { order: 2, instruction: "With the processor running, slowly pour in 1/2 cup olive oil until the mixture is smooth and well combined. Set aside." },
      { order: 3, instruction: "Heat 1 tablespoon olive oil in a large skillet over medium heat." },
      { order: 4, instruction: "Add spiralized zucchini noodles and cook for 2-3 minutes, tossing frequently, until just tender but still crisp." },
      { order: 5, instruction: "Remove from heat and drain any excess liquid." },
      { order: 6, instruction: "In a large bowl, toss the zucchini noodles with 3-4 tablespoons of the prepared pesto (or more to taste)." },
      { order: 7, instruction: "Gently fold in the cherry tomatoes." },
      { order: 8, instruction: "Season with additional salt and pepper if needed." },
      { order: 9, instruction: "Serve immediately, garnished with additional pine nuts, parmesan cheese, and red pepper flakes if desired." },
      { order: 10, instruction: "Store any remaining pesto in an airtight container in the refrigerator for up to 5 days." }
    ],
    prepTime: 15,
    cookTime: 5,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dinner",
    cuisine: "Italian",
    categories: ["Low-Carb", "Quick & Easy"],
    dietaryCategories: ["Vegetarian", "Gluten-Free", "Low-Carb"],
    tags: ["zucchini noodles", "pesto", "healthy", "gluten-free"],
    imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77",
    isPublic: true
  }
];

// Function to seed recipes with better error handling
const seedRecipes = async () => {
  try {
    console.log('Starting recipe seeding process...');
    
    // Create admin user ID for recipe creation
    const adminUserId = new mongoose.Types.ObjectId();
    console.log(`Using admin user ID: ${adminUserId} for recipe creation`);
    
    // Add createdBy field to all recipes
    const recipesWithCreator = recipes.map(recipe => ({
      ...recipe,
      createdBy: adminUserId
    }));
    
    try {
      // First attempt to check if connection is working by getting count
      console.log('Testing database connection with a simple query...');
      const count = await Recipe.countDocuments({}).maxTimeMS(5000);
      console.log(`Current recipe count: ${count}`);
      
      // Delete existing recipes with increased timeout
      console.log('Deleting existing recipes...');
      await Recipe.deleteMany({}).maxTimeMS(20000);
      console.log('Deleted existing recipes');
      
      // Insert recipes in smaller batches to avoid timeouts
      console.log(`Inserting ${recipesWithCreator.length} recipes in batches...`);
      const batchSize = 3;
      for (let i = 0; i < recipesWithCreator.length; i += batchSize) {
        const batch = recipesWithCreator.slice(i, i + batchSize);
        console.log(`Inserting batch ${i/batchSize + 1} (${batch.length} recipes)...`);
        await Recipe.insertMany(batch, { timeout: 30000 });
        console.log(`Batch ${i/batchSize + 1} inserted successfully`);
      }
      
      console.log(`Successfully seeded ${recipesWithCreator.length} recipes`);
      
      // Log recipe categories for verification
      const mealTypes = await Recipe.distinct('mealType');
      console.log('Meal types added:', mealTypes);
      
      const cuisines = await Recipe.distinct('cuisine');
      console.log('Cuisines added:', cuisines);
      
      const categories = await Recipe.distinct('categories');
      console.log('Categories added:', categories.flat());
      
      const dietaryCategories = await Recipe.distinct('dietaryCategories');
      console.log('Dietary categories added:', dietaryCategories.flat());
      
    } catch (error) {
      console.error('Error during recipe operations:', error);
      
      // Try individual inserts if batch insert fails
      if (error.message.includes('timeout') || error.message.includes('buffering')) {
        console.log('Attempting individual recipe inserts as fallback...');
        let successCount = 0;
        
        for (const recipe of recipesWithCreator) {
          try {
            const newRecipe = new Recipe(recipe);
            await newRecipe.save({ timeout: 10000 });
            successCount++;
            console.log(`Successfully inserted recipe: ${recipe.title}`);
          } catch (recipeError) {
            console.error(`Failed to insert recipe ${recipe.title}:`, recipeError.message);
          }
        }
        
        console.log(`Fallback method: Successfully inserted ${successCount} out of ${recipesWithCreator.length} recipes`);
      } else {
        throw error; // Re-throw if it's not a timeout error
      }
    }
  } catch (error) {
    console.error('Error seeding recipes:', error);
  }
};

// Main function with better error handling
const main = async () => {
  try {
    await connectDB();
    await seedRecipes();
    console.log('Database seeding completed successfully');
    
    // Verify seeding results
    try {
      const count = await Recipe.countDocuments({});
      console.log(`Final verification: Database contains ${count} recipes`);
      
      if (count > 0) {
        const sampleRecipe = await Recipe.findOne({}).lean();
        console.log('Sample recipe title:', sampleRecipe.title);
      }
    } catch (verifyError) {
      console.error('Error verifying seeding results:', verifyError);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error in database seeding:', error);
    process.exit(1);
  }
};

// Run the main function
main();
