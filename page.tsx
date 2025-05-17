import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component for optimized images

// Define color variables consistent with the rest of the application
const primaryColor = "blue-500";
const primaryHoverColor = "blue-600";
const textColor = "gray-800";
const whiteColor = "white";

const HomePage: React.FC = () => {
  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center text-${textColor} p-4`}>
      <header className="absolute top-0 right-0 p-6">
        <nav className="flex space-x-4">
          <Link href="/signin" legacyBehavior>
            <a className={`px-4 py-2 text-sm font-medium text-${whiteColor} bg-${primaryColor} hover:bg-${primaryHoverColor} rounded-md shadow-sm`}>Sign In</a>
          </Link>
          <Link href="/profile" legacyBehavior> 
            <a className={`px-4 py-2 text-sm font-medium text-${textColor} bg-gray-200 hover:bg-gray-300 rounded-md shadow-sm`}>My Profile</a>
          </Link>
        </nav>
      </header>

      <main className="text-center space-y-8 mt-16 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to <span className={`text-${primaryColor}`}>WhatAboutDinner</span>!
        </h1>
        <p className="text-lg text-gray-600">
          Plan your meals, invite friends, and discover new recipes and restaurants together.
        </p>

        {/* Homepage Food Plate Image */}
        <div className="w-full max-w-2xl mx-auto my-8">
          {/* The image should span from the far left of the host button to the far right of the join button. 
              Since the buttons below will determine the width, we'll make this container responsive. 
              Using placeholder dimensions for now, actual image will be /homepage_food_platter_4.png */}
          <Image 
            src="/homepage_food_platter_4.png" // Path relative to the /public directory
            alt="A platter of diverse and delicious food"
            width={700} // Example width, adjust as needed for layout
            height={450} // Example height, adjust as needed
            className="rounded-lg shadow-xl object-cover"
            priority // Load image with high priority as it's LCP
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/redesigned_host_create_page" legacyBehavior>
            <a className={`px-8 py-3 text-lg font-semibold text-${whiteColor} bg-${primaryColor} hover:bg-${primaryHoverColor} rounded-lg shadow-md transition duration-150 ease-in-out`}>
              Host a Food Party
            </a>
          </Link>
          {/* TODO: Implement Join a Food Party functionality */}
          <button 
            type="button"
            disabled // Placeholder for Join Party functionality
            className={`px-8 py-3 text-lg font-semibold text-${textColor} bg-gray-300 rounded-lg shadow-md cursor-not-allowed`}
          >
            Join a Food Party
          </button>
        </div>
      </main>

      {/* Placeholder for Recommended Recipes/Restaurants - to be integrated later */}
      {/* <section className="w-full max-w-4xl mx-auto mt-12 p-4">
        <h2 className={`text-2xl font-semibold text-center text-${textColor} mb-6`}>Discover Something New</h2>
        {/* Recipe recommendations would go here */}
        {/* Restaurant recommendations would go here */}
      {/* </section> */}

      <footer className="absolute bottom-0 p-4 text-center w-full text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} WhatAboutDinner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

