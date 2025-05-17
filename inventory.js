import dbConnect from "../../../lib/mongoose.js";
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
    case "GET":
      try {
        // Get user's inventory
        let inventory = await UserInventory.findOne({ userId });
        
        if (!inventory) {
          // Create empty inventory if none exists
          inventory = {
            userId,
            ingredients: [],
            cookingVessels: [],
            preferredGroceryStores: [],
            preferredDeliveryService: "DoorDash"
          };
        }
        
        res.status(200).json({ success: true, data: inventory });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case "POST":
      try {
        // Create or update user's inventory
        const { ingredients, cookingVessels, preferredGroceryStores, preferredDeliveryService } = req.body;
        
        const inventory = await UserInventory.findOneAndUpdate(
          { userId },
          {
            userId,
            ingredients: ingredients || [],
            cookingVessels: cookingVessels || [],
            preferredGroceryStores: preferredGroceryStores || [],
            preferredDeliveryService: preferredDeliveryService || "DoorDash"
          },
          { new: true, upsert: true }
        );
        
        res.status(200).json({ success: true, data: inventory });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
