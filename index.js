import { connectToDatabase } from '../../../../lib/mongoose';
import UserRecipe from '../../../../models/recipes/UserRecipe';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  await connectToDatabase();
  
  switch (req.method) {
    case 'GET':
      try {
        // Get all recipes created by the user
        const recipes = await UserRecipe.find({ userId: session.user.id })
          .sort({ createdAt: -1 });
        
        return res.status(200).json({ recipes });
      } catch (error) {
        console.error('Error fetching user recipes:', error);
        return res.status(500).json({ error: 'Failed to fetch recipes' });
      }
      
    case 'POST':
      try {
        // Create a new recipe
        const {
          title,
          description,
          ingredients,
          steps,
          prepTime,
          cookTime,
          servings,
          difficulty,
          mealType,
          subcategory,
          cuisine,
          dietaryCategories,
          image,
          notes,
          visibility,
          sharedWith
        } = req.body;
        
        // Validate required fields
        if (!title || !description || !ingredients || !steps || !prepTime || 
            !cookTime || !servings || !difficulty || !mealType || !subcategory || !cuisine) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const recipe = new UserRecipe({
          userId: session.user.id,
          title,
          description,
          ingredients,
          steps,
          prepTime,
          cookTime,
          servings,
          difficulty,
          mealType,
          subcategory,
          cuisine,
          dietaryCategories: dietaryCategories || [],
          image: image || '',
          notes: notes || '',
          isUserCreated: true,
          visibility: visibility || 'private',
          sharedWith: sharedWith || []
        });
        
        await recipe.save();
        
        return res.status(201).json({ 
          success: true, 
          message: 'Recipe created successfully',
          recipe
        });
      } catch (error) {
        console.error('Error creating recipe:', error);
        return res.status(500).json({ error: 'Failed to create recipe' });
      }
      
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
