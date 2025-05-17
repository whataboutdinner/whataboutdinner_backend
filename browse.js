import dbConnect from "../../../lib/mongoose.js";
import Recipe from "../../../models/Recipe.js";
import UserInventory from "../../../models/UserInventory.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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
          search,
          page = 1,
          limit = 10,
          useUserInventory = false
        } = req.query;

        // Build filter object
        const filter = {};

        if (mealType) filter.mealType = mealType;
        if (cuisine) filter.cuisine = cuisine;

        // Filter by general category
        if (category) {
          filter.categories = { $in: [category] };
        }

        // Filter by dietary restrictions/preferences
        if (dietary) {
          const dietaryArray = Array.isArray(dietary) ? dietary : [dietary];
          filter.dietaryCategories = { $all: dietaryArray };
        }

        // Filter by difficulty
        if (difficulty) {
          filter.difficulty = difficulty;
        }

        // Filter by maximum preparation time
        if (maxPrepTime) {
          filter.prepTime = { $lte: parseInt(maxPrepTime) };
        }

        // Filter by maximum cooking time
        if (maxCookTime) {
          filter.cookTime = { $lte: parseInt(maxCookTime) };
        }

        // Search in title and description
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }

        // Filter by user's available cooking vessels if requested
        if (useUserInventory === 'true') {
          // Get user session for authentication
          const session = await getServerSession(req, res, authOptions);
          
          if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
          }
          
          const userId = session.user.id;
          
          // Get user's inventory
          const inventory = await UserInventory.findOne({ userId });
          
          if (inventory && inventory.cookingVessels && inventory.cookingVessels.length > 0) {
            // Extract vessel names
            const availableVessels = inventory.cookingVessels.map(vessel => vessel.name);
            
            // Create regex pattern for partial matching of cooking vessels
            const vesselPatterns = availableVessels.map(vessel => 
              new RegExp(vessel, 'i')
            );
            
            // Add vessel filter
            filter.cookingVessel = { $in: vesselPatterns };
          }
        }

        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Execute query with pagination
        const recipes = await Recipe.find(filter)
          .skip(skip)
          .limit(limitNum)
          .sort({ title: 1 });

        // Get total count for pagination
        const total = await Recipe.countDocuments(filter);

        // Calculate total pages
        const pages = Math.ceil(total / limitNum);

        res.status(200).json({
          success: true,
          data: recipes,
          pagination: {
            total,
            page: pageNum,
            limit: limitNum,
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
