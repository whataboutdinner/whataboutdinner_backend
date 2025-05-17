// API route for advanced recipe filtering
import dbConnect from "../../../lib/mongoose.js";
import Recipe from "../../../models/Recipe.js";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Extract query parameters for filtering
        const {
          mealType,
          cuisine,
          category,
          dietary,
          difficulty,
          maxPrepTime,
          maxCookTime,
          cookingVessel,
          search,
          page = 1,
          limit = 10
        } = req.query;

        // Build filter object
        const filter = {};

        // Primary category filters
        if (mealType) filter.mealType = mealType;
        if (cuisine) filter.cuisine = cuisine;
        if (difficulty) filter.difficulty = difficulty;

        // Time filters
        if (maxPrepTime) filter.prepTime = { $lte: parseInt(maxPrepTime) };
        if (maxCookTime) filter.cookTime = { $lte: parseInt(maxCookTime) };

        // Cooking vessel filter
        if (cookingVessel) filter.cookingVessel = { $regex: cookingVessel, $options: 'i' };

        // Filter by general category
        if (category) {
          filter.categories = { $in: [category] };
        }

        // Filter by dietary restrictions/preferences
        if (dietary) {
          const dietaryArray = Array.isArray(dietary) ? dietary : [dietary];
          filter.dietaryCategories = { $all: dietaryArray };
        }

        // Text search across title and description
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Execute query with pagination
        const recipes = await Recipe.find(filter)
          .skip(skip)
          .limit(parseInt(limit))
          .sort({ title: 1 });
        
        // Get total count for pagination
        const total = await Recipe.countDocuments(filter);
        
        // Calculate total pages
        const pages = Math.ceil(total / parseInt(limit));
        
        res.status(200).json({
          success: true,
          data: recipes,
          pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages
          }
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
