// Expanded Drink Recipes - Hot Beverages Subcategory (20 recipes)

const hotBeveragesRecipes = [
  {
    title: "Maple Cinnamon Latte",
    description: "A cozy homemade latte infused with warm cinnamon and pure maple syrup for a naturally sweetened coffee treat that's perfect for chilly mornings.",
    ingredients: [
      {
        name: "espresso",
        quantity: "2",
        unit: "shots",
        notes: "or 1/2 cup strong brewed coffee"
      },
      {
        name: "milk",
        quantity: "1",
        unit: "cup",
        notes: "whole, 2%, or plant-based"
      },
      {
        name: "pure maple syrup",
        quantity: "1",
        unit: "tablespoon",
        notes: "grade A or B"
      },
      {
        name: "ground cinnamon",
        quantity: "1/4",
        unit: "teaspoon",
        notes: "plus more for garnish"
      },
      {
        name: "vanilla extract",
        quantity: "1/4",
        unit: "teaspoon"
      },
      {
        name: "cinnamon stick",
        quantity: "1",
        unit: "",
        notes: "for garnish (optional)"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Prepare espresso or strong coffee and pour into a large mug."
      },
      {
        order: 2,
        instruction: "In a small saucepan over medium heat, combine milk, maple syrup, ground cinnamon, and vanilla extract."
      },
      {
        order: 3,
        instruction: "Heat the milk mixture, whisking occasionally, until hot but not boiling and the maple syrup is fully dissolved."
      },
      {
        order: 4,
        instruction: "For a frothy texture, use a milk frother, immersion blender, or transfer to a blender and blend until foamy."
      },
      {
        order: 5,
        instruction: "Slowly pour the hot milk mixture over the espresso, holding back the foam with a spoon."
      },
      {
        order: 6,
        instruction: "Top with the reserved foam and sprinkle with additional ground cinnamon."
      },
      {
        order: 7,
        instruction: "Garnish with a cinnamon stick if desired and serve immediately."
      }
    ],
    cookingVessel: "Small saucepan, milk frother or blender (optional)",
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "American",
    categories: ["Hot Beverages", "Coffee drinks", "Breakfast"],
    dietaryCategories: ["Vegetarian", "Gluten-Free"],
    tags: ["latte", "maple", "cinnamon", "coffee", "homemade"]
  },
  {
    title: "Turmeric Golden Milk",
    description: "A warming, anti-inflammatory beverage featuring turmeric, ginger, and warming spices in a creamy milk base. Perfect as a soothing nighttime drink or immunity booster.",
    ingredients: [
      {
        name: "milk",
        quantity: "2",
        unit: "cups",
        notes: "dairy or plant-based (coconut milk works well)"
      },
      {
        name: "ground turmeric",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "fresh ginger",
        quantity: "1/2",
        unit: "inch piece",
        notes: "peeled and grated"
      },
      {
        name: "ground cinnamon",
        quantity: "1/4",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1",
        unit: "pinch",
        notes: "enhances turmeric absorption"
      },
      {
        name: "honey or maple syrup",
        quantity: "1",
        unit: "tablespoon",
        notes: "or to taste"
      },
      {
        name: "coconut oil",
        quantity: "1",
        unit: "teaspoon",
        notes: "optional"
      },
      {
        name: "vanilla extract",
        quantity: "1/4",
        unit: "teaspoon",
        notes: "optional"
      },
      {
        name: "ground cardamom",
        quantity: "1",
        unit: "pinch",
        notes: "optional"
      },
      {
        name: "ground nutmeg",
        quantity: "1",
        unit: "pinch",
        notes: "optional"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "In a small saucepan over medium-low heat, combine milk, turmeric, grated ginger, cinnamon, and black pepper."
      },
      {
        order: 2,
        instruction: "Whisk continuously until the mixture is hot but not boiling, about 3-5 minutes."
      },
      {
        order: 3,
        instruction: "Remove from heat and strain through a fine-mesh sieve to remove the ginger pieces."
      },
      {
        order: 4,
        instruction: "Return the strained milk to the saucepan over low heat. Add honey or maple syrup, coconut oil (if using), vanilla extract (if using), cardamom (if using), and nutmeg (if using)."
      },
      {
        order: 5,
        instruction: "Whisk until sweetener and oil are fully incorporated and the mixture is hot."
      },
      {
        order: 6,
        instruction: "Taste and adjust sweetness if needed."
      },
      {
        order: 7,
        instruction: "Pour into mugs and serve immediately."
      }
    ],
    cookingVessel: "Small saucepan, fine-mesh sieve",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    mealType: "Drink",
    cuisine: "Indian",
    categories: ["Hot Beverages", "Wellness drinks", "Nighttime drinks"],
    dietaryCategories: ["Vegetarian", "Gluten-Free", "Dairy-Free options"],
    tags: ["golden milk", "turmeric", "anti-inflammatory", "wellness", "soothing"]
  }
  // More recipes would be added here...
];

export default hotBeveragesRecipes;
