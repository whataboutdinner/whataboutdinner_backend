import React from 'react';
import Link from 'next/link';

export default function HostCreatePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-600 text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Host a Food Party</h1>
            <p className="mt-2">Create a new party and invite friends to join</p>
          </div>
          
          <div className="p-8">
            <form>
              <div className="mb-6">
                <label htmlFor="partyName" className="block text-gray-700 font-medium mb-2">Party Name</label>
                <input 
                  type="text" 
                  id="partyName" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter a name for your party"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Party Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-orange-500 transition duration-300">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="recipeVoting" 
                        name="partyType" 
                        className="mt-1 mr-3"
                        defaultChecked
                      />
                      <div>
                        <label htmlFor="recipeVoting" className="font-medium cursor-pointer">Recipe Voting</label>
                        <p className="text-sm text-gray-600 mt-1">
                          Add recipe options and let everyone vote on what to eat
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-orange-500 transition duration-300">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="restaurantOrder" 
                        name="partyType" 
                        className="mt-1 mr-3"
                      />
                      <div>
                        <label htmlFor="restaurantOrder" className="font-medium cursor-pointer">Restaurant Order</label>
                        <p className="text-sm text-gray-600 mt-1">
                          Select a restaurant and let everyone order their own meal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recipe Options Section - shown when Recipe Voting is selected */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Recipe Options</label>
                <p className="text-sm text-gray-600 mb-4">
                  Add at least 2 recipe options for your guests to vote on
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Recipe option 1"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Recipe option 2"
                    />
                  </div>
                </div>
                
                <button 
                  type="button" 
                  className="mt-3 text-orange-600 font-medium hover:underline flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Another Option
                </button>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition duration-300"
              >
                Create Party
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Want to join an existing party instead?{' '}
                <Link href="/join">
                  <a className="text-orange-600 font-medium hover:underline">Join a party</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How What About Dinner Works</h2>
          <p className="text-gray-600 mb-8">
            Create a party, invite friends, and make dinner decisions together in three simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Create a Party</h3>
              <p className="text-gray-600">Set up your food party and get a unique 6-digit code</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Invite Friends</h3>
              <p className="text-gray-600">Share your party code with friends and family</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Decide Together</h3>
              <p className="text-gray-600">Everyone votes or orders, and dinner is decided!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
