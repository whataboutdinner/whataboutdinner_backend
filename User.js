import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters."],
    maxlength: [30, "Username cannot be more than 30 characters."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address."],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [6, "Password must be at least 6 characters."],
  },
  profilePicture: {
    type: String,
    default: "", // Default to an empty string or a path to a default avatar
  },
  bio: {
    type: String,
    maxlength: [500, "Bio cannot be more than 500 characters."],
    default: "",
  },
  dietaryPreferences: {
    // Example: could be an array of strings or a more complex object
    type: [String],
    default: [],
  },
  themeSettings: {
    // Example: could store user's preferred theme (e.g., 'light', 'dark')
    type: String,
    default: "light",
  },
  // Timestamps for when the user was created or updated
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // You might add other fields like emailVerified, roles, etc.
});

// Update the updatedAt field on save
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Avoid recompiling the model if it already exists
export default mongoose.models.User || mongoose.model("User", UserSchema);

