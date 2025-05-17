// Expanded Breakfast Recipes - Hot Breakfast Subcategory (20 recipes)

const hotBreakfastRecipes = [
  {
    title: "Classic American Pancakes",
    description: "Fluffy, golden pancakes served with maple syrup and butter. A timeless breakfast favorite that's easy to customize with your favorite toppings.",
    ingredients: [
      {
        name: "all-purpose flour",
        quantity: "2",
        unit: "cups"
      },
      {
        name: "baking powder",
        quantity: "2",
        unit: "teaspoons"
      },
      {
        name: "salt",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "granulated sugar",
        quantity: "3",
        unit: "tablespoons"
      },
      {
        name: "eggs",
        quantity: "2",
        unit: "large"
      },
      {
        name: "milk",
        quantity: "1 3/4",
        unit: "cups"
      },
      {
        name: "unsalted butter",
        quantity: "3",
        unit: "tablespoons",
        notes: "melted, plus more for cooking"
      },
      {
        name: "vanilla extract",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "maple syrup",
        quantity: "1/4",
        unit: "cup",
        notes: "for serving"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a large bowl, whisk together flour, baking powder, salt, and sugar."
      },
      {
        order: 2,
        instruction: "In a separate bowl, whisk together eggs, milk, melted butter, and vanilla extract."
      },
      {
        order: 3,
        instruction: "Pour the wet ingredients into the dry ingredients and stir just until combined. Some small lumps are okay - don't overmix."
      },
      {
        order: 4,
        instruction: "Let the batter rest for 5 minutes while you heat a griddle or large non-stick skillet over medium heat."
      },
      {
        order: 5,
        instruction: "Add a small amount of butter to the griddle and spread it around."
      },
      {
        order: 6,
        instruction: "For each pancake, pour about 1/4 cup of batter onto the griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes."
      },
      {
        order: 7,
        instruction: "Flip the pancakes and cook until golden brown on the second side, about 1-2 minutes more."
      },
      {
        order: 8,
        instruction: "Transfer to a plate and repeat with remaining batter, adding more butter to the griddle as needed."
      },
      {
        order: 9,
        instruction: "Serve warm with maple syrup and additional butter if desired."
      }
    ],
    cookingVessel: "Griddle or large non-stick skillet",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    mealType: "Breakfast",
    cuisine: "American",
    categories: ["Hot Breakfast", "American", "Quick Meals"],
    dietaryCategories: [],
    tags: ["pancakes", "classic", "family favorite"]
  },
  {
    title: "Shakshuka with Feta",
    description: "A Middle Eastern breakfast dish featuring eggs poached in a spiced tomato and pepper sauce, topped with crumbled feta cheese and fresh herbs.",
    ingredients: [
      {
        name: "olive oil",
        quantity: "3",
        unit: "tablespoons"
      },
      {
        name: "yellow onion",
        quantity: "1",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "red bell pepper",
        quantity: "1",
        unit: "large",
        notes: "seeded and diced"
      },
      {
        name: "garlic cloves",
        quantity: "3",
        unit: "",
        notes: "minced"
      },
      {
        name: "ground cumin",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "paprika",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "cayenne pepper",
        quantity: "1/4",
        unit: "teaspoon",
        notes: "adjust to taste"
      },
      {
        name: "canned crushed tomatoes",
        quantity: "28",
        unit: "oz"
      },
      {
        name: "salt",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "eggs",
        quantity: "6",
        unit: "large"
      },
      {
        name: "feta cheese",
        quantity: "1/2",
        unit: "cup",
        notes: "crumbled"
      },
      {
        name: "fresh parsley",
        quantity: "2",
        unit: "tablespoons",
        notes: "chopped"
      },
      {
        name: "fresh cilantro",
        quantity: "2",
        unit: "tablespoons",
        notes: "chopped"
      },
      {
        name: "crusty bread",
        quantity: "1",
        unit: "loaf",
        notes: "for serving"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Heat olive oil in a large cast iron skillet over medium heat."
      },
      {
        order: 2,
        instruction: "Add diced onion and bell pepper. Cook until softened, about 5-7 minutes."
      },
      {
        order: 3,
        instruction: "Add minced garlic, cumin, paprika, and cayenne. Cook until fragrant, about 1 minute."
      },
      {
        order: 4,
        instruction: "Pour in crushed tomatoes, salt, and pepper. Stir to combine. Simmer for 10 minutes until slightly thickened."
      },
      {
        order: 5,
        instruction: "Using the back of a spoon, make 6 wells in the sauce. Crack an egg into each well."
      },
      {
        order: 6,
        instruction: "Cover the skillet and cook until egg whites are set but yolks are still runny, about 5-8 minutes."
      },
      {
        order: 7,
        instruction: "Sprinkle crumbled feta cheese over the top."
      },
      {
        order: 8,
        instruction: "Garnish with chopped parsley and cilantro."
      },
      {
        order: 9,
        instruction: "Serve hot directly from the skillet with crusty bread for dipping."
      }
    ],
    cookingVessel: "Large cast iron skillet with lid",
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    difficulty: "Medium",
    mealType: "Breakfast",
    cuisine: "Middle Eastern",
    categories: ["Hot Breakfast", "International", "Egg-based dishes"],
    dietaryCategories: ["Vegetarian"],
    tags: ["shakshuka", "eggs", "tomato sauce", "middle eastern"]
  },
  // More recipes would be added here...
];

export default hotBreakfastRecipes;
