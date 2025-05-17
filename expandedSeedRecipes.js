// Expanded Seed Script for WhatAboutDinner App
// This script populates the database with 640 recipes across 8 categories

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import recipe data from all category files
import breakfastHotRecipes from '../recipes/expanded/breakfast_hot.js';
import breakfastColdRecipes from '../recipes/expanded/breakfast_cold.js';
import breakfastBakedGoodsRecipes from '../recipes/expanded/breakfast_baked_goods.js';
import breakfastBeveragesRecipes from '../recipes/expanded/breakfast_beverages.js';

import lunchSandwichesWrapsRecipes from '../recipes/expanded/lunch_sandwiches_wraps.js';
import lunchSaladsRecipes from '../recipes/expanded/lunch_salads.js';
import lunchSoupsRecipes from '../recipes/expanded/lunch_soups.js';
import lunchQuickOptionsRecipes from '../recipes/expanded/lunch_quick_options.js';

import dinnerMeatBasedRecipes from '../recipes/expanded/dinner_meat_based.js';
import dinnerSeafoodRecipes from '../recipes/expanded/dinner_seafood.js';
import dinnerVegetarianVeganRecipes from '../recipes/expanded/dinner_vegetarian_vegan.js';
import dinnerInternationalRecipes from '../recipes/expanded/dinner_international.js';

import dessertBakedRecipes from '../recipes/expanded/dessert_baked.js';
import dessertChilledRecipes from '../recipes/expanded/dessert_chilled.js';
import dessertFruitBasedRecipes from '../recipes/expanded/dessert_fruit_based.js';
import dessertChocolateRecipes from '../recipes/expanded/dessert_chocolate.js';

import snackSavoryRecipes from '../recipes/expanded/snack_savory.js';
import snackSweetRecipes from '../recipes/expanded/snack_sweet.js';
import snackProteinRecipes from '../recipes/expanded/snack_protein.js';
import snackDipsRecipes from '../recipes/expanded/snack_dips.js';

import appetizerHotRecipes from '../recipes/expanded/appetizer_hot.js';
import appetizerColdRecipes from '../recipes/expanded/appetizer_cold.js';
import appetizerFingerFoodsRecipes from '../recipes/expanded/appetizer_finger_foods.js';
import appetizerDipsRecipes from '../recipes/expanded/appetizer_dips.js';

import drinkNonAlcoholicRecipes from '../recipes/expanded/drink_non_alcoholic.js';
import drinkCocktailsRecipes from '../recipes/expanded/drink_cocktails.js';
import drinkSmoothiesRecipes from '../recipes/expanded/drink_smoothies.js';
import drinkHotRecipes from '../recipes/expanded/drink_hot.js';

import otherHomemadeBasicsRecipes from '../recipes/expanded/other_homemade_basics.js';
import otherPreservesRecipes from '../recipes/expanded/other_preserves.js';
import otherSaucesRecipes from '../recipes/expanded/other_sauces.js';
import otherFermentedRecipes from '../recipes/expanded/other_fermented.js';

// Load environment variables
dotenv.config();

// Get Recipe model
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Recipe = (await import(path.join(__dirname, '../models/Recipe.js'))).default;

// Connect to MongoDB with increased timeout
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...'.yellow);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout to 30 seconds
      socketTimeoutMS: 45000, // Increased socket timeout
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    return false;
  }
};

// Combine all recipes into a single array
const allRecipes = [
  ...breakfastHotRecipes,
  ...breakfastColdRecipes,
  ...breakfastBakedGoodsRecipes,
  ...breakfastBeveragesRecipes,
  
  ...lunchSandwichesWrapsRecipes,
  ...lunchSaladsRecipes,
  ...lunchSoupsRecipes,
  ...lunchQuickOptionsRecipes,
  
  ...dinnerMeatBasedRecipes,
  ...dinnerSeafoodRecipes,
  ...dinnerVegetarianVeganRecipes,
  ...dinnerInternationalRecipes,
  
  ...dessertBakedRecipes,
  ...dessertChilledRecipes,
  ...dessertFruitBasedRecipes,
  ...dessertChocolateRecipes,
  
  ...snackSavoryRecipes,
  ...snackSweetRecipes,
  ...snackProteinRecipes,
  ...snackDipsRecipes,
  
  ...appetizerHotRecipes,
  ...appetizerColdRecipes,
  ...appetizerFingerFoodsRecipes,
  ...appetizerDipsRecipes,
  
  ...drinkNonAlcoholicRecipes,
  ...drinkCocktailsRecipes,
  ...drinkSmoothiesRecipes,
  ...drinkHotRecipes,
  
  ...otherHomemadeBasicsRecipes,
  ...otherPreservesRecipes,
  ...otherSaucesRecipes,
  ...otherFermentedRecipes
];

// Function to seed recipes in batches
const seedRecipes = async () => {
  try {
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      console.error('Failed to connect to MongoDB. Exiting seed script.'.red.bold);
      process.exit(1);
    }
    
    console.log('Starting recipe seeding process...'.green);
    
    // Test database connection with a simple query
    console.log('Testing database connection with a simple query...'.yellow);
    try {
      const count = await Recipe.countDocuments();
      console.log(`Current recipe count in database: ${count}`.cyan);
    } catch (error) {
      console.error(`Error during database test query: ${error.message}`.red);
      process.exit(1);
    }
    
    // Delete existing recipes
    console.log('Deleting existing recipes...'.yellow);
    await Recipe.deleteMany({});
    console.log('Existing recipes deleted.'.green);
    
    // Seed recipes in batches of 20 to avoid overwhelming the database
    const batchSize = 20;
    const totalRecipes = allRecipes.length;
    const batches = Math.ceil(totalRecipes / batchSize);
    
    console.log(`Seeding ${totalRecipes} recipes in ${batches} batches...`.cyan);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, totalRecipes);
      const batch = allRecipes.slice(start, end);
      
      console.log(`Processing batch ${i+1} of ${batches} (recipes ${start+1}-${end})...`.yellow);
      
      try {
        await Recipe.insertMany(batch, { ordered: false });
        successCount += batch.length;
        console.log(`Batch ${i+1} completed successfully.`.green);
      } catch (error) {
        console.error(`Error in batch ${i+1}: ${error.message}`.red);
        
        // If batch insert fails, try individual inserts
        console.log('Attempting individual inserts for this batch...'.yellow);
        for (const recipe of batch) {
          try {
            await new Recipe(recipe).save();
            successCount++;
          } catch (recipeError) {
            console.error(`Failed to insert recipe "${recipe.title}": ${recipeError.message}`.red);
            errorCount++;
          }
        }
      }
      
      // Small delay between batches to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`Seeding completed: ${successCount} recipes added successfully, ${errorCount} failed.`.cyan.bold);
    
    // Verify final count
    const finalCount = await Recipe.countDocuments();
    console.log(`Final recipe count in database: ${finalCount}`.green.bold);
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.'.yellow);
    
    console.log('Recipe seeding process completed.'.green.bold);
    
  } catch (error) {
    console.error(`Error seeding recipes: ${error.message}`.red.bold);
    
    // Attempt to disconnect from database
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB after error.'.yellow);
    } catch (disconnectError) {
      console.error(`Error disconnecting from MongoDB: ${disconnectError.message}`.red);
    }
    
    process.exit(1);
  }
};

// Execute the seed function
seedRecipes();
