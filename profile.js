// File: /home/ubuntu/what_about_dinner_app/pages/api/user/profile.js
// This file outlines the backend logic for managing user profiles.

// import { MongoClient, ObjectId } from 'mongodb';
// import { getSession } from 'next-auth/react'; // To secure the endpoint
// import bcrypt from 'bcryptjs'; // For password updates

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// async function connectDb() {
//   await client.connect();
//   return client.db("whataboutdinner");
// }

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // if (!session || !session.user || !session.user.id) {
  //   return res.status(401).json({ message: 'Not authenticated' });
  // }
  // const userId = session.user.id;

  // const db = await connectDb();
  // const usersCollection = db.collection("users");

  if (req.method === 'GET') {
    // --- Fetch User Profile Logic ---
    try {
      // const userProfile = await usersCollection.findOne(
      //   { _id: new ObjectId(userId) },
      //   { projection: { passwordHash: 0, emailVerifiedToken: 0, resetPasswordToken: 0 } } // Exclude sensitive fields
      // );

      // if (!userProfile) {
      //   return res.status(404).json({ message: 'User profile not found.' });
      // }

      // Mock profile data for now
      const mockUserProfile = {
        userId: "mockUserId123", // Typically session.user.id
        username: "TestUser",
        email: "test@example.com",
        profilePictureUrl: "/path/to/default-avatar.png",
        bio: "This is a mock bio for testing purposes.",
        dietaryPreferences: {
          likedCuisines: ["Italian", "Mexican"],
          dislikedCuisines: [],
          likedIngredients: ["Cheese", "Avocado"],
          dislikedIngredients: ["Olives"],
          dietaryRestrictions: ["Vegetarian"]
        },
        themeSettings: {
          primaryColor: "blue-500",
          accentColor: "green-500"
        },
        createdAt: new Date().toISOString(),
      };

      return res.status(200).json(mockUserProfile);

    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    // --- Update User Profile Logic ---
    try {
      const { username, bio, profilePictureUrl, dietaryPreferences, themeSettings, currentPassword, newPassword } = req.body;
      
      // const updateData = {};
      // if (username) updateData.username = username; // Add validation for uniqueness if changed
      // if (bio) updateData.bio = bio;
      // if (profilePictureUrl) updateData.profilePictureUrl = profilePictureUrl;
      // if (dietaryPreferences) updateData.dietaryPreferences = dietaryPreferences;
      // if (themeSettings) updateData.themeSettings = themeSettings;
      // updateData.updatedAt = new Date();

      // Password change logic (if currentPassword and newPassword are provided)
      // if (currentPassword && newPassword) {
      //   const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
      //   if (!user) return res.status(404).json({ message: 'User not found.' });

      //   const passwordIsValid = await bcrypt.compare(currentPassword, user.passwordHash);
      //   if (!passwordIsValid) {
      //     return res.status(403).json({ message: 'Incorrect current password.' });
      //   }
      //   updateData.passwordHash = await bcrypt.hash(newPassword, 12);
      // }

      // if (Object.keys(updateData).length === 1 && updateData.updatedAt) { // Only updatedAt means no actual data changed
      //    return res.status(400).json({ message: "No profile data provided to update." });
      // }

      // const result = await usersCollection.updateOne(
      //   { _id: new ObjectId(userId) },
      //   { $set: updateData }
      // );

      // if (result.matchedCount === 0) {
      //   return res.status(404).json({ message: 'User profile not found for update.' });
      // }

      console.log("Mock profile update for user:", "mockUserId123", "with data:", req.body);
      return res.status(200).json({ message: 'Profile updated successfully (mock response).' });

    } catch (error) {
      console.error('Failed to update user profile:', error);
      // Handle specific errors like duplicate username if implementing username change
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// TODO:
// - Implement actual MongoDB queries for fetching and updating user profiles.
// - Add robust validation for all input fields (e.g., username uniqueness, email format, password strength).
// - Secure the endpoint using session authentication (e.g., NextAuth.js getSession).
// - Handle file uploads for profile pictures (e.g., to AWS S3 or similar service) and store the URL.
// - If username can be changed, ensure uniqueness checks are performed.

