// Expanded Seed Script for WhatAboutDinner App (ES Module Version)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import recipe data
const importRecipes = async () => {
  console.log('Importing recipe data from expanded recipe files...'.cyan.bold);
  
  // Dynamic imports for all recipe files
  const recipeModules = [
    // Breakfast recipes
    './expanded/breakfast_hot.js',
    './expanded/breakfast_cold.js',
    './expanded/breakfast_baked_goods.js',
    './expanded/breakfast_beverages.js',
    
    // Lunch recipes
    './expanded/lunch_sandwiches_wraps.js',
    './expanded/lunch_salads.js',
    './expanded/lunch_soups.js',
    './expanded/lunch_quick_options.js',
    
    // Dinner recipes
    './expanded/dinner_meat_based.js',
    './expanded/dinner_seafood.js',
    './expanded/dinner_vegetarian_vegan.js',
    './expanded/dinner_international.js',
    
    // Dessert recipes
    './expanded/dessert_baked.js',
    './expanded/dessert_chilled.js',
    './expanded/dessert_fruit_based.js',
    './expanded/dessert_chocolate.js',
    
    // Snack recipes
    './expanded/snack_savory.js',
    './expanded/snack_sweet.js',
    './expanded/snack_protein.js',
    './expanded/snack_dips.js',
    
    // Appetizer recipes
    './expanded/appetizer_hot.js',
    './expanded/appetizer_cold.js',
    './expanded/appetizer_finger_foods.js',
    './expanded/appetizer_dips.js',
    
    // Drink recipes
    './expanded/drink_non_alcoholic.js',
    './expanded/drink_cocktails.js',
    './expanded/drink_smoothies.js',
    './expanded/drink_hot.js',
    
    // Other recipes
    './expanded/other_homemade_basics.js',
    './expanded/other_preserves.js',
    './expanded/other_sauces.js',
    './expanded/other_fermented.js'
  ];
  
  // Import Recipe model
  const { default: Recipe } = await import('../models/Recipe.js');
  
  // Load all recipe data
  let allRecipes = [];
  
  for (const modulePath of recipeModules) {
    try {
      const fullPath = path.join(__dirname, '..', 'recipes', modulePath);
      if (fs.existsSync(fullPath)) {
        const module = await import(fullPath);
        if (module.default && Array.isArray(module.default)) {
          console.log(`Loaded ${module.default.length} recipes from ${modulePath}`.green);
          allRecipes = [...allRecipes, ...module.default];
        } else {
          console.log(`No recipes found in ${modulePath}`.yellow);
        }
      } else {
        console.log(`Recipe file not found: ${fullPath}`.yellow);
      }
    } catch (error) {
      console.error(`Error importing recipes from ${modulePath}:`.red, error);
    }
  }
  
  console.log(`Total recipes loaded: ${allRecipes.length}`.cyan.bold);
  return allRecipes;
};

// Configure environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...'.cyan);
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000, // Increased timeout to 60 seconds
      socketTimeoutMS: 60000,
      connectTimeoutMS: 60000
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.green.bold);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    return false;
  }
};

// Seed database
const seedDatabase = async () => {
  console.log('Starting recipe seeding process...'.cyan.bold);
  
  try {
    // Test database connection first
    console.log('Testing database connection with a simple query...'.yellow);
    const { default: Recipe } = await import('../models/Recipe.js');
    await Recipe.countDocuments();
    console.log('Database connection test successful'.green);
    
    // Clear existing recipes
    console.log('Clearing existing recipes...'.yellow);
    await Recipe.deleteMany({});
    console.log('Existing recipes cleared'.green);
    
    // Import recipes
    const recipes = await importRecipes();
    
    if (recipes.length === 0) {
      console.log('No recipes to seed'.yellow);
      return;
    }
    
    console.log(`Preparing to seed ${recipes.length} recipes...`.cyan);
    
    // Seed in batches of 20 to avoid overwhelming the database
    const batchSize = 20;
    const batches = [];
    
    for (let i = 0; i < recipes.length; i += batchSize) {
      batches.push(recipes.slice(i, i + batchSize));
    }
    
    console.log(`Split into ${batches.length} batches of up to ${batchSize} recipes each`.green);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each batch
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      try {
        console.log(`Processing batch ${i + 1} of ${batches.length}...`.yellow);
        await Recipe.insertMany(batch, { ordered: false });
        successCount += batch.length;
        console.log(`Batch ${i + 1} completed successfully`.green);
      } catch (error) {
        console.error(`Error with batch ${i + 1}:`.red, error);
        console.log('Attempting individual inserts for this batch...'.yellow);
        
        // Try individual inserts if batch fails
        for (const recipe of batch) {
          try {
            await Recipe.create(recipe);
            successCount++;
          } catch (err) {
            console.error(`Error inserting recipe "${recipe.title}":`.red, err.message);
            errorCount++;
          }
        }
      }
      
      // Status update
      console.log(`Progress: ${successCount} recipes seeded successfully, ${errorCount} errors`.cyan);
    }
    
    console.log(`Database seeding completed with ${successCount} successes and ${errorCount} errors`.cyan.bold);
    
    // Verify seeding
    const count = await Recipe.countDocuments();
    console.log(`Total recipes in database: ${count}`.green.bold);
    
  } catch (error) {
    console.error(`Error seeding recipes: ${error}`.red.bold);
  }
};

// Main execution
const main = async () => {
  const connected = await connectDB();
  
  if (connected) {
    await seedDatabase();
    console.log('Seed script execution completed'.green.bold);
  } else {
    console.error('Cannot proceed with seeding due to database connection failure'.red.bold);
  }
  
  // Disconnect from database
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB'.yellow);
  } catch (error) {
    console.error('Error disconnecting from MongoDB:'.red, error);
  }
  
  process.exit(0);
};

main();
