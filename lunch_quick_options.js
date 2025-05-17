// Expanded Lunch Recipes - Quick Lunch Options Subcategory (20 recipes)

const quickLunchRecipes = [
  {
    title: "15-Minute Mediterranean Chickpea Bowl",
    description: "A quick and nutritious lunch bowl featuring protein-packed chickpeas, fresh vegetables, and a zesty lemon tahini dressing. Perfect for busy weekdays when you need a fast but satisfying meal.",
    ingredients: [
      {
        name: "canned chickpeas",
        quantity: "1",
        unit: "15-oz can",
        notes: "drained and rinsed"
      },
      {
        name: "cherry tomatoes",
        quantity: "1",
        unit: "cup",
        notes: "halved"
      },
      {
        name: "cucumber",
        quantity: "1/2",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "red bell pepper",
        quantity: "1/2",
        unit: "",
        notes: "diced"
      },
      {
        name: "red onion",
        quantity: "1/4",
        unit: "small",
        notes: "thinly sliced"
      },
      {
        name: "kalamata olives",
        quantity: "1/4",
        unit: "cup",
        notes: "pitted and halved"
      },
      {
        name: "feta cheese",
        quantity: "1/4",
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
        name: "tahini",
        quantity: "2",
        unit: "tablespoons"
      },
      {
        name: "lemon juice",
        quantity: "1",
        unit: "tablespoon",
        notes: "freshly squeezed"
      },
      {
        name: "water",
        quantity: "1-2",
        unit: "tablespoons"
      },
      {
        name: "garlic",
        quantity: "1",
        unit: "small clove",
        notes: "minced or pressed"
      },
      {
        name: "olive oil",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "salt",
        quantity: "1/4",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1/8",
        unit: "teaspoon"
      },
      {
        name: "ground cumin",
        quantity: "1/4",
        unit: "teaspoon"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a small bowl, whisk together tahini, lemon juice, water, garlic, olive oil, salt, pepper, and cumin until smooth. Add more water if needed to reach desired consistency."
      },
      {
        order: 2,
        instruction: "In a medium bowl, combine chickpeas, tomatoes, cucumber, bell pepper, red onion, olives, and parsley."
      },
      {
        order: 3,
        instruction: "Drizzle the tahini dressing over the chickpea mixture and toss gently to combine."
      },
      {
        order: 4,
        instruction: "Transfer to a serving bowl and sprinkle with crumbled feta cheese."
      },
      {
        order: 5,
        instruction: "Serve immediately or refrigerate for up to 2 days."
      }
    ],
    cookingVessel: "Mixing bowls",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    mealType: "Lunch",
    cuisine: "Mediterranean",
    categories: ["Quick Lunch Options", "15-minute meals", "Lunch bowls"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["chickpeas", "no-cook", "protein-rich", "quick meal"]
  },
  {
    title: "Avocado Tuna Salad Lettuce Wraps",
    description: "A light and refreshing lunch option featuring creamy avocado tuna salad wrapped in crisp lettuce leaves. Ready in just 10 minutes and packed with protein and healthy fats.",
    ingredients: [
      {
        name: "canned tuna",
        quantity: "2",
        unit: "5-oz cans",
        notes: "packed in water, drained"
      },
      {
        name: "ripe avocado",
        quantity: "1",
        unit: "large",
        notes: "peeled and diced"
      },
      {
        name: "celery",
        quantity: "1",
        unit: "stalk",
        notes: "finely diced"
      },
      {
        name: "red onion",
        quantity: "2",
        unit: "tablespoons",
        notes: "finely diced"
      },
      {
        name: "fresh lemon juice",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "Dijon mustard",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "olive oil",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "salt",
        quantity: "1/4",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1/8",
        unit: "teaspoon"
      },
      {
        name: "fresh dill",
        quantity: "1",
        unit: "tablespoon",
        notes: "chopped (optional)"
      },
      {
        name: "butter lettuce or romaine leaves",
        quantity: "8",
        unit: "large leaves",
        notes: "washed and dried"
      },
      {
        name: "cherry tomatoes",
        quantity: "1/2",
        unit: "cup",
        notes: "halved (optional)"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a medium bowl, gently flake the drained tuna with a fork."
      },
      {
        order: 2,
        instruction: "Add diced avocado, celery, red onion, lemon juice, Dijon mustard, olive oil, salt, pepper, and dill (if using)."
      },
      {
        order: 3,
        instruction: "Gently fold the ingredients together, being careful not to mash the avocado completely."
      },
      {
        order: 4,
        instruction: "Spoon the tuna-avocado mixture evenly onto the lettuce leaves."
      },
      {
        order: 5,
        instruction: "Top with halved cherry tomatoes if desired."
      },
      {
        order: 6,
        instruction: "Serve immediately, or wrap tightly in parchment paper for a portable lunch."
      }
    ],
    cookingVessel: "Mixing bowl",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    mealType: "Lunch",
    cuisine: "American",
    categories: ["Quick Lunch Options", "15-minute meals", "Low-carb"],
    dietaryCategories: ["Gluten-Free", "Dairy-Free", "Low-Carb"],
    tags: ["tuna", "avocado", "no-cook", "protein-rich", "lettuce wraps"]
  }
  // More recipes would be added here...
];

export default quickLunchRecipes;
