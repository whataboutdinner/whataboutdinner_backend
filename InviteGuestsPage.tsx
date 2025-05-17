import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define color variables (assuming these are consistent with updated_globals.css)
const primaryColor = 'blue-500'; // Placeholder, use actual Tailwind classes or CSS variables
const primaryHoverColor = 'blue-600';
const accentColor = 'gray-200';
const textColor = 'gray-800';
const subtleTextColor = 'gray-600';
const whiteColor = 'white';
const focusRingColor = 'blue-400';

// Mock friends data - replace with actual data fetching
const mockFriends = [
  { id: '1', name: 'Alice Wonderland', avatar: '/path/to/alice-avatar.png' },
  { id: '2', name: 'Bob The Builder', avatar: '/path/to/bob-avatar.png' },
  { id: '3', name: 'Charlie Brown', avatar: '/path/to/charlie-avatar.png' },
  { id: '4', name: 'Diana Prince', avatar: '/path/to/diana-avatar.png' },
];

export default function InviteGuestsPage() {
  const [partyLink, setPartyLink] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  // Simulate link generation on component mount
  useEffect(() => {
    // TODO: Replace with actual backend call to generate a unique party link
    const generatedLink = `https://whataboutdinner.food/party/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setPartyLink(generatedLink);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(partyLink)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000); // Reset message after 2 seconds
      })
      .catch(err => console.error('Failed to copy link: ', err));
  };

  const handleFriendSelection = (friendId: string) => {
    setSelectedFriends(prevSelected =>
      prevSelected.includes(friendId)
        ? prevSelected.filter(id => id !== friendId)
        : [...prevSelected, friendId]
    );
  };

  const handleSendInvites = () => {
    // TODO: Implement backend logic to send invites to selectedFriends
    // This should include the partyLink and options for app download/text reply
    console.log('Sending invites to:', selectedFriends, 'with link:', partyLink);
    alert(`Invites sent to ${selectedFriends.length} friends! (Placeholder)`);
  };

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className={`bg-${whiteColor} rounded-lg shadow-xl overflow-hidden border border-${accentColor}`}>
          <div className={`bg-${primaryColor} text-${whiteColor} py-6 px-8`}>
            <h1 className="text-3xl font-bold">Invite Guests to Your Party</h1>
          </div>

          <div className="p-8 space-y-8">
            {/* Unique Party Link Section */}
            <section>
              <h2 className={`text-xl font-semibold text-${textColor} mb-3`}>Share this link with your guests:</h2>
              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
                <input 
                  type="text" 
                  readOnly 
                  value={partyLink} 
                  className={`flex-1 p-2 border border-gray-300 rounded-md bg-white text-${textColor} focus:outline-none`}
                />
                <button
                  onClick={handleCopyLink}
                  className={`bg-green-500 text-${whiteColor} py-2 px-4 rounded-md font-medium hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
                >
                  {linkCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </section>

            {/* Invite Friends from List Section */}
            <section>
              <h2 className={`text-xl font-semibold text-${textColor} mb-3`}>Or Invite Your Friends Directly</h2>
              {mockFriends.length > 0 ? (
                <>
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-2 mb-4 border border-${accentColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-${focusRingColor}`}
                  />
                  <div className="max-h-60 overflow-y-auto space-y-3 border border-gray-200 rounded-md p-3">
                    {filteredFriends.map(friend => (
                      <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
                        <div className="flex items-center">
                          {/* Placeholder for avatar */}
                          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                          <span className={`text-${textColor}`}>{friend.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedFriends.includes(friend.id)}
                          onChange={() => handleFriendSelection(friend.id)}
                          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                    ))}
                    {filteredFriends.length === 0 && (
                        <p className={`text-${subtleTextColor} text-center py-4`}>No friends match your search.</p>
                    )}
                  </div>
                  {selectedFriends.length > 0 && (
                    <button
                      onClick={handleSendInvites}
                      className={`mt-6 w-full bg-${primaryColor} text-${whiteColor} py-3 px-4 rounded-lg font-medium hover:bg-${primaryHoverColor} transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor}`}
                    >
                      Send Invites to {selectedFriends.length} Friend(s)
                    </button>
                  )}
                </>
              ) : (
                <p className={`text-${subtleTextColor} bg-gray-100 p-4 rounded-md`}>
                  You haven't added any friends yet. Share the link above, or add friends to your profile to invite them directly next time!
                  {/* Optionally, add a Link to profile/friend management here */}
                </p>
              )}
            </section>

            {/* Sharing Options / Instructions Section */}
            <section>
              <h2 className={`text-xl font-semibold text-${textColor} mb-3`}>How guests can join:</h2>
              <ul className={`list-disc list-inside space-y-1 text-${subtleTextColor}`}>
                <li><strong>Using the App:</strong> Guests with the WhatAboutDinner app can click the link or enter a party code (if applicable) to join directly.</li>
                <li><strong>Via Text/Web:</strong> Invitations can include options for guests to reply via text or join through a web link (if they don't have the app).</li>
                <li><strong>App Download Prompt:</strong> Invitations can include a link to download the WhatAboutDinner app.</li>
              </ul>
            </section>

            {/* Page Actions / Navigation */}
            <section className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link href="/host-create" legacyBehavior> 
                <a className={`bg-gray-500 text-${whiteColor} py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400`}>
                  Done / Back to Party Setup
                </a>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

