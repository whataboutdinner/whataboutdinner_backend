import React from 'react';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-600 text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Join a Food Party</h1>
            <p className="mt-2">Enter your name and the 6-digit party code to join</p>
          </div>
          
          <div className="p-8">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="partyCode" className="block text-gray-700 font-medium mb-2">Party Code</label>
                <input 
                  type="text" 
                  id="partyCode" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Ask the host for the 6-digit code from their What About Dinner party
                </p>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition duration-300"
              >
                Join Party
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Want to host your own party instead?{' '}
                <Link href="/host/create">
                  <a className="text-orange-600 font-medium hover:underline">Create a party</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Join a What About Dinner Party</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Get the Code</h3>
              <p className="text-gray-600">Ask the host for their 6-digit party code</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Enter Your Details</h3>
              <p className="text-gray-600">Type your name and the party code</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Vote or Order</h3>
              <p className="text-gray-600">Cast your vote or select your meal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
