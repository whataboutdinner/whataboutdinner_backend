import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-orange-600">What About Dinner</a>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/host/create">
            <a className="text-gray-700 hover:text-orange-600 transition duration-300">Host a Party</a>
          </Link>
          <Link href="/join">
            <a className="text-gray-700 hover:text-orange-600 transition duration-300">Join a Party</a>
          </Link>
          <Link href="/login">
            <a className="text-gray-700 hover:text-orange-600 transition duration-300">Login</a>
          </Link>
          <Link href="/register">
            <a className="text-gray-700 hover:text-orange-600 transition duration-300">Register</a>
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-gray-700 hover:text-orange-600 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
