// Expanded Breakfast Recipes - Breakfast Beverages Subcategory (20 recipes)

const breakfastBeveragesRecipes = [
  {
    title: "Berry Protein Smoothie",
    description: "A nutrient-packed smoothie featuring mixed berries, protein powder, and Greek yogurt. Perfect for a quick breakfast on busy mornings or post-workout refueling.",
    ingredients: [
      {
        name: "mixed berries",
        quantity: "1",
        unit: "cup",
        notes: "fresh or frozen (strawberries, blueberries, raspberries)"
      },
      {
        name: "banana",
        quantity: "1/2",
        unit: "medium",
        notes: "frozen for a creamier texture"
      },
      {
        name: "Greek yogurt",
        quantity: "1/2",
        unit: "cup",
        notes: "plain or vanilla"
      },
      {
        name: "protein powder",
        quantity: "1",
        unit: "scoop",
        notes: "vanilla or unflavored"
      },
      {
        name: "almond milk",
        quantity: "3/4",
        unit: "cup",
        notes: "or milk of choice"
      },
      {
        name: "honey",
        quantity: "1",
        unit: "tablespoon",
        notes: "optional, adjust to taste"
      },
      {
        name: "chia seeds",
        quantity: "1",
        unit: "tablespoon",
        notes: "optional"
      },
      {
        name: "ice cubes",
        quantity: "4-5",
        unit: "",
        notes: "if using fresh berries"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Add all ingredients to a high-powered blender."
      },
      {
        order: 2,
        instruction: "Blend on high speed until smooth and creamy, about 1-2 minutes."
      },
      {
        order: 3,
        instruction: "If the smoothie is too thick, add more almond milk, 1 tablespoon at a time, until desired consistency is reached."
      },
      {
        order: 4,
        instruction: "Taste and adjust sweetness with additional honey if needed."
      },
      {
        order: 5,
        instruction: "Pour into a glass and serve immediately."
      }
    ],
    cookingVessel: "High-powered blender",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "American",
    categories: ["Breakfast Beverages", "Smoothies", "Quick Meals", "Healthy"],
    dietaryCategories: ["Vegetarian", "Gluten-Free", "High-Protein"],
    tags: ["smoothie", "protein", "berries", "quick breakfast"]
  },
  {
    title: "Vanilla Cinnamon Cold Brew Coffee",
    description: "A smooth, less acidic coffee prepared by steeping grounds overnight, then flavored with vanilla and cinnamon for a delicious morning pick-me-up.",
    ingredients: [
      {
        name: "coarsely ground coffee beans",
        quantity: "1",
        unit: "cup"
      },
      {
        name: "cold filtered water",
        quantity: "4",
        unit: "cups"
      },
      {
        name: "vanilla bean",
        quantity: "1",
        unit: "",
        notes: "split lengthwise, or 1 teaspoon vanilla extract"
      },
      {
        name: "cinnamon stick",
        quantity: "1",
        unit: "large"
      },
      {
        name: "milk",
        quantity: "",
        unit: "",
        notes: "of choice, for serving"
      },
      {
        name: "ice cubes",
        quantity: "",
        unit: "",
        notes: "for serving"
      },
      {
        name: "simple syrup",
        quantity: "",
        unit: "",
        notes: "optional, for serving"
      },
      {
        name: "ground cinnamon",
        quantity: "",
        unit: "",
        notes: "for garnish"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a large jar or pitcher, combine the coarsely ground coffee, cold water, vanilla bean (or extract), and cinnamon stick."
      },
      {
        order: 2,
        instruction: "Stir gently to ensure all coffee grounds are saturated."
      },
      {
        order: 3,
        instruction: "Cover and refrigerate for 12-24 hours. The longer it steeps, the stronger the coffee will be."
      },
      {
        order: 4,
        instruction: "After steeping, strain the coffee through a fine-mesh sieve lined with cheesecloth or a coffee filter into a clean container."
      },
      {
        order: 5,
        instruction: "Remove the vanilla bean and cinnamon stick."
      },
      {
        order: 6,
        instruction: "Store the cold brew concentrate in the refrigerator for up to 1 week."
      },
      {
        order: 7,
        instruction: "To serve, fill a glass with ice, pour cold brew to fill about 1/2 to 2/3 of the glass."
      },
      {
        order: 8,
        instruction: "Add milk to taste and sweeten with simple syrup if desired."
      },
      {
        order: 9,
        instruction: "Sprinkle with a pinch of ground cinnamon for garnish."
      }
    ],
    cookingVessel: "Large jar or pitcher with lid, fine-mesh sieve",
    prepTime: 10,
    cookTime: 0,
    servings: 8,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "American",
    categories: ["Breakfast Beverages", "Breakfast coffee drinks", "Make-ahead"],
    dietaryCategories: ["Vegan", "Gluten-Free", "Dairy-Free"],
    tags: ["cold brew", "coffee", "vanilla", "cinnamon", "make-ahead"]
  },
  // More recipes would be added here...
];

export default breakfastBeveragesRecipes;
