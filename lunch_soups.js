// Expanded Lunch Recipes - Soups Subcategory (20 recipes)

const soupRecipes = [
  {
    title: "Creamy Tomato Basil Soup",
    description: "A comforting classic featuring ripe tomatoes, fresh basil, and a touch of cream. Perfect paired with a grilled cheese sandwich for the ultimate comfort food lunch.",
    ingredients: [
      {
        name: "olive oil",
        quantity: "2",
        unit: "tablespoons"
      },
      {
        name: "yellow onion",
        quantity: "1",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "garlic cloves",
        quantity: "3",
        unit: "",
        notes: "minced"
      },
      {
        name: "carrots",
        quantity: "2",
        unit: "medium",
        notes: "diced"
      },
      {
        name: "canned whole tomatoes",
        quantity: "28",
        unit: "oz"
      },
      {
        name: "tomato paste",
        quantity: "2",
        unit: "tablespoons"
      },
      {
        name: "vegetable broth",
        quantity: "3",
        unit: "cups"
      },
      {
        name: "dried oregano",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "dried thyme",
        quantity: "1/2",
        unit: "teaspoon"
      },
      {
        name: "sugar",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "salt",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "black pepper",
        quantity: "1/4",
        unit: "teaspoon"
      },
      {
        name: "red pepper flakes",
        quantity: "1/8",
        unit: "teaspoon",
        notes: "optional"
      },
      {
        name: "fresh basil leaves",
        quantity: "1/4",
        unit: "cup",
        notes: "chopped, plus more for garnish"
      },
      {
        name: "heavy cream",
        quantity: "1/2",
        unit: "cup"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "Heat olive oil in a large Dutch oven or heavy-bottomed pot over medium heat."
      },
      {
        order: 2,
        instruction: "Add diced onion and cook until translucent, about 5 minutes."
      },
      {
        order: 3,
        instruction: "Add minced garlic and cook until fragrant, about 30 seconds."
      },
      {
        order: 4,
        instruction: "Add diced carrots and cook for 5 minutes, stirring occasionally."
      },
      {
        order: 5,
        instruction: "Add canned tomatoes with their juice, breaking them up with a wooden spoon."
      },
      {
        order: 6,
        instruction: "Stir in tomato paste, vegetable broth, oregano, thyme, sugar, salt, pepper, and red pepper flakes (if using)."
      },
      {
        order: 7,
        instruction: "Bring to a boil, then reduce heat and simmer, partially covered, for 30 minutes."
      },
      {
        order: 8,
        instruction: "Remove from heat and stir in chopped basil."
      },
      {
        order: 9,
        instruction: "Using an immersion blender, blend the soup until smooth. Alternatively, carefully transfer soup in batches to a blender."
      },
      {
        order: 10,
        instruction: "Return soup to pot (if using a standard blender) and stir in heavy cream. Heat gently over low heat until warmed through."
      },
      {
        order: 11,
        instruction: "Taste and adjust seasoning if necessary."
      },
      {
        order: 12,
        instruction: "Serve hot, garnished with additional fresh basil leaves."
      }
    ],
    cookingVessel: "Dutch oven or large heavy-bottomed pot, immersion blender or standard blender",
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    difficulty: "Easy",
    mealType: "Lunch",
    cuisine: "Italian",
    categories: ["Soups", "Creamy soups", "Comfort food"],
    dietaryCategories: ["Vegetarian"],
    tags: ["tomato soup", "creamy", "basil", "comfort food"]
  },
  {
    title: "Vietnamese Pho Ga (Chicken Noodle Soup)",
    description: "A fragrant Vietnamese chicken noodle soup featuring aromatic spices, tender chicken, rice noodles, and fresh herbs. A satisfying and nourishing lunch option.",
    ingredients: [
      {
        name: "chicken bones or carcass",
        quantity: "1",
        unit: "lb",
        notes: "optional, for extra flavor"
      },
      {
        name: "bone-in, skin-on chicken thighs",
        quantity: "1 1/2",
        unit: "lbs"
      },
      {
        name: "yellow onion",
        quantity: "1",
        unit: "large",
        notes: "halved"
      },
      {
        name: "fresh ginger",
        quantity: "3",
        unit: "inch piece",
        notes: "sliced"
      },
      {
        name: "star anise",
        quantity: "3",
        unit: "whole"
      },
      {
        name: "cinnamon stick",
        quantity: "1",
        unit: "whole"
      },
      {
        name: "cloves",
        quantity: "3",
        unit: "whole"
      },
      {
        name: "coriander seeds",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "fish sauce",
        quantity: "2",
        unit: "tablespoons"
      },
      {
        name: "rock sugar or granulated sugar",
        quantity: "1",
        unit: "tablespoon"
      },
      {
        name: "salt",
        quantity: "1",
        unit: "teaspoon"
      },
      {
        name: "water",
        quantity: "10",
        unit: "cups"
      },
      {
        name: "rice noodles",
        quantity: "8",
        unit: "oz",
        notes: "dried, flat"
      },
      {
        name: "bean sprouts",
        quantity: "2",
        unit: "cups"
      },
      {
        name: "fresh Thai basil leaves",
        quantity: "1",
        unit: "cup"
      },
      {
        name: "fresh cilantro leaves",
        quantity: "1/2",
        unit: "cup"
      },
      {
        name: "lime",
        quantity: "1",
        unit: "",
        notes: "cut into wedges"
      },
      {
        name: "jalapeño or Thai chili",
        quantity: "1",
        unit: "",
        notes: "thinly sliced"
      },
      {
        name: "green onions",
        quantity: "3",
        unit: "",
        notes: "thinly sliced"
      },
      {
        name: "hoisin sauce",
        quantity: "",
        unit: "",
        notes: "for serving"
      },
      {
        name: "sriracha sauce",
        quantity: "",
        unit: "",
        notes: "for serving"
      }
    ],
    steps: [
      {
        order: 1,
        instruction: "If using chicken bones, place them in a large pot with cold water and bring to a boil. Boil for 5 minutes, then drain and rinse to remove impurities."
      },
      {
        order: 2,
        instruction: "In a dry skillet over medium heat, char the halved onion and ginger slices until slightly blackened, about 5 minutes, turning occasionally."
      },
      {
        order: 3,
        instruction: "In the same skillet, toast star anise, cinnamon stick, cloves, and coriander seeds until fragrant, about 2-3 minutes."
      },
      {
        order: 4,
        instruction: "In a large stockpot, combine chicken bones (if using), chicken thighs, charred onion and ginger, toasted spices, fish sauce, sugar, salt, and water."
      },
      {
        order: 5,
        instruction: "Bring to a boil, then reduce heat to maintain a gentle simmer. Skim off any foam that rises to the surface."
      },
      {
        order: 6,
        instruction: "Simmer uncovered for 1 hour, or until chicken is tender and falling off the bone."
      },
      {
        order: 7,
        instruction: "Remove chicken thighs from the broth and set aside to cool slightly. Once cool enough to handle, shred the meat and discard bones and skin."
      },
      {
        order: 8,
        instruction: "Strain the broth through a fine-mesh sieve lined with cheesecloth into another pot, discarding solids."
      },
      {
        order: 9,
        instruction: "Return broth to a simmer and adjust seasoning with additional fish sauce or salt if needed."
      },
      {
        order: 10,
        instruction: "Meanwhile, prepare rice noodles according to package instructions, then drain and rinse with cold water."
      },
      {
        order: 11,
        instruction: "To serve, divide noodles among bowls, top with shredded chicken, and ladle hot broth over."
      },
      {
        order: 12,
        instruction: "Serve with bean sprouts, Thai basil, cilantro, lime wedges, sliced chilies, green onions, hoisin sauce, and sriracha on the side for diners to add as desired."
      }
    ],
    cookingVessel: "Large stockpot, skillet, fine-mesh sieve",
    prepTime: 20,
    cookTime: 70,
    servings: 4,
    difficulty: "Medium",
    mealType: "Lunch",
    cuisine: "Vietnamese",
    categories: ["Soups", "Broth-based soups", "International"],
    dietaryCategories: ["Dairy-Free"],
    tags: ["pho", "vietnamese", "chicken soup", "rice noodles"]
  }
  // More recipes would be added here...
];

export default soupRecipes;
