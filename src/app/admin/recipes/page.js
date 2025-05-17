import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/auth-context';
import AuthGuard from '../../../components/AuthGuard';

export default function RecipeManagement() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    instructions: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setRecipes([
      {
        id: '1',
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
        prepTime: '10 minutes',
        cookTime: '15 minutes',
        ingredients: '400g spaghetti, 200g pancetta, 4 eggs, 50g pecorino cheese, 50g parmesan, black pepper',
        instructions: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Combine all ingredients',
        image: '/images/carbonara.jpg'
      },
      {
        id: '2',
        name: 'Chicken Tikka Masala',
        description: 'Creamy and flavorful Indian curry with tender chicken pieces',
        prepTime: '20 minutes',
        cookTime: '30 minutes',
        ingredients: '500g chicken breast, 200ml yogurt, 400ml tomato sauce, 2 onions, 4 garlic cloves, ginger, spices',
        instructions: '1. Marinate chicken\n2. Cook chicken\n3. Prepare sauce\n4. Combine and simmer',
        image: '/images/tikka_masala.jpg'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecipe = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      const recipeToAdd = {
        ...newRecipe,
        id: Date.now().toString()
      };
      
      setRecipes(prev => [...prev, recipeToAdd]);
      setNewRecipe({
        name: '',
        description: '',
        prepTime: '',
        cookTime: '',
        ingredients: '',
        instructions: '',
        image: ''
      });
      setIsLoading(false);
    }, 500);
  };

  const handleEditRecipe = (id) => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    setNewRecipe(recipeToEdit);
    setEditingId(id);
  };

  const handleUpdateRecipe = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      setRecipes(prev => 
        prev.map(recipe => 
          recipe.id === editingId ? { ...newRecipe, id: editingId } : recipe
        )
      );
      setNewRecipe({
        name: '',
        description: '',
        prepTime: '',
        cookTime: '',
        ingredients: '',
        instructions: '',
        image: ''
      });
      setEditingId(null);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
        setIsLoading(false);
      }, 500);
    }
  };

  // Admin dashboard content
  const AdminContent = () => {
    // Check if user has admin privileges
    if (!isAdmin()) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          You do not have administrator privileges.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Recipe Management</h1>
          <button
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
        
        {/* Recipe Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Recipe' : 'Add New Recipe'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                value={newRecipe.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={newRecipe.image}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newRecipe.description}
              onChange={handleInputChange}
              className="input-field"
              rows="2"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Prep Time
              </label>
              <input
                type="text"
                name="prepTime"
                value={newRecipe.prepTime}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cook Time
              </label>
              <input
                type="text"
                name="cookTime"
                value={newRecipe.cookTime}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={newRecipe.ingredients}
              onChange={handleInputChange}
              className="input-field"
              rows="4"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={newRecipe.instructions}
              onChange={handleInputChange}
              className="input-field"
              rows="4"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            {editingId ? (
              <>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewRecipe({
                      name: '',
                      description: '',
                      prepTime: '',
                      cookTime: '',
                      ingredients: '',
                      instructions: '',
                      image: ''
                    });
                  }}
                  className="btn-secondary mr-2"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRecipe}
                  className="btn-primary"
                  disabled={isLoading || !newRecipe.name}
                >
                  {isLoading ? 'Updating...' : 'Update Recipe'}
                </button>
              </>
            ) : (
              <button
                onClick={handleAddRecipe}
                className="btn-primary"
                disabled={isLoading || !newRecipe.name}
              >
                {isLoading ? 'Adding...' : 'Add Recipe'}
              </button>
            )}
          </div>
        </div>
        
        {/* Recipe List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recipe List</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prep/Cook Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recipes.map(recipe => (
                  <tr key={recipe.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {recipe.image && (
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {recipe.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {recipe.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {recipe.prepTime} / {recipe.cookTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditRecipe(recipe.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AuthGuard
          fallback={
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
              <p className="mb-4">You must be logged in as an administrator to access this page.</p>
              <button
                onClick={() => router.push('/login')}
                className="btn-primary w-full"
              >
                Log In
              </button>
            </div>
          }
        >
          <AdminContent />
        </AuthGuard>
      </div>
    </div>
  );
}
