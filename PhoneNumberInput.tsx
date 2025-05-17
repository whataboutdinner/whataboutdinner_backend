import React, { useState } from 'react';

// Define color variables consistent with the rest of the application
const primaryColor = 'blue-500';
const textColor = 'gray-800';
const focusRingColor = 'blue-400';
const accentColor = 'gray-200'; // For borders
const whiteColor = 'white';

interface PhoneNumberInputProps {
  onPhoneNumberSubmit: (phoneNumber: string) => void;
  isLoading: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onPhoneNumberSubmit, isLoading }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation (can be expanded)
    if (phoneNumber.trim() === '') {
      alert('Please enter a phone number.');
      return;
    }
    onPhoneNumberSubmit(phoneNumber);
  };

  return (
    <div className={`bg-${whiteColor} p-6 rounded-lg shadow-md border border-${accentColor} max-w-md mx-auto mt-8`}>
      <h3 className={`text-xl font-semibold text-${textColor} mb-4`}>Verify Your Phone Number</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone-number" className={`block text-sm font-medium text-${textColor}`}>
            Phone Number
          </label>
          <div className="mt-1">
            <input
              id="phone-number"
              name="phone-number"
              type="tel" // Use tel type for phone numbers
              autoComplete="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`appearance-none block w-full px-3 py-2 border border-${accentColor} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-${focusRingColor} focus:border-${focusRingColor} sm:text-sm`}
              placeholder="+1 (555) 123-4567"
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-${whiteColor} bg-${primaryColor} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor} disabled:opacity-50`}
          >
            {isLoading ? 'Sending Code...' : 'Send Verification Code'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumberInput;

