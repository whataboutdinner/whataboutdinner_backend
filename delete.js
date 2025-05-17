import dbConnect from '../../../lib/mongoose.js';
import Recipe from '../../../models/Recipe.js';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'DELETE':
      try {
        const { id } = req.query;
        
        if (!id) {
          return res.status(400).json({ success: false, message: 'Recipe ID is required' });
        }
        
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        
        if (!deletedRecipe) {
          return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
