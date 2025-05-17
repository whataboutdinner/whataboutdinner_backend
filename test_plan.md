# WhatAboutDinner App - Comprehensive Test Plan

This document outlines the testing strategy for the new features and updates implemented in the WhatAboutDinner application. It is based on Phase 7 of the `todo.md`.

**Overall Goal:** Ensure all implemented features (Color Scheme, Invite to Dinner Button, Profile System, Social Features, Recommendation Algorithms) are functioning correctly, integrate well, and meet the user_s requirements.

## Phase 7: Comprehensive Testing (from todo.md)

### 7.1 Unit Testing (Conceptual)

*   **Objective:** Verify individual components and functions work as expected in isolation.
*   **Scope (Examples - actual tests would be more granular):**
    *   **Color Scheme:**
        *   Test: CSS variables for blue theme and yellow error messages are correctly defined and applied.
        *   Verification: Inspect computed styles in browser developer tools (simulated).
    *   **Invite to Dinner Button (Frontend - `InviteGuestsPage.tsx`):**
        *   Test: Button renders with correct text ("Invite Guests") and light blue color.
        *   Test: Clicking the button triggers navigation/modal display logic.
        *   Test: Link generation (mocked) and copy-to-clipboard functionality.
        *   Test: Friend selection UI elements render and handle mock interactions.
    *   **Invite to Dinner Button (Backend - `pages/api/party.js`):**
        *   Test: API endpoint for party code generation (mocked) returns a unique-like code.
        *   Test: API endpoint for associating invites with users/parties (mocked).
    *   **Profile System (Frontend Components - Sign-in, Registration, Profile View/Edit):**
        *   Test: Forms render correctly with all fields.
        *   Test: Client-side validation for input fields (e.g., email format, password match).
        *   Test: State updates correctly on input changes.
    *   **Profile System (Backend - `pages/api/auth/[...nextauth].js`, `pages/api/user/profile.js`):**
        *   Test: Registration API (mocked) handles new user creation logic.
        *   Test: Login API (mocked) validates credentials and returns JWT-like structure.
        *   Test: Profile GET API (mocked) returns mock profile data.
        *   Test: Profile PUT API (mocked) handles profile update logic.
    *   **Social Features (Frontend Components - Friending, Meal/Recipe Sharing):**
        *   Test: UI elements for sending/accepting friend requests, uploading pictures, creating recipes render correctly.
        *   Test: Forms for social interactions handle input and state changes.
    *   **Social Features (Backend - `pages/api/social/friends.js`, `pages/api/social/posts.js`):**
        *   Test: Friending API endpoints (mocked) handle request, accept, decline, list, remove actions.
        *   Test: Meal picture/recipe posting API (mocked) handles creation logic.
        *   Test: API endpoints for fetching social content (mocked) return appropriate data structures.
    *   **Recommendation Algorithms (Backend - `pages/api/suggestions.js`):**
        *   Test: API endpoint (mocked) returns recipe suggestions based on mock criteria.
        *   Test: API endpoint (mocked) returns restaurant suggestions based on mock criteria.
*   **Method:** Conceptual review of code, focusing on logic for individual functions and components. Since full execution environment isn_t available, this will be a dry run of logic paths.

### 7.2 Integration Testing (Conceptual)

*   **Objective:** Verify that different parts of the application work together correctly.
*   **Scope (Examples):**
    *   **Invite Button & Profile System:**
        *   Test: When inviting friends, the friend list is populated from the Profile System_s friend data.
        *   Test: Generated invite links correctly associate with the host_s user ID.
    *   **Profile System & Recommendation Algorithms:**
        *   Test: Dietary preferences from a user_s profile are (conceptually) used by the recommendation algorithms to tailor suggestions.
    *   **Profile System & Social Features:**
        *   Test: Shared meal pictures and recipes are correctly associated with the posting user_s profile and displayed on their profile page.
        *   Test: Friending actions correctly update friend lists visible on profiles.
    *   **Frontend & Backend API Integration:**
        *   Test: Frontend components make correct API calls to backend endpoints for all features (Invite, Profile, Social, Recommendations).
        *   Test: Frontend correctly processes responses (success/error) from backend APIs and updates UI accordingly.
*   **Method:** Trace data flow between components and modules. Verify that data passed between frontend and backend (and between backend services) is consistent and handled as expected. This will be a conceptual walkthrough.

### 7.3 End-to-End User Acceptance Testing (Simulated)

*   **Objective:** Validate the complete user experience for all implemented features from a user_s perspective.
*   **Scenarios (Examples):**
    1.  **New User Registration & First Party Creation:**
        *   User registers for a new account (including mock email verification step).
        *   User logs in.
        *   User customizes their profile (bio, dietary preferences).
        *   User creates a new party, sees recipe/restaurant suggestions.
        *   User uses the "Invite Guests" button, generates a link, and (conceptually) invites friends.
        *   Verify color scheme is consistent throughout this flow.
    2.  **Existing User - Social Interaction:**
        *   User logs in.
        *   User searches for another user and sends a friend request.
        *   Second user (simulated) logs in, accepts the friend request.
        *   First user posts a meal picture and a recipe.
        *   First user views their own profile to see the shared content and updated friend list.
    3.  **Error Handling:**
        *   Attempt to register with an existing email.
        *   Attempt to log in with incorrect password.
        *   Attempt to submit forms with invalid data (e.g., party creation, profile edit).
        *   Verify error messages are displayed in yellow and are informative.
*   **Method:** Step through predefined user scenarios, imagining interactions with the UI and verifying that each step behaves as expected according to the requirements. Focus on the overall flow and user experience.

### 7.4 Verify All Requirements

*   **Objective:** Ensure all requirements gathered from user messages, `pasted_content.txt`, and the knowledge base have been addressed and tested.
*   **Method:** Systematically review each item in `todo.md` (especially those marked as completed for implementation) and cross-reference with the test scenarios above. Check against the initial user requests and knowledge base entries.
    *   Color scheme (blue theme, yellow errors).
    *   "Invite to Dinner" button functionality (text, new page, link generation, friend selection, app download/text reply options).
    *   Recommendation algorithms (recipe and restaurant suggestions).
    *   Profile system (sign-in, verification, customizable profiles - username, pic, bio, dietary, theme).
    *   Social features (friending, share meal pics, share recipes).
    *   App name: WhatAboutDinner.
    *   Domain: whataboutdinner.food (conceptual, as deployment is separate).
    *   Tech stack considerations (MongoDB, Socket.io, JWT - conceptual implementation).

**Testing Outcome:** A summary of (conceptual) test results, noting any discrepancies or areas that would require further attention in a live development environment. Since this is a simulated test, the goal is to identify logical gaps or potential issues based on the implemented code and design documents.

