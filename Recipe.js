import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide ingredient name'],
    trim: true
  },
  quantity: {
    type: String,
    required: [true, 'Please provide ingredient quantity'],
    trim: true
  },
  unit: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
});

const StepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  instruction: {
    type: String,
    required: [true, 'Please provide step instruction'],
    trim: true
  }
});

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide recipe title'],
    trim: true,
    maxlength: [100, 'Recipe title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide recipe description'],
    trim: true,
    maxlength: [1000, 'Recipe description cannot be more than 1000 characters']
  },
  ingredients: {
    type: [IngredientSchema],
    required: [true, 'Please provide recipe ingredients'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Recipe must have at least one ingredient'
    }
  },
  steps: {
    type: [StepSchema],
    required: [true, 'Please provide recipe steps'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Recipe must have at least one step'
    }
  },
  cookingVessel: {
    type: String,
    required: [true, 'Please provide cooking vessel needed'],
    trim: true
  },
  prepTime: {
    type: Number, // in minutes
    required: [true, 'Please provide preparation time']
  },
  cookTime: {
    type: Number, // in minutes
    required: [true, 'Please provide cooking time']
  },
  servings: {
    type: Number,
    required: [true, 'Please provide number of servings']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  // Primary category (meal type)
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer', 'Drink', 'Other'],
    default: 'Dinner'
  },
  // Cuisine type
  cuisine: {
    type: String,
    enum: ['Italian', 'Mexican', 'Chinese', 'Indian', 'Thai', 'Japanese', 'Mediterranean', 'American', 'French', 'Greek', 'Spanish', 'Korean', 'Vietnamese', 'German', 'Caribbean', 'African', 'Middle Eastern', 'Other'],
    default: 'American'
  },
  // Multiple categories for flexible categorization
  categories: {
    type: [String],
    default: []
  },
  // Dietary restrictions/preferences
  dietaryCategories: {
    type: [String],
    enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat', 'Low-Sodium', 'High-Protein', 'Diabetic-Friendly'],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
RecipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model already exists before defining it to prevent OverwriteModelError
export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
