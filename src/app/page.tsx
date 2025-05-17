import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
          backgroundImage: "url('/images/festive_dinner_table.jpg')",
          filter: "brightness(0.5)"
        }}></div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What About Dinner?
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
            The easiest way to decide what's for dinner with friends and family. Vote on recipes or order from restaurants together!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/host/create">
              <a className="btn-primary text-lg py-4 px-8">
                Host a Food Party
              </a>
            </Link>
            <Link href="/join">
              <a className="btn-secondary text-lg py-4 px-8">
                Join a Food Party
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Recipe Voting Feature */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="h-64 bg-cover bg-center rounded-lg mb-6" style={{ 
                backgroundImage: "url('/images/food_preparation.jpg')" 
              }}></div>
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Recipe Voting</h3>
              <p className="text-gray-700 mb-6">
                Can't decide what to cook? Create a party, add recipe options, and invite friends to vote. 
                The winning recipe is automatically shared with everyone, including ingredients and preparation instructions.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Host adds recipe options
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Friends vote on their favorites
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Winning recipe shared with everyone
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Complete ingredients and instructions provided
                </li>
              </ul>
            </div>
            
            {/* Restaurant Ordering Feature */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="h-64 bg-cover bg-center rounded-lg mb-6" style={{ 
                backgroundImage: "url('/images/dining_table.jpg')" 
              }}></div>
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Restaurant Ordering</h3>
              <p className="text-gray-700 mb-6">
                Prefer takeout? The host selects a restaurant, and everyone can add their own meal choices to a group order.
                Each person can pay for their portion, making group ordering hassle-free.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Host selects restaurant
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Everyone adds their own meal choices
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Individual payment options
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Consolidated order for the host
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Simple 3-Step Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Create or Join</h3>
              <p className="text-gray-700">
                Start a new food party as a host or join an existing one with a 6-digit code.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Vote or Order</h3>
              <p className="text-gray-700">
                Cast your vote for recipes or select your meal from a restaurant menu.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Enjoy Together</h3>
              <p className="text-gray-700">
                Get the winning recipe or track your group order until it's time to eat!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to solve the dinner dilemma?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            No more "I don't know, what do you want?" conversations. Start making dinner decisions easy and fun!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/host/create">
              <a className="bg-white text-orange-600 hover:bg-gray-100 text-lg py-4 px-8 rounded-lg font-bold transition duration-300">
                Host a Food Party
              </a>
            </Link>
            <Link href="/join">
              <a className="bg-transparent border-2 border-white hover:bg-orange-700 text-white text-lg py-4 px-8 rounded-lg font-bold transition duration-300">
                Join a Food Party
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">What About Dinner</h2>
              <p className="text-gray-400">Making meal decisions simple.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link href="/about">
                <a className="text-gray-300 hover:text-white">About</a>
              </Link>
              <Link href="/privacy">
                <a className="text-gray-300 hover:text-white">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-300 hover:text-white">Terms of Service</a>
              </Link>
              <Link href="/contact">
                <a className="text-gray-300 hover:text-white">Contact</a>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} What About Dinner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
