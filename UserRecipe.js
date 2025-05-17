import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
  preparation: { type: String }
});

const UserRecipeSchema = new Schema({
  userId: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [IngredientSchema],
  steps: [{ type: String, required: true }],
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Dessert', 'Snack', 'Drink', 'Other'], 
    required: true 
  },
  subcategory: { type: String, required: true },
  cuisine: { type: String, required: true },
  dietaryCategories: [{ type: String }],
  image: { type: String },
  notes: { type: String },
  isUserCreated: { type: Boolean, default: true },
  visibility: { 
    type: String, 
    enum: ['private', 'friends', 'public'], 
    default: 'private' 
  },
  sharedWith: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Add index for faster queries
UserRecipeSchema.index({ userId: 1 });
UserRecipeSchema.index({ visibility: 1 });
UserRecipeSchema.index({ sharedWith: 1 });

// Static method to find recipes visible to a user
UserRecipeSchema.statics.findVisibleToUser = function(userId) {
  return this.find({
    $or: [
      { userId: userId }, // User's own recipes
      { visibility: 'public' }, // Public recipes
      { visibility: 'friends', sharedWith: userId }, // Shared with user as friend
      { sharedWith: userId } // Explicitly shared with user
    ]
  });
};

// Method to check if a recipe is visible to a specific user
UserRecipeSchema.methods.isVisibleTo = function(userId) {
  // Convert to string for comparison
  const recipeOwnerId = this.userId.toString();
  const checkUserId = userId.toString();
  
  // Owner can always see their own recipes
  if (recipeOwnerId === checkUserId) {
    return true;
  }
  
  // Public recipes are visible to everyone
  if (this.visibility === 'public') {
    return true;
  }
  
  // Check if explicitly shared with user
  if (this.sharedWith.some(id => id.toString() === checkUserId)) {
    return true;
  }
  
  // If friends visibility, check if user is in friends list (would need User model integration)
  if (this.visibility === 'friends') {
    // This would require additional logic to check friendship status
    // For now, we'll assume this is handled at the API level
    return false;
  }
  
  // Default to not visible
  return false;
};

export default mongoose.models.UserRecipe || mongoose.model('UserRecipe', UserRecipeSchema);
