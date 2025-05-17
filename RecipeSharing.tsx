import React from 'react';

export const RecipeCreateForm = () => {
  return <div>Recipe Create Form Placeholder</div>;
};

interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  prepTime?: string;
  // Add other recipe properties as needed
}

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  if (!recipes || recipes.length === 0) {
    return <div>No recipes to display.</div>;
  }
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Recipes</h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => onSelectRecipe(recipe.id)}>
            {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-32 object-cover rounded-md mb-2" />}
            <h5 className="font-medium text-gray-800">{recipe.title}</h5>
            {recipe.prepTime && <p className="text-sm text-gray-600">Prep time: {recipe.prepTime}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};


// Default export can be one of the components or null if not needed as default
const RecipeSharing = () => {
  // This component might not be used directly if RecipeCreateForm and RecipeList are imported separately
  return (
    <div>
      <RecipeCreateForm />
      {/* Example usage of RecipeList, though it's usually used with dynamic data */}
      <RecipeList recipes={[]} onSelectRecipe={() => {}} />
    </div>
  );
};

export default RecipeSharing;

