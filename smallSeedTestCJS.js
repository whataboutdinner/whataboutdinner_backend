const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');

dotenv.config();

const testRecipes = [
  {
    title: "Test Recipe 1",
    description: "A test recipe",
    ingredients: [{ name: "test ingredient", quantity: "1", unit: "cup" }],
    steps: [{ order: 1, instruction: "Test instruction" }],
    cookingVessel: "Test vessel",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dinner",
    cuisine: "American",
    categories: ["Test"],
    dietaryCategories: ["Vegetarian"]
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Recipe.create(testRecipes);
  })
  .then(result => {
    console.log('Test recipe seeded successfully!');
    console.log('Your database is fully operational.');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error during test seed:');
    console.error(err);
    mongoose.disconnect();
  });
