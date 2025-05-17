// Expanded Drink Recipes - Cocktails & Mocktails Subcategory (20 recipes)

const cocktailsMocktailsRecipes = [
  {
    title: "Classic Mojito",
    description: "A refreshing Cuban cocktail featuring white rum, fresh mint, lime juice, and soda water. The perfect balance of sweet, citrus, and mint flavors.",
    ingredients: [
      {
        name: "fresh mint leaves",
        quantity: "10-12",
        unit: "",
        notes: "plus more for garnish"
      },
      {
        name: "lime",
        quantity: "1",
        unit: "whole",
        notes: "cut into wedges"
      },
      {
        name: "granulated sugar",
        quantity: "2",
        unit: "teaspoons"
      },
      {
        name: "white rum",
        quantity: "2",
        unit: "oz"
      },
      {
        name: "club soda",
        quantity: "4",
        unit: "oz",
        notes: "chilled"
      },
      {
        name: "ice cubes",
        quantity: "",
        unit: "",
        notes: "as needed"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Place mint leaves and 1 lime wedge into a sturdy glass. Use a muddler to crush the mint and lime to release the mint oils and lime juice."
      },
      {
        order: 2,
        instruction: "Add 2 more lime wedges and the sugar, and muddle again to release the lime juice. Do not strain the mixture."
      },
      {
        order: 3,
        instruction: "Fill the glass almost to the top with ice. Pour the rum over the ice, and fill the glass with club soda."
      },
      {
        order: 4,
        instruction: "Stir, taste, and add more sugar if desired. Garnish with the remaining lime wedge and a sprig of mint."
      },
      {
        order: 5,
        instruction: "Serve immediately with a straw."
      }
    ],
    cookingVessel: "Highball glass, muddler",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "Cuban",
    categories: ["Cocktails & Mocktails", "Rum-based", "Refreshing drinks"],
    dietaryCategories: ["Gluten-Free", "Dairy-Free"],
    tags: ["mojito", "rum cocktail", "mint", "lime", "summer drink"]
  },
  {
    title: "Cucumber Mint Mocktail",
    description: "A sophisticated non-alcoholic beverage featuring cool cucumber, fresh mint, and a hint of lime. Perfect for warm days or as a refreshing alternative to alcoholic drinks.",
    ingredients: [
      {
        name: "cucumber",
        quantity: "1/2",
        unit: "medium",
        notes: "peeled and sliced, plus additional slices for garnish"
      },
      {
        name: "fresh mint leaves",
        quantity: "1/4",
        unit: "cup",
        notes: "plus sprigs for garnish"
      },
      {
        name: "lime juice",
        quantity: "2",
        unit: "tablespoons",
        notes: "freshly squeezed"
      },
      {
        name: "simple syrup",
        quantity: "1",
        unit: "oz",
        notes: "or to taste"
      },
      {
        name: "club soda",
        quantity: "6",
        unit: "oz",
        notes: "chilled"
      },
      {
        name: "ice cubes",
        quantity: "",
        unit: "",
        notes: "as needed"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a cocktail shaker or mason jar, muddle the cucumber slices and mint leaves until the cucumber releases its juice and the mint is fragrant."
      },
      {
        order: 2,
        instruction: "Add lime juice and simple syrup. Fill the shaker with ice and shake vigorously for about 15 seconds."
      },
      {
        order: 3,
        instruction: "Strain the mixture into a glass filled with fresh ice."
      },
      {
        order: 4,
        instruction: "Top with club soda and stir gently to combine."
      },
      {
        order: 5,
        instruction: "Garnish with cucumber slices and a sprig of mint."
      },
      {
        order: 6,
        instruction: "Serve immediately with a straw."
      }
    ],
    cookingVessel: "Cocktail shaker or mason jar, highball glass",
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "American",
    categories: ["Cocktails & Mocktails", "Non-Alcoholic Beverages", "Refreshing drinks"],
    dietaryCategories: ["Vegan", "Gluten-Free", "Dairy-Free"],
    tags: ["mocktail", "cucumber", "mint", "refreshing", "alcohol-free"]
  }
  // More recipes would be added here...
];

export default cocktailsMocktailsRecipes;
