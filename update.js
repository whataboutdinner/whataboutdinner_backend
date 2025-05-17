import dbConnect from '../../../lib/mongoose.js';
import Recipe from '../../../models/Recipe.js';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  switch (method) {
    case 'PUT':
      try {
        const { id } = req.query;
        
        if (!id) {
          return res.status(400).json({ success: false, message: 'Recipe ID is required' });
        }
        
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        
        if (!recipe) {
          return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        
        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
