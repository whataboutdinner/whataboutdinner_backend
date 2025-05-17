// Expanded Drink Recipes - Smoothies & Shakes Subcategory (20 recipes)

const smoothiesShakesRecipes = [
  {
    title: "Green Power Protein Smoothie",
    description: "A nutrient-packed green smoothie featuring spinach, avocado, and protein powder, perfect for a post-workout recovery drink or a nutritious breakfast on the go.",
    ingredients: [
      {
        name: "fresh spinach",
        quantity: "2",
        unit: "cups",
        notes: "packed"
      },
      {
        name: "ripe avocado",
        quantity: "1/2",
        unit: "medium"
      },
      {
        name: "frozen banana",
        quantity: "1",
        unit: "medium",
        notes: "sliced"
      },
      {
        name: "Greek yogurt",
        quantity: "1/2",
        unit: "cup",
        notes: "plain, non-fat"
      },
      {
        name: "protein powder",
        quantity: "1",
        unit: "scoop",
        notes: "vanilla or unflavored"
      },
      {
        name: "almond milk",
        quantity: "1",
        unit: "cup",
        notes: "unsweetened"
      },
      {
        name: "honey",
        quantity: "1",
        unit: "tablespoon",
        notes: "or to taste"
      },
      {
        name: "chia seeds",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "fresh lemon juice",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "ice cubes",
        quantity: "1/2",
        unit: "cup",
        notes: "optional, for a colder smoothie"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Add spinach, avocado, frozen banana, Greek yogurt, protein powder, almond milk, honey, chia seeds, and lemon juice to a high-powered blender."
      },
      {
        order: 2,
        instruction: "Add ice cubes if desired for a colder smoothie."
      },
      {
        order: 3,
        instruction: "Blend on high speed until smooth and creamy, about 1-2 minutes."
      },
      {
        order: 4,
        instruction: "If the smoothie is too thick, add more almond milk, 1 tablespoon at a time, until desired consistency is reached."
      },
      {
        order: 5,
        instruction: "Taste and adjust sweetness if needed by adding more honey."
      },
      {
        order: 6,
        instruction: "Pour into a glass and serve immediately."
      }
    ],
    cookingVessel: "High-powered blender",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "American",
    categories: ["Smoothies & Shakes", "Breakfast", "Post-workout"],
    dietaryCategories: ["Vegetarian", "Gluten-Free", "High-Protein"],
    tags: ["green smoothie", "protein", "healthy", "avocado", "spinach"]
  },
  {
    title: "Classic Chocolate Malt Milkshake",
    description: "A nostalgic, creamy milkshake featuring rich chocolate ice cream, malted milk powder, and whole milk, topped with whipped cream and a cherry for the perfect indulgent treat.",
    ingredients: [
      {
        name: "chocolate ice cream",
        quantity: "3",
        unit: "cups",
        notes: "slightly softened"
      },
      {
        name: "whole milk",
        quantity: "1/2",
        unit: "cup"
      },
      {
        name: "malted milk powder",
        quantity: "3",
        unit: "tablespoons"
      },
      {
        name: "chocolate syrup",
        quantity: "2",
        unit: "tablespoons",
        notes: "plus more for drizzling"
      },
      {
        name: "vanilla extract",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "whipped cream",
        quantity: "",
        unit: "",
        notes: "for topping"
      },
      {
        name: "maraschino cherries",
        quantity: "2",
        unit: "",
        notes: "for garnish"
      },
      {
        name: "chocolate shavings",
        quantity: "1",
        unit: "tablespoon",
        notes: "for garnish (optional)"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a blender, combine chocolate ice cream, milk, malted milk powder, chocolate syrup, and vanilla extract."
      },
      {
        order: 2,
        instruction: "Blend on medium speed until smooth and creamy, about 30-45 seconds. Do not overblend or the milkshake will become too thin."
      },
      {
        order: 3,
        instruction: "Before serving, drizzle chocolate syrup around the inside of two tall glasses."
      },
      {
        order: 4,
        instruction: "Pour the milkshake into the prepared glasses."
      },
      {
        order: 5,
        instruction: "Top with whipped cream, a maraschino cherry, and chocolate shavings if desired."
      },
      {
        order: 6,
        instruction: "Serve immediately with a straw and a long spoon."
      }
    ],
    cookingVessel: "Blender",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "American",
    categories: ["Smoothies & Shakes", "Dessert", "Indulgent treats"],
    dietaryCategories: ["Vegetarian"],
    tags: ["milkshake", "chocolate", "malt", "dessert drink", "classic"]
  }
  // More recipes would be added here...
];

export default smoothiesShakesRecipes;
