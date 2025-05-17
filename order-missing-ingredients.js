import dbConnect from "../../../lib/mongoose.js";
import Recipe from "../../../models/Recipe.js";
import UserInventory from "../../../models/UserInventory.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  // Get user session for authentication
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  
  const userId = session.user.id;
  
  switch (method) {
    case "POST":
      try {
        const { recipeId } = req.body;
        
        if (!recipeId) {
          return res.status(400).json({ success: false, message: "Recipe ID is required" });
        }
        
        // Get recipe details
        const recipe = await Recipe.findById(recipeId);
        
        if (!recipe) {
          return res.status(404).json({ success: false, message: "Recipe not found" });
        }
        
        // Get user's inventory
        const inventory = await UserInventory.findOne({ userId });
        
        if (!inventory) {
          return res.status(404).json({ success: false, message: "User inventory not found" });
        }
        
        // Get user's preferred grocery stores
        const preferredStores = inventory.preferredGroceryStores || [];
        const preferredDeliveryService = inventory.preferredDeliveryService || "DoorDash";
        
        if (preferredStores.length === 0) {
          return res.status(400).json({ 
            success: false, 
            message: "Please set up your preferred grocery stores before ordering ingredients" 
          });
        }
        
        // Get user's available ingredients
        const userIngredients = inventory.ingredients || [];
        const userIngredientNames = userIngredients.map(ing => ing.name.toLowerCase());
        
        // Identify missing ingredients
        const recipeIngredients = recipe.ingredients || [];
        const missingIngredients = recipeIngredients.filter(
          ing => !userIngredientNames.includes(ing.name.toLowerCase())
        );
        
        // Group ingredients by store availability
        // In a real implementation, this would query store inventory APIs
        const defaultStore = preferredStores.find(store => store.isDefault) || preferredStores[0];
        
        // For this implementation, we'll assume all ingredients are available at the default store
        const ingredientsByStore = {
          [defaultStore.name]: missingIngredients
        };
        
        // Create shopping cart for delivery service
        // In a real implementation, this would interface with delivery service APIs
        const shoppingCart = {
          deliveryService: preferredDeliveryService,
          store: defaultStore,
          items: missingIngredients,
          estimatedTotal: missingIngredients.reduce((total, item) => total + (Math.random() * 5 + 1), 0).toFixed(2),
          estimatedDeliveryTime: `${Math.floor(Math.random() * 30 + 30)} minutes`
        };
        
        res.status(200).json({
          success: true,
          data: {
            recipe: {
              id: recipe._id,
              title: recipe.title
            },
            missingIngredients,
            ingredientsByStore,
            shoppingCart,
            instructions: "While waiting for your ingredients to be delivered, you can prepare the other ingredients and cooking equipment."
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
