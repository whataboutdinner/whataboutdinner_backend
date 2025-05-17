// File: /home/ubuntu/what_about_dinner_app/pages/api/suggestions.js
// This file outlines the backend logic for generating recipe and restaurant suggestions.

// import { MongoClient } from 'mongodb'; // Assuming MongoDB
// import { getSession } from 'next-auth/react'; // If using NextAuth for user sessions

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// async function connectDb() {
//   await client.connect();
//   return client.db("whataboutdinner");
// }

// Mock data for now - replace with actual DB calls and richer data models
const mockRecipes = [
  { id: 'r1', mealName: 'Spaghetti Carbonara', cuisineType: 'Italian', mainIngredients: ['Pasta', 'Eggs', 'Pancetta', 'Cheese'], tags: ['Classic', 'Comfort Food'] },
  { id: 'r2', mealName: 'Chicken Stir-fry', cuisineType: 'Asian', mainIngredients: ['Chicken', 'Vegetables', 'Soy Sauce', 'Rice'], tags: ['Quick', 'Healthy'] },
  { id: 'r3', mealName: 'Beef Tacos', cuisineType: 'Mexican', mainIngredients: ['Beef', 'Tortillas', 'Salsa', 'Cheese'], tags: ['Spicy', 'Fun'] },
  { id: 'r4', mealName: 'Margherita Pizza', cuisineType: 'Italian', mainIngredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'], tags: ['Vegetarian', 'Popular'] },
  { id: 'r5', mealName: 'Salmon with Roasted Asparagus', cuisineType: 'Healthy', mainIngredients: ['Salmon', 'Asparagus', 'Lemon', 'Herbs'], tags: ['Healthy', 'Omega-3'] },
  { id: 'r6', mealName: 'Vegetable Curry', cuisineType: 'Indian', mainIngredients: ['Mixed Vegetables', 'Coconut Milk', 'Spices', 'Rice'], tags: ['Vegetarian', 'Flavorful'] },
];

const mockRestaurants = [
  { id: 'rest1', restaurantName: 'Luigi_s Pizzeria', cuisineTypes: ['Pizza', 'Italian'], priceRange: '$$', rating: 4.5, location: 'Downtown' },
  { id: 'rest2', restaurantName: 'Golden Dragon', cuisineTypes: ['Chinese', 'Asian'], priceRange: '$$', rating: 4.2, location: 'Chinatown' },
  { id: 'rest3', restaurantName: 'Taco Fiesta', cuisineTypes: ['Mexican', 'Tex-Mex'], priceRange: '$', rating: 4.0, location: 'Uptown' },
  { id: 'rest4', restaurantName: 'The Green Bowl', cuisineTypes: ['Salads', 'Healthy', 'Vegetarian'], priceRange: '$$', rating: 4.8, location: 'Midtown' },
  { id: 'rest5', restaurantName: 'Burger Barn', cuisineTypes: ['Burgers', 'American'], priceRange: '$', rating: 3.9, location: 'Suburb' },
];

export default async function handler(req, res) {
  // const session = await getSession({ req }); // Get user session if suggestions are personalized
  // const userId = session?.user?.id;

  // const db = await connectDb();
  // const usersCollection = db.collection("users");
  // const partiesCollection = db.collection("parties");
  // const recipesCollection = db.collection("recipes"); // Assuming a dedicated recipes collection
  // const restaurantsCollection = db.collection("restaurants"); // Or integration with delivery API

  if (req.method === 'GET') {
    const { type, userId, partyId, location } = req.query; // type can be 'recipes' or 'restaurants'

    try {
      if (type === 'recipes') {
        // --- Recipe Voting Suggestions Logic ---
        // TODO: Fetch user's pastChosenMeals, likedCuisines, likedIngredients, dietaryRestrictions from DB based on userId/partyId
        // TODO: Fetch all available recipes from `recipesCollection` or use a predefined list like `mockRecipes`
        
        // Placeholder logic: return a random subset of mock recipes
        const shuffledRecipes = [...mockRecipes].sort(() => 0.5 - Math.random());
        const recipeSuggestions = shuffledRecipes.slice(0, 3);
        
        return res.status(200).json(recipeSuggestions);

      } else if (type === 'restaurants') {
        // --- Restaurant Order Suggestions Logic ---
        // TODO: Fetch user's pastOrderedRestaurants, preferredCuisines, preferredPriceRanges from DB based on userId
        // TODO: Integrate with a delivery service API based on `location` or use `mockRestaurants`

        // Placeholder logic: filter mock restaurants by a simple criteria (e.g., location if provided, or just return random)
        let restaurantSuggestions = [...mockRestaurants];
        if (location) {
          // restaurantSuggestions = restaurantSuggestions.filter(r => r.location.toLowerCase() === location.toLowerCase());
        }
        const shuffledRestaurants = restaurantSuggestions.sort(() => 0.5 - Math.random());
        restaurantSuggestions = shuffledRestaurants.slice(0, 3);

        return res.status(200).json(restaurantSuggestions);

      } else {
        return res.status(400).json({ message: 'Invalid suggestion type specified. Use "recipes" or "restaurants".' });
      }
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// TODO:
// - Implement actual database queries to fetch user history and preferences.
// - Implement the scoring and ranking logic as per recommendation_algorithms_design.md.
// - For restaurants, integrate with a real delivery service API or use a more comprehensive restaurant dataset.
// - Add mechanisms for collecting and storing user preference data (e.g., user ratings for meals/restaurants, explicit likes/dislikes).

