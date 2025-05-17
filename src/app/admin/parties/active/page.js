import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/auth-context';
import AuthGuard from '../../../components/AuthGuard';

export default function PartyManagement() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [parties, setParties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'recipe', 'restaurant'

  // Mock data for demonstration
  useEffect(() => {
    setParties([
      {
        id: '1',
        code: '123456',
        name: 'Friday Night Dinner',
        type: 'recipe',
        host: 'John Doe',
        participants: 5,
        status: 'active',
        createdAt: '2025-04-18'
      },
      {
        id: '2',
        code: '234567',
        name: 'Team Lunch',
        type: 'restaurant',
        host: 'Jane Smith',
        participants: 8,
        status: 'active',
        createdAt: '2025-04-19'
      },
      {
        id: '3',
        code: '345678',
        name: 'Family Dinner',
        type: 'recipe',
        host: 'Mike Johnson',
        participants: 4,
        status: 'completed',
        createdAt: '2025-04-15'
      },
      {
        id: '4',
        code: '456789',
        name: 'Birthday Celebration',
        type: 'restaurant',
        host: 'Sarah Williams',
        participants: 12,
        status: 'completed',
        createdAt: '2025-04-10'
      }
    ]);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredParties = parties.filter(party => {
    if (filter === 'all') return true;
    return party.type === filter;
  });

  const handleViewParty = (id) => {
    // In a real implementation, this would navigate to a detailed view
    alert(`Viewing party details for ID: ${id}`);
  };

  const handleDeleteParty = (id) => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      setIsLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setParties(prev => prev.filter(party => party.id !== id));
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
          <h1 className="text-3xl font-bold">Party Management</h1>
          <button
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
        
        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Parties</h2>
            
            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Filter by type:</label>
              <select
                value={filter}
                onChange={handleFilterChange}
                className="input-field w-auto"
              >
                <option value="all">All Parties</option>
                <option value="recipe">Recipe Voting</option>
                <option value="restaurant">Restaurant Orders</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Party List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParties.map(party => (
                  <tr key={party.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {party.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {party.code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        party.type === 'recipe' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {party.type === 'recipe' ? 'Recipe Voting' : 'Restaurant Order'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {party.host}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {party.participants}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        party.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {party.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {party.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewParty(party.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteParty(party.id)}
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
          
          {filteredParties.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No parties found matching the selected filter.
            </div>
          )}
        </div>
        
        {/* Analytics Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Party Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Parties</h3>
              <p className="text-3xl font-bold text-orange-500">{parties.length}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Recipe Voting Parties</h3>
              <p className="text-3xl font-bold text-blue-500">
                {parties.filter(party => party.type === 'recipe').length}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Restaurant Order Parties</h3>
              <p className="text-3xl font-bold text-purple-500">
                {parties.filter(party => party.type === 'restaurant').length}
              </p>
            </div>
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
