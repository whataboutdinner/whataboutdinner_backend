// Expanded Lunch Recipes - Salads Subcategory (20 recipes)

const saladRecipes = [
  {
    title: "Grilled Chicken Caesar Salad",
    description: "A classic Caesar salad elevated with juicy grilled chicken, homemade croutons, and a creamy homemade dressing. Perfect for a satisfying lunch that's both nutritious and delicious.",
    ingredients: [
      {
        name: "boneless, skinless chicken breasts",
        quantity: "2",
        unit: "medium",
        notes: "about 6 ounces each"
      },
      {
        name: "olive oil",
        quantity: "2",
        unit: "tablespoons",
        notes: "divided"
      },
      {
        name: "garlic powder",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "dried oregano",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "salt",
        quantity: "1/2",
        unit: "teaspoon",
        notes: "divided"
      },
      {
        name: "black pepper",
        quantity: "1/4",
        unit: "teaspoon",
        notes: "divided"
      },
      {
        name: "day-old bread",
        quantity: "2",
        unit: "slices",
        notes: "cubed (preferably sourdough or French bread)"
      },
      {
        name: "romaine lettuce",
        quantity: "2",
        unit: "heads",
        notes: "washed, dried, and torn into bite-sized pieces"
      },
      {
        name: "Parmesan cheese",
        quantity: "1/2",
        unit: "cup",
        notes: "freshly grated, plus more for serving"
      },
      {
        name: "garlic cloves",
        quantity: "2",
        unit: "",
        notes: "minced"
      },
      {
        name: "anchovy fillets",
        quantity: "2",
        unit: "",
        notes: "minced (optional)"
      },
      {
        name: "Dijon mustard",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "Worcestershire sauce",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "lemon juice",
        quantity: "2",
        unit: "tablespoons",
        notes: "freshly squeezed"
      },
      {
        name: "egg yolk",
        quantity: "1",
        unit: "large",
        notes: "pasteurized for food safety"
      },
      {
        name: "mayonnaise",
        quantity: "1/4",
        unit: "cup"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Preheat grill or grill pan to medium-high heat."
      },
      {
        order: 2,
        instruction: "In a small bowl, mix 1 tablespoon olive oil with garlic powder, dried oregano, 1/4 teaspoon salt, and 1/8 teaspoon pepper."
      },
      {
        order: 3,
        instruction: "Brush the chicken breasts with the seasoned oil mixture on both sides."
      },
      {
        order: 4,
        instruction: "Grill chicken for 5-7 minutes per side, or until internal temperature reaches 165°F (74°C). Remove from grill and let rest for 5 minutes before slicing."
      },
      {
        order: 5,
        instruction: "While chicken is cooking, preheat oven to 375°F (190°C)."
      },
      {
        order: 6,
        instruction: "Toss bread cubes with remaining 1 tablespoon olive oil and a pinch of salt. Spread on a baking sheet and bake for 10-12 minutes, until golden and crisp, stirring halfway through. Set aside to cool."
      },
      {
        order: 7,
        instruction: "For the dressing, in a medium bowl, whisk together minced garlic, anchovies (if using), Dijon mustard, Worcestershire sauce, lemon juice, egg yolk, and mayonnaise until smooth."
      },
      {
        order: 8,
        instruction: "Slowly whisk in 1/4 cup olive oil until emulsified. Season with remaining salt and pepper."
      },
      {
        order: 9,
        instruction: "In a large bowl, toss the romaine lettuce with enough dressing to coat lightly."
      },
      {
        order: 10,
        instruction: "Add the grated Parmesan cheese and homemade croutons, tossing gently to combine."
      },
      {
        order: 11,
        instruction: "Divide the salad between plates, top with sliced grilled chicken, and sprinkle with additional Parmesan cheese."
      },
      {
        order: 12,
        instruction: "Serve immediately with extra dressing on the side if desired."
      }
    ],
    cookingVessel: "Grill or grill pan, baking sheet, mixing bowls",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    mealType: "Lunch",
    cuisine: "American",
    categories: ["Salads", "Protein-focused salads", "American classics"],
    dietaryCategories: [],
    tags: ["caesar salad", "grilled chicken", "homemade dressing", "protein-rich"]
  },
  {
    title: "Mediterranean Quinoa Salad",
    description: "A vibrant, protein-packed salad featuring nutty quinoa, fresh vegetables, feta cheese, and a zesty lemon dressing. Perfect for meal prep and stays fresh for days in the refrigerator.",
    ingredients: [
      {
        name: "quinoa",
        quantity: "1",
        unit: "cup",
        notes: "rinsed"
      },
      {
        name: "water",
        quantity: "2",
        unit: "cups"
      },
      {
        name: "salt",
        quantity: "1/2",
        unit: "teaspoon",
        notes: "divided"
      },
      {
        name: "cucumber",
        quantity: "1",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "cherry tomatoes",
        quantity: "1",
        unit: "cup",
        notes: "halved"
      },
      {
        name: "red bell pepper",
        quantity: "1",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "red onion",
        quantity: "1/4",
        unit: "cup",
        notes: "finely diced"
      },
      {
        name: "Kalamata olives",
        quantity: "1/3",
        unit: "cup",
        notes: "pitted and halved"
      },
      {
        name: "feta cheese",
        quantity: "1/2",
        unit: "cup",
        notes: "crumbled"
      },
      {
        name: "fresh parsley",
        quantity: "1/4",
        unit: "cup",
        notes: "chopped"
      },
      {
        name: "fresh mint",
        quantity: "2",
        unit: "tablespoons",
        notes: "chopped"
      },
      {
        name: "extra virgin olive oil",
        quantity: "1/4",
        unit: "cup"
      },
      {
        name: "lemon juice",
        quantity: "3",
        unit: "tablespoons",
        notes: "freshly squeezed"
      },
      {
        name: "garlic",
        quantity: "1",
        unit: "clove",
        notes: "minced"
      },
      {
        name: "dried oregano",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1/4",
        unit: "teaspoon"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a medium saucepan, combine quinoa, water, and 1/4 teaspoon salt. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes, or until water is absorbed and quinoa is tender."
      },
      {
        order: 2,
        instruction: "Remove from heat, fluff with a fork, and transfer to a large bowl to cool completely."
      },
      {
        order: 3,
        instruction: "While quinoa is cooling, prepare the dressing by whisking together olive oil, lemon juice, minced garlic, dried oregano, remaining 1/4 teaspoon salt, and black pepper in a small bowl."
      },
      {
        order: 4,
        instruction: "To the cooled quinoa, add cucumber, cherry tomatoes, red bell pepper, red onion, Kalamata olives, feta cheese, parsley, and mint."
      },
      {
        order: 5,
        instruction: "Pour the dressing over the salad and toss gently to combine."
      },
      {
        order: 6,
        instruction: "Taste and adjust seasoning if necessary."
      },
      {
        order: 7,
        instruction: "Cover and refrigerate for at least 30 minutes to allow flavors to meld."
      },
      {
        order: 8,
        instruction: "Serve chilled or at room temperature."
      }
    ],
    cookingVessel: "Medium saucepan, large mixing bowl",
    prepTime: 15,
    cookTime: 15,
    servings: 6,
    difficulty: "Easy",
    mealType: "Lunch",
    cuisine: "Mediterranean",
    categories: ["Salads", "Grain-based salads", "Make-ahead lunches"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["quinoa", "mediterranean", "meal prep", "healthy"]
  }
  // More recipes would be added here...
];

export default saladRecipes;
