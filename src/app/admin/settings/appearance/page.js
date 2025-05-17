import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/auth-context';
import AuthGuard from '../../../components/AuthGuard';

export default function AppearanceSettings() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [settings, setSettings] = useState({
    primaryColor: '#f97316', // Orange
    secondaryColor: '#22c55e', // Green
    fontFamily: 'Inter, sans-serif',
    heroImage: '/images/festive_dinner_table.jpg',
    logoImage: '/images/logo.png',
    backgroundStyle: 'image', // 'image' or 'color'
    backgroundColor: '#ffffff',
    backgroundImage: '/images/dining_table.jpg'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    setSaveMessage('');
    
    // In production, this would be an API call
    setTimeout(() => {
      // Save settings to localStorage for demo purposes
      localStorage.setItem('appearanceSettings', JSON.stringify(settings));
      
      setIsLoading(false);
      setSaveMessage('Settings saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 800);
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
          <h1 className="text-3xl font-bold">Appearance Settings</h1>
          <button
            onClick={() => router.push('/admin')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
        
        {saveMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {saveMessage}
          </div>
        )}
        
        {/* Color Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Color Scheme</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Primary Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="primaryColor"
                  value={settings.primaryColor}
                  onChange={handleInputChange}
                  className="h-10 w-10 rounded mr-2"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={settings.primaryColor}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Used for buttons, links, and highlights
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Secondary Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={handleInputChange}
                  className="h-10 w-10 rounded mr-2"
                />
                <input
                  type="text"
                  name="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Used for accents and secondary elements
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Font Family
            </label>
            <select
              name="fontFamily"
              value={settings.fontFamily}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="Inter, sans-serif">Inter (Modern)</option>
              <option value="Merriweather, serif">Merriweather (Elegant)</option>
              <option value="Roboto, sans-serif">Roboto (Clean)</option>
              <option value="Poppins, sans-serif">Poppins (Friendly)</option>
              <option value="Playfair Display, serif">Playfair Display (Classic)</option>
            </select>
          </div>
        </div>
        
        {/* Background Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Background Settings</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Background Style
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="backgroundStyle"
                  value="image"
                  checked={settings.backgroundStyle === 'image'}
                  onChange={handleRadioChange}
                  className="form-radio h-4 w-4 text-orange-500"
                />
                <span className="ml-2">Background Image</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="backgroundStyle"
                  value="color"
                  checked={settings.backgroundStyle === 'color'}
                  onChange={handleRadioChange}
                  className="form-radio h-4 w-4 text-orange-500"
                />
                <span className="ml-2">Background Color</span>
              </label>
            </div>
          </div>
          
          {settings.backgroundStyle === 'image' ? (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Background Image URL
              </label>
              <input
                type="text"
                name="backgroundImage"
                value={settings.backgroundImage}
                onChange={handleInputChange}
                className="input-field"
              />
              <div className="mt-2 p-2 border rounded">
                <p className="text-sm font-medium mb-1">Current Background:</p>
                <div 
                  className="h-32 bg-cover bg-center rounded" 
                  style={{ backgroundImage: `url(${settings.backgroundImage})` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Background Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="backgroundColor"
                  value={settings.backgroundColor}
                  onChange={handleInputChange}
                  className="h-10 w-10 rounded mr-2"
                />
                <input
                  type="text"
                  name="backgroundColor"
                  value={settings.backgroundColor}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Hero Image Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Hero Image URL
            </label>
            <input
              type="text"
              name="heroImage"
              value={settings.heroImage}
              onChange={handleInputChange}
              className="input-field"
            />
            <div className="mt-2 p-2 border rounded">
              <p className="text-sm font-medium mb-1">Current Hero Image:</p>
              <div 
                className="h-32 bg-cover bg-center rounded" 
                style={{ backgroundImage: `url(${settings.heroImage})` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Logo Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Logo</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Logo Image URL
            </label>
            <input
              type="text"
              name="logoImage"
              value={settings.logoImage}
              onChange={handleInputChange}
              className="input-field"
            />
            <div className="mt-2 p-2 border rounded flex items-center justify-center">
              <p className="text-sm font-medium mr-2">Current Logo:</p>
              <img 
                src={settings.logoImage} 
                alt="Logo" 
                className="h-12"
              />
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Appearance Settings'}
          </button>
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
