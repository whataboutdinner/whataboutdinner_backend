// Expanded Breakfast Recipes - Cold Breakfast Subcategory (20 recipes)

const coldBreakfastRecipes = [
  {
    title: "Overnight Chia Pudding with Berries",
    description: "A nutritious and easy make-ahead breakfast featuring chia seeds soaked in milk overnight, topped with fresh berries and honey.",
    ingredients: [
      {
        name: "chia seeds",
        quantity: "1/4",
        unit: "cup"
      },
      {
        name: "almond milk",
        quantity: "1",
        unit: "cup",
        notes: "or any milk of choice"
      },
      {
        name: "vanilla extract",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "honey",
        quantity: "1",
        unit: "tablespoon",
        notes: "plus more for serving"
      },
      {
        name: "mixed berries",
        quantity: "1/2",
        unit: "cup",
        notes: "strawberries, blueberries, raspberries"
      },
      {
        name: "sliced almonds",
        quantity: "2",
        unit: "tablespoons",
        notes: "for topping"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a medium bowl, whisk together chia seeds, almond milk, vanilla extract, and honey."
      },
      {
        order: 2,
        instruction: "Cover and refrigerate overnight, or for at least 4 hours."
      },
      {
        order: 3,
        instruction: "Stir the mixture to break up any clumps."
      },
      {
        order: 4,
        instruction: "Divide the chia pudding between two serving bowls."
      },
      {
        order: 5,
        instruction: "Top with fresh berries, sliced almonds, and a drizzle of honey."
      },
      {
        order: 6,
        instruction: "Serve chilled."
      }
    ],
    cookingVessel: "Mixing bowl and refrigerator",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "International",
    categories: ["Cold Breakfast", "Overnight preparations", "Quick Meals"],
    dietaryCategories: ["Vegetarian", "Dairy-Free", "Gluten-Free"],
    tags: ["chia pudding", "make-ahead", "healthy", "no-cook"]
  },
  {
    title: "Greek Yogurt Parfait with Homemade Granola",
    description: "Layers of creamy Greek yogurt, crunchy homemade granola, and fresh fruit create a balanced and protein-rich breakfast.",
    ingredients: [
      {
        name: "Greek yogurt",
        quantity: "2",
        unit: "cups",
        notes: "plain or vanilla"
      },
      {
        name: "rolled oats",
        quantity: "1",
        unit: "cup"
      },
      {
        name: "honey",
        quantity: "3",
        unit: "tablespoons",
        notes: "divided"
      },
      {
        name: "coconut oil",
        quantity: "2",
        unit: "tablespoons",
        notes: "melted"
      },
      {
        name: "cinnamon",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "vanilla extract",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "salt",
        quantity: "1/8",
        unit: "teaspoon"
      },
      {
        name: "mixed nuts",
        quantity: "1/3",
        unit: "cup",
        notes: "chopped (almonds, walnuts, pecans)"
      },
      {
        name: "dried fruit",
        quantity: "1/4",
        unit: "cup",
        notes: "raisins, cranberries, or chopped apricots"
      },
      {
        name: "fresh berries",
        quantity: "1",
        unit: "cup",
        notes: "strawberries, blueberries, raspberries"
      },
      {
        name: "banana",
        quantity: "1",
        unit: "medium",
        notes: "sliced"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Preheat oven to 325°F (165°C) and line a baking sheet with parchment paper."
      },
      {
        order: 2,
        instruction: "In a large bowl, mix rolled oats, 2 tablespoons honey, melted coconut oil, cinnamon, vanilla extract, salt, and chopped nuts."
      },
      {
        order: 3,
        instruction: "Spread the mixture evenly on the prepared baking sheet."
      },
      {
        order: 4,
        instruction: "Bake for 20-25 minutes, stirring halfway through, until golden brown."
      },
      {
        order: 5,
        instruction: "Remove from oven, add dried fruit, and let cool completely. The granola will crisp up as it cools."
      },
      {
        order: 6,
        instruction: "In serving glasses or bowls, layer Greek yogurt, granola, and fresh fruit."
      },
      {
        order: 7,
        instruction: "Drizzle with remaining tablespoon of honey."
      },
      {
        order: 8,
        instruction: "Serve immediately or cover and refrigerate for up to 2 hours (the granola will soften if stored longer)."
      }
    ],
    cookingVessel: "Baking sheet and oven (for granola), serving glasses or bowls",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    mealType: "Breakfast",
    cuisine: "International",
    categories: ["Cold Breakfast", "Yogurt parfaits", "Healthy"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["parfait", "yogurt", "granola", "protein-rich"]
  },
  // More recipes would be added here...
];

export default coldBreakfastRecipes;
