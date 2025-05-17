import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/auth-context';
import AuthGuard from '../../../components/AuthGuard';

export default function RestaurantManagement() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    cuisine: '',
    address: '',
    phone: '',
    deliveryTime: '',
    minimumOrder: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setRestaurants([
      {
        id: '1',
        name: 'Pizza Palace',
        description: 'Authentic Italian pizzas and pasta',
        cuisine: 'Italian',
        address: '123 Main St, Anytown',
        phone: '555-123-4567',
        deliveryTime: '30-45 minutes',
        minimumOrder: '$15',
        image: '/images/pizza_palace.jpg'
      },
      {
        id: '2',
        name: 'Sushi Express',
        description: 'Fresh sushi and Japanese cuisine',
        cuisine: 'Japanese',
        address: '456 Oak Ave, Anytown',
        phone: '555-987-6543',
        deliveryTime: '40-55 minutes',
        minimumOrder: '$20',
        image: '/images/sushi_express.jpg'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRestaurant = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      const restaurantToAdd = {
        ...newRestaurant,
        id: Date.now().toString()
      };
      
      setRestaurants(prev => [...prev, restaurantToAdd]);
      setNewRestaurant({
        name: '',
        description: '',
        cuisine: '',
        address: '',
        phone: '',
        deliveryTime: '',
        minimumOrder: '',
        image: ''
      });
      setIsLoading(false);
    }, 500);
  };

  const handleEditRestaurant = (id) => {
    const restaurantToEdit = restaurants.find(restaurant => restaurant.id === id);
    setNewRestaurant(restaurantToEdit);
    setEditingId(id);
  };

  const handleUpdateRestaurant = () => {
    setIsLoading(true);
    // In production, this would be an API call
    setTimeout(() => {
      setRestaurants(prev => 
        prev.map(restaurant => 
          restaurant.id === editingId ? { ...newRestaurant, id: editingId } : restaurant
        )
      );
      setNewRestaurant({
        name: '',
        description: '',
        cuisine: '',
        address: '',
        phone: '',
        deliveryTime: '',
        minimumOrder: '',
        image: ''
      });
      setEditingId(null);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
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
          <h1 className="text-3xl font-bold">Restaurant Management</h1>
          <button
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
        
        {/* Restaurant Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                name="name"
                value={newRestaurant.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cuisine Type
              </label>
              <input
                type="text"
                name="cuisine"
                value={newRestaurant.cuisine}
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
              value={newRestaurant.description}
              onChange={handleInputChange}
              className="input-field"
              rows="2"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={newRestaurant.address}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={newRestaurant.phone}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Delivery Time
              </label>
              <input
                type="text"
                name="deliveryTime"
                value={newRestaurant.deliveryTime}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g. 30-45 minutes"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Minimum Order
              </label>
              <input
                type="text"
                name="minimumOrder"
                value={newRestaurant.minimumOrder}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g. $15"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={newRestaurant.image}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          
          <div className="flex justify-end">
            {editingId ? (
              <>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewRestaurant({
                      name: '',
                      description: '',
                      cuisine: '',
                      address: '',
                      phone: '',
                      deliveryTime: '',
                      minimumOrder: '',
                      image: ''
                    });
                  }}
                  className="btn-secondary mr-2"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRestaurant}
                  className="btn-primary"
                  disabled={isLoading || !newRestaurant.name}
                >
                  {isLoading ? 'Updating...' : 'Update Restaurant'}
                </button>
              </>
            ) : (
              <button
                onClick={handleAddRestaurant}
                className="btn-primary"
                disabled={isLoading || !newRestaurant.name}
              >
                {isLoading ? 'Adding...' : 'Add Restaurant'}
              </button>
            )}
          </div>
        </div>
        
        {/* Restaurant List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Restaurant List</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuisine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min. Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurants.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {restaurant.image && (
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {restaurant.cuisine}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {restaurant.deliveryTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {restaurant.minimumOrder}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditRestaurant(restaurant.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
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
