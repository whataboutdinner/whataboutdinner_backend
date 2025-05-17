import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { username, email, password, profilePicture, bio, dietaryPreferences, themeSettings } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    // Check if user already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "User with this email already exists." });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(409).json({ message: "User with this username already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || "",
      bio: bio || "",
      dietaryPreferences: dietaryPreferences || [],
      themeSettings: themeSettings || {},
    });

    await newUser.save();

    // Generate JWT (optional, depending on your auth flow with NextAuth)
    // If you are using NextAuth with credentials provider, NextAuth handles session creation.
    // If you want to return a token directly for other purposes:
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is in your .env.local
      { expiresIn: "1h" } // Token expiration time
    );

    res.status(201).json({
      message: "User registered successfully!",
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: token, // Send token if generated
    });

  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) { // Mongoose duplicate key error
        return res.status(409).json({ message: "Username or email already exists." });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

