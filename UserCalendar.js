import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Define the day entry schema for each day in the calendar
const DayEntrySchema = new Schema({
  // Day of the week (0-6, where 0 is Sunday)
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  
  // Meal type (lunch or dinner)
  mealType: {
    type: String,
    required: true,
    enum: ['lunch', 'dinner']
  },
  
  // Selected subcategory for this day and meal
  subcategory: {
    type: String,
    required: true
  },
  
  // The recipe selected for this day
  recipe: {
    type: ObjectId,
    ref: 'Recipe'
  },
  
  // User feedback on this recipe
  feedback: {
    liked: {
      type: Boolean,
      default: null
    },
    makeAgain: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String,
      default: ''
    }
  }
});

// Define the week schema
const WeekSchema = new Schema({
  // Week number (0 is current week, 1 is next week, etc.)
  weekIndex: {
    type: Number,
    required: true,
    default: 0
  },
  
  // Array of day entries for this week
  days: [DayEntrySchema]
});

// Define the main user calendar schema
const UserCalendarSchema = new Schema({
  // Reference to the user who owns this calendar
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  
  // Array of weeks in the calendar
  weeks: [WeekSchema],
  
  // List of recipe IDs that the user has disliked and wants to exclude
  excludedRecipes: [{
    type: ObjectId,
    ref: 'Recipe'
  }],
  
  // User's dietary preferences to respect when selecting recipes
  dietaryPreferences: [{
    type: String
  }],
  
  // Timestamps for creation and updates
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt timestamp
UserCalendarSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to add a new week to the calendar
UserCalendarSchema.methods.addWeek = function() {
  const nextWeekIndex = this.weeks.length > 0 
    ? Math.max(...this.weeks.map(w => w.weekIndex)) + 1 
    : 0;
    
  this.weeks.push({
    weekIndex: nextWeekIndex,
    days: []
  });
  
  return this;
};

// Method to set a subcategory for a specific day and meal
UserCalendarSchema.methods.setSubcategory = function(weekIndex, dayOfWeek, mealType, subcategory) {
  // Find the week
  let week = this.weeks.find(w => w.weekIndex === weekIndex);
  
  // If week doesn't exist, create it
  if (!week) {
    week = {
      weekIndex,
      days: []
    };
    this.weeks.push(week);
  }
  
  // Find the day entry
  let dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
  
  // If day entry doesn't exist, create it
  if (!dayEntry) {
    dayEntry = {
      dayOfWeek,
      mealType,
      subcategory,
      recipe: null,
      feedback: {
        liked: null,
        makeAgain: false,
        notes: ''
      }
    };
    week.days.push(dayEntry);
  } else {
    // Update the subcategory
    dayEntry.subcategory = subcategory;
  }
  
  return this;
};

// Method to set a recipe for a specific day and meal
UserCalendarSchema.methods.setRecipe = function(weekIndex, dayOfWeek, mealType, recipeId) {
  // Find the week
  const week = this.weeks.find(w => w.weekIndex === weekIndex);
  if (!week) return false;
  
  // Find the day entry
  const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
  if (!dayEntry) return false;
  
  // Update the recipe
  dayEntry.recipe = recipeId;
  
  return true;
};

// Method to provide feedback on a recipe
UserCalendarSchema.methods.provideFeedback = function(weekIndex, dayOfWeek, mealType, liked, makeAgain, notes) {
  // Find the week
  const week = this.weeks.find(w => w.weekIndex === weekIndex);
  if (!week) return false;
  
  // Find the day entry
  const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
  if (!dayEntry || !dayEntry.recipe) return false;
  
  // Update the feedback
  dayEntry.feedback = {
    liked,
    makeAgain,
    notes: notes || dayEntry.feedback.notes
  };
  
  // If the user disliked the recipe, add it to the excluded list
  if (liked === false && !this.excludedRecipes.includes(dayEntry.recipe)) {
    this.excludedRecipes.push(dayEntry.recipe);
  }
  
  // If the user liked the recipe and it was previously excluded, remove from excluded list
  if (liked === true) {
    this.excludedRecipes = this.excludedRecipes.filter(id => !id.equals(dayEntry.recipe));
  }
  
  return true;
};

// Create and export the model
const UserCalendar = mongoose.models.UserCalendar || mongoose.model('UserCalendar', UserCalendarSchema);
export default UserCalendar;
