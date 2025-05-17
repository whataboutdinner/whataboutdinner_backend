import React from 'react';
import Link from 'next/link';

// Define color variables for easier management (Tailwind arbitrary values)
const primaryColor = 'blue-500'; // Example: Using Tailwind's blue-500 for light blue
const primaryHoverColor = 'blue-600';
const accentColor = 'gray-200'; // Example: Using Tailwind's gray-200 for light gray
const textColor = 'gray-800';
const subtleTextColor = 'gray-600';
const whiteColor = 'white';
const focusRingColor = 'blue-400';

export default function HostCreatePage() {
  // TODO: Add state for party creation status and party code/link
  // const [partyCreated, setPartyCreated] = React.useState(false);
  // const [partyCode, setPartyCode] = React.useState(null);

  // const handleCreateParty = async (event) => {
  //   event.preventDefault();
  //   // TODO: Implement party creation logic
  //   // On success: setPartyCreated(true); setPartyCode('GENERATED_CODE');
  // };

  // const handleInviteGuests = () => {
  //   // TODO: Implement copy link/code functionality or show sharing modal
  //   if (partyCode) {
  //     navigator.clipboard.writeText(partyCode);
  //     alert('Party code copied to clipboard!');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Light background */} 
      <div className="container mx-auto py-12 px-4">
        {/* Main Card Container */}
        <div className={`max-w-2xl mx-auto bg-${whiteColor} rounded-lg shadow-xl overflow-hidden border border-${accentColor}`}> 
          {/* Card Header */}
          <div className={`bg-${primaryColor} text-${whiteColor} py-6 px-8`}>
            <h1 className="text-3xl font-bold">Host a Food Party</h1>
            <p className="mt-2 opacity-90">Create a new party and invite friends to join</p>
          </div>
          
          {/* Card Body / Form */}
          <div className="p-8">
            {/* TODO: Change form onSubmit to handleCreateParty if implementing conditional UI */} 
            <form>
              {/* Party Name Input */}
              <div className="mb-6">
                <label htmlFor="partyName" className={`block text-${textColor} font-medium mb-2`}>Party Name</label>
                <input 
                  type="text" 
                  id="partyName" 
                  className={`w-full px-4 py-3 border border-${accentColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-${focusRingColor}`}
                  placeholder="Enter a name for your party"
                />
              </div>
              
              {/* Party Type Selection Cards */}
              <div className="mb-6">
                <label className={`block text-${textColor} font-medium mb-2`}>Party Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recipe Voting Card */}
                  <div className={`border border-${accentColor} rounded-lg p-4 cursor-pointer hover:border-${primaryColor} hover:shadow-md transition duration-300 bg-white`}>
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="recipeVoting" 
                        name="partyType" 
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" // Styled radio button
                        defaultChecked
                      />
                      <div>
                        <label htmlFor="recipeVoting" className="font-medium cursor-pointer">Recipe Voting</label>
                        <p className={`text-sm text-${subtleTextColor} mt-1`}>
                          Add recipe options and let everyone vote on what to eat
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Restaurant Order Card */}
                  <div className={`border border-${accentColor} rounded-lg p-4 cursor-pointer hover:border-${primaryColor} hover:shadow-md transition duration-300 bg-white`}>
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="restaurantOrder" 
                        name="partyType" 
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" // Styled radio button
                      />
                      <div>
                        <label htmlFor="restaurantOrder" className="font-medium cursor-pointer">Restaurant Order</label>
                        <p className={`text-sm text-${subtleTextColor} mt-1`}>
                          Select a restaurant and let everyone order their own meal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recipe Options Section (Conditional Logic Needed Here) */}
              <div className="mb-8">
                <label className={`block text-${textColor} font-medium mb-2`}>Recipe Options</label>
                <p className={`text-sm text-${subtleTextColor} mb-4`}>
                  Add at least 2 recipe options for your guests to vote on
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className={`flex-1 px-4 py-2 border border-${accentColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-${focusRingColor}`}
                      placeholder="Recipe option 1"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className={`flex-1 px-4 py-2 border border-${accentColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-${focusRingColor}`}
                      placeholder="Recipe option 2"
                    />
                  </div>
                </div>
                
                {/* Add Option Button */}
                <button 
                  type="button" 
                  className={`mt-3 text-${primaryColor} font-medium hover:text-${primaryHoverColor} flex items-center transition duration-300`}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Another Option
                </button>
              </div>

              {/* TODO: The section below (Invite Guests button and party code display) would ideally be shown *after* party creation. 
                   For now, the button is added visually as requested. Full functionality requires state management. */}
              
              {/* Invite to Dinner Button - Placed as per user request */}
              <div className="my-8 text-center"> {/* Increased margin for better separation */}
                <button
                  type="button" // This button should not submit the form directly
                  // onClick={handleInviteGuests} // TODO: Link to actual invite logic after party creation
                  className={`bg-${primaryColor} text-${whiteColor} py-3 px-8 rounded-lg font-medium hover:bg-${primaryHoverColor} transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor}`}
                >
                  Invite Guests
                </button>
                {/* Placeholder for displaying party code/link after creation */}
                {/* {
                  partyCreated && partyCode && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                      <p className="text-sm text-gray-700 font-medium">Your party is created! Share this code/link:</p>
                      <p className="text-xl font-bold text-blue-600 my-2 break-all">{partyCode}</p>
                      <button 
                        type="button" 
                        onClick={handleInviteGuests} // Assuming this copies the code/link
                        className="text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
                      >
                        Copy Invite Link
                      </button>
                    </div>
                  )
                } */}
              </div>
              
              {/* Create Party Button */}
              <button 
                type="submit" 
                // onClick={handleCreateParty} // TODO: If using conditional UI, this onClick would trigger party creation logic
                className={`w-full bg-green-500 text-${whiteColor} py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
                // Note: Changed color to green to differentiate from the 'Invite Guests' button, assuming 'Create Party' is the primary action to initiate.
                // If 'Invite Guests' is the primary action that also creates, then this button might be removed or its role re-evaluated.
              >
                Create Party
              </button>
            </form>
            
            {/* Link to Join Party */}
            <div className="mt-6 text-center">
              <p className={`text-${subtleTextColor}`}>
                Want to join an existing party instead?{' '}
                <Link href="/join" className={`text-${primaryColor} font-medium hover:text-${primaryHoverColor} transition duration-300`}>
                  Join a party
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* How It Works Section (Updated Colors) */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <h2 className={`text-2xl font-bold text-${textColor} mb-4`}>How What About Dinner Works</h2>
          <p className={`text-${subtleTextColor} mb-8`}>
            Create a party, invite friends, and make dinner decisions together in three simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`bg-${whiteColor} p-6 rounded-lg shadow-md border border-${accentColor}`}> 
              <div className={`w-12 h-12 bg-blue-100 text-${primaryColor} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>1</div>
              <h3 className="font-bold mb-2">Create a Party</h3>
              <p className={`text-${subtleTextColor}`}>Set up your food party and get a unique 6-digit code</p>
            </div>
            
            <div className={`bg-${whiteColor} p-6 rounded-lg shadow-md border border-${accentColor}`}> 
              <div className={`w-12 h-12 bg-blue-100 text-${primaryColor} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>2</div>
              <h3 className="font-bold mb-2">Invite Friends</h3>
              <p className={`text-${subtleTextColor}`}>Share your party code with friends and family</p>
            </div>
            
            <div className={`bg-${whiteColor} p-6 rounded-lg shadow-md border border-${accentColor}`}> 
              <div className={`w-12 h-12 bg-blue-100 text-${primaryColor} rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>3</div>
              <h3 className="font-bold mb-2">Decide Together</h3>
              <p className={`text-${subtleTextColor}`}>Everyone votes or orders, and dinner is decided!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

