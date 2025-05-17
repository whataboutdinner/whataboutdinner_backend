"use client";
import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">What About Dinner - Admin</h1>
          <Link href="/">
            <a className="text-gray-700 hover:text-orange-600">Return to Site</a>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recipes Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Recipe Management</h3>
            <p className="text-gray-700 mb-4">
              Add, edit, and manage recipes available for voting parties.
            </p>
            <Link href="/admin/recipes">
              <a className="btn-primary block text-center">Manage Recipes</a>
            </Link>
          </div>
          
          {/* Restaurants Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Restaurant Management</h3>
            <p className="text-gray-700 mb-4">
              Manage restaurant options and menu items for ordering parties.
            </p>
            <Link href="/admin/restaurants">
              <a className="btn-primary block text-center">Manage Restaurants</a>
            </Link>
          </div>
          
          {/* User Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">User Management</h3>
            <p className="text-gray-700 mb-4">
              Manage user accounts, roles, and permissions.
            </p>
            <Link href="/admin/users">
              <a className="btn-primary block text-center">Manage Users</a>
            </Link>
          </div>
          
          {/* Active Parties */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Active Parties</h3>
            <p className="text-gray-700 mb-4">
              Monitor currently active food parties and their status.
            </p>
            <Link href="/admin/parties/active">
              <a className="btn-primary block text-center">View Active Parties</a>
            </Link>
          </div>
          
          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Appearance Settings</h3>
            <p className="text-gray-700 mb-4">
              Customize the look and feel of your What About Dinner app.
            </p>
            <Link href="/admin/settings/appearance">
              <a className="btn-primary block text-center">Customize Appearance</a>
            </Link>
          </div>
          
          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Analytics</h3>
            <p className="text-gray-700 mb-4">
              View usage statistics and user engagement metrics.
            </p>
            <Link href="/admin/analytics">
              <a className="btn-primary block text-center">View Analytics</a>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 px-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} What About Dinner - Admin Portal</p>
        </div>
      </footer>
    </div>
  );
}
