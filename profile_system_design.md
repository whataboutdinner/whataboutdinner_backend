# Profile System - Design Document

This document outlines the design for the user profile system in the WhatAboutDinner application, covering sign-in/authentication, user verification, and customizable profiles.

**Overall Goal:** Provide a secure and personalized experience for users, allowing them to manage their accounts and customize their profiles.

## Phase 4: Profile System Implementation (from todo.md)

### 4.1 Requirement Finalization (Profiles)

1.  **User Sign-in/Authentication Flow:**
    *   **Registration:**
        *   Fields: Email, Password (hashed and salted), Username (unique).
        *   Process: User provides details, backend validates (e.g., email format, password strength, username uniqueness), creates user record in MongoDB, sends verification email.
    *   **Login:**
        *   Fields: Email/Username, Password.
        *   Process: User provides credentials, backend validates against stored hashed password. Upon success, generate a JSON Web Token (JWT) for session management.
    *   **Session Management:**
        *   JWT stored securely on the client (e.g., HttpOnly cookie or secure local storage).
        *   JWT sent with subsequent requests to authenticated endpoints.
        *   Backend middleware to verify JWT on protected routes.
        *   Logout: Invalidate JWT on client-side (and optionally server-side via a blacklist if immediate revocation is needed).
    *   **Password Reset:**
        *   Flow: User requests password reset via email -> System sends a unique, time-limited reset link to their registered email -> User clicks link, enters new password -> System updates password.

2.  **User Verification:**
    *   **Email Verification:** Mandatory upon registration. A unique token is sent to the user_s email. User clicks a link with the token to verify their email address. Unverified accounts may have limited functionality.
    *   **Two-Factor Authentication (2FA) (Optional - Future Enhancement):** Consider for enhanced security, allowing users to enable 2FA via authenticator app or SMS.

3.  **Customizable Profiles:**
    *   **Core Profile Data (MongoDB User Schema):**
        *   `userId` (Primary Key, e.g., MongoDB ObjectId)
        *   `username` (String, unique, indexed)
        *   `email` (String, unique, indexed, verified: Boolean)
        *   `passwordHash` (String)
        *   `createdAt` (Date)
        *   `updatedAt` (Date)
        *   `profilePictureUrl` (String, URL to image - consider storage like AWS S3)
        *   `bio` (String, max length e.g., 250 chars)
        *   `dietaryPreferences`: (Object/Array, e.g., `likedCuisines`, `dislikedCuisines`, `likedIngredients`, `dislikedIngredients`, `dietaryRestrictions` - can be leveraged by recommendation engine)
        *   `themeSettings`: (Object, e.g., `primaryColor`, `accentColor` - if app allows UI theme customization per user, similar to X/Twitter)
        *   `friends`: (Array of `userId` references)
        *   `friendRequestsSent`: (Array of `userId` references)
        *   `friendRequestsReceived`: (Array of `userId` references)

### 4.2 Design UI/UX (Profiles)

1.  **Registration Page:**
    *   Form fields: Username, Email, Password, Confirm Password.
    *   Link to Login Page.
    *   Clear error messages for validation failures.
2.  **Login Page:**
    *   Form fields: Email/Username, Password.
    *   "Forgot Password?" link.
    *   Link to Registration Page.
3.  **Profile View Page (`/profile/[username]` or `/profile/me`):**
    *   Display: Profile Picture, Username, Bio.
    *   Sections for: Friends, Shared Meal Pictures, Shared Recipes (links to social features).
    *   If viewing own profile, an "Edit Profile" button.
4.  **Profile Edit Page (`/profile/edit`):**
    *   Form fields for all customizable profile data: Profile Picture (upload), Username (display only or limited changes), Bio, Dietary Preferences (structured input), Theme Settings (color pickers/predefined themes).
    *   Save/Cancel buttons.
    *   Account Management: Change Password, (Optional) Enable/Disable 2FA, Delete Account (with confirmation).
5.  **Email Verification Flow:**
    *   Page displayed after clicking verification link: Confirmation message.
6.  **Password Reset Flow:**
    *   Request Page: Email input.
    *   Reset Page (from email link): New Password, Confirm New Password inputs.

### Next Steps after Design:

1.  **Refine MongoDB Schemas:** Finalize the `users` collection schema based on the above.
2.  **Develop Backend Logic (Phase 4.4):**
    *   Implement API endpoints for registration, login, logout, password reset, email verification.
    *   Implement JWT generation and validation middleware.
    *   Create secure CRUD API endpoints for user profile data (get profile, update profile).
    *   Integrate with an email service (e.g., SendGrid, AWS SES) for sending verification and password reset emails.
3.  **Develop Frontend Logic (Phase 4.3):**
    *   Create React components for all UI pages/forms designed.
    *   Implement API calls to backend for all profile-related actions.
    *   Manage client-side session (storing/clearing JWT, redirecting based on auth state).
    *   Handle form validation and display error/success messages.
4.  **Integrate and Test (Phase 4.5):**
    *   Thoroughly test all user flows: registration, email verification, login, profile view/edit, password reset, logout.
    *   Test security aspects: password hashing, JWT security, protection of authenticated routes.

