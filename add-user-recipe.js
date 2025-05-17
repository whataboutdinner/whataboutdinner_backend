import { connectToDatabase } from '../../../../lib/mongoose';
import UserCalendar from '../../../../models/UserCalendar';
import UserRecipe from '../../../../models/recipes/UserRecipe';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    await connectToDatabase();
    
    const { weekIndex, dayOfWeek, mealType, recipeId } = req.body;
    
    // Validate required fields
    if (weekIndex === undefined || dayOfWeek === undefined || !mealType || !recipeId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Verify the recipe exists and user has access to it
    const recipe = await UserRecipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Check if user has access to this recipe
    const isVisible = recipe.isVisibleTo(session.user.id);
    if (!isVisible && recipe.userId.toString() !== session.user.id) {
      return res.status(403).json({ error: 'You do not have access to this recipe' });
    }
    
    // Find user's calendar or create if it doesn't exist
    let calendar = await UserCalendar.findOne({ user: session.user.id });
    if (!calendar) {
      calendar = new UserCalendar({
        user: session.user.id,
        weeks: [{ weekIndex: 0, days: [] }],
        dietaryPreferences: []
      });
    }
    
    // Find or create the specified week
    let week = calendar.weeks.find(w => w.weekIndex === weekIndex);
    if (!week) {
      week = { weekIndex, days: [] };
      calendar.weeks.push(week);
    }
    
    // Find or create the day entry
    let dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
    if (dayEntry) {
      // Update existing entry
      dayEntry.recipe = recipeId;
      dayEntry.subcategory = recipe.subcategory;
    } else {
      // Create new entry
      week.days.push({
        dayOfWeek,
        mealType,
        subcategory: recipe.subcategory,
        recipe: recipeId,
        feedback: { liked: null, makeAgain: false, notes: '' }
      });
    }
    
    await calendar.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Recipe added to calendar successfully'
    });
  } catch (error) {
    console.error('Error adding recipe to calendar:', error);
    return res.status(500).json({ error: 'Failed to add recipe to calendar' });
  }
}
