import React from 'react';

interface Friend {
  id: string;
  name: string;
  username: string;
  profileImageUrl?: string;
  status: "friends" | "pending_them" | "pending_me";
}

interface FriendRequest {
  id: string;
  fromUser: { id: string; name: string; username: string; profileImageUrl?: string };
  createdAt: string;
}

interface FriendManagementProps {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onRemoveFriend: (friendId: string) => void;
  onSendFriendRequest: (username: string) => void; // Added for consistency, though not used in the provided snippet
}

const FriendManagement: React.FC<FriendManagementProps> = ({ 
  friends,
  friendRequests,
  onAcceptRequest,
  onDeclineRequest,
  onRemoveFriend,
  onSendFriendRequest
}) => {
  // Placeholder content - replace with actual friend management UI
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Friend Requests</h4>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map(request => (
            <li key={request.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <span>{request.fromUser.name} ({request.fromUser.username}) wants to be your friend.</span>
              <div>
                <button 
                  onClick={() => onAcceptRequest(request.id)} 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Accept
                </button>
                <button 
                  onClick={() => onDeclineRequest(request.id)} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new friend requests.</p>
      )}

      <h4 className="text-lg font-semibold mt-4 mb-2">Friends</h4>
      {friends.length > 0 ? (
        <ul>
          {friends.map(friend => (
            <li key={friend.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <span>{friend.name} ({friend.username})</span>
              <button 
                onClick={() => onRemoveFriend(friend.id)} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no friends yet.</p>
      )}
    </div>
  );
};

export default FriendManagement;

