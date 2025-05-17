// API route for creating a new recipe
import dbConnect from "../../../lib/mongoose.js";
import Recipe from "../../../models/Recipe.js";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
