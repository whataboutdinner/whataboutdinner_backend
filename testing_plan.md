# WhatAboutDinner App - Testing Plan

This document outlines the testing plan for the features implemented in the WhatAboutDinner application. The goal is to ensure all functionalities work as expected and integrate correctly.

## I. General UI and Styling (Manual Code Review & Conceptual)

1.  **Homepage Food Plate Image (`page.js` or relevant homepage file - to be created/updated):
    *   **Test:** Verify that the selected image (`homepage_food_platter_4.png`) is correctly referenced and displayed.
    *   **Expected:** Image appears above the "Host a food party" and "Join a food party" options, spanning the specified width.
2.  **Invite to Dinner Button (`redesigned_host_create_page.tsx`):
    *   **Test:** Check button placement (bottom middle, under food option and party name), text ("Invite Guests" or similar), and styling (light blue).
    *   **Expected:** Button is present, styled correctly, and clicking it (conceptually) would trigger the party link/code generation logic.
3.  **Global Color Scheme (`updated_globals.css`, `AuthGuard.js`, `redesigned_host_create_page.tsx`, `signin/page.tsx`, `profile/page.tsx`, all components):
    *   **Test:** Review CSS variables and component styles to ensure primary theme is blue, accents are appropriate shades of blue, and error messages/destructive actions use yellow.
    *   **Expected:** Consistent application of the new color scheme across all implemented UI elements. Red/orange colors should be replaced.

## II. Cybersecurity Framework (Conceptual Review)

1.  **Plan Review (`cybersecurity_framework_plan.md`):
    *   **Test:** Ensure the plan covers key areas like secure authentication, input validation, data protection, and common web vulnerabilities.
    *   **Expected:** The plan is comprehensive and provides a good foundation for secure development.
2.  **Implementation Review (Code related to auth, input):
    *   **Test:** Review `AuthGuard.js`, `signin/page.tsx` (sign-in logic), and any data handling parts of `EditProfileModal.tsx` for adherence to basic security principles (e.g., not exposing sensitive data, conceptual password handling if it were real).
    *   **Expected:** Code shows consideration for security best practices outlined in the plan.

## III. Authentication and User Verification (Code Review & Conceptual)

1.  **Profile Sign-in Flow (`signin/page.tsx`, `AuthGuard.js`):
    *   **Test UI:** Review the sign-in page UI for email/password fields, sign-in button, and links.
    *   **Test Logic (Conceptual):** Review the `handleSignIn` logic for form submission, credential validation (mocked), and `AuthContext` usage.
    *   **Expected:** UI is functional, and sign-in logic (conceptually) updates auth state.
2.  **Phone Number Verification (`PhoneNumberInput.tsx`, `OtpInput.tsx`, `verify-phone/page.tsx`):
    *   **Test UI:** Review UI for phone input, OTP input, and submission buttons.
    *   **Test Logic (Conceptual):** Review component logic for handling input and the conceptual flow of OTP generation/verification.
    *   **Expected:** UI components are well-structured. The flow for sending/verifying OTPs is logical (backend interaction is simulated).

## IV. Social Profile Features (`profile/page.tsx`, `EditProfileModal.tsx`, `FriendManagement.tsx`, `MealPhotoSharing.tsx`, `RecipeSharing.tsx`)

1.  **Profile Page UI (`profile/page.tsx`):
    *   **Test:** Verify sections for user details, friends, recipes, shared meals. Check for edit profile button.
    *   **Expected:** Profile page displays all sections correctly with placeholder/mock data.
2.  **Profile Editing (`EditProfileModal.tsx` integrated with `profile/page.tsx`):
    *   **Test:** Modal opens, allows editing of name, username, bio. Saving updates the profile page (mocked update).
    *   **Expected:** Modal functions correctly, and data updates are reflected on the profile page.
3.  **Friend Management (`FriendManagement.tsx` - conceptual integration with `profile/page.tsx`):
    *   **Test UI:** Review UI for displaying friend requests, accepting/declining, and removing friends from a list.
    *   **Test Logic (Conceptual):** Review prop handling for actions.
    *   **Expected:** Component displays data and handles actions as designed (backend interaction is simulated).
4.  **Meal Photo Sharing (`MealPhotoSharing.tsx` - conceptual integration with `profile/page.tsx`):
    *   **Test UI:** Review UI for photo upload (drag-and-drop, file selection, caption) and gallery display.
    *   **Test Logic (Conceptual):** Review file handling, preview generation, and upload simulation.
    *   **Expected:** Upload component works, and gallery displays photos correctly.
5.  **Recipe Sharing (`RecipeSharing.tsx` - conceptual integration with `profile/page.tsx`):
    *   **Test UI:** Review UI for recipe creation form (title, description, ingredients, instructions, image upload) and recipe list/card display.
    *   **Test Logic (Conceptual):** Review form handling, data aggregation, and submission simulation.
    *   **Expected:** Recipe creation form is comprehensive, and recipe list displays recipes correctly.

## V. Recommendation Algorithms (`lib/recommendationService.ts`)

1.  **Recipe Recommendations (`getRecipeRecommendations`):
    *   **Test:** Call the function with a mock `userId` and verify the output against `mockUserPreferences` and `mockRecipes`.
        *   Check if dietary restrictions are respected.
        *   Check if preferred cuisines are prioritized.
        *   Check if liked/viewed recipes influence suggestions (similar but different).
        *   Check if new/exploratory recipes are included.
        *   Check if the correct number of recommendations is returned.
    *   **Expected:** Recommendations are relevant, diverse, and adhere to the defined logic.
2.  **Restaurant Recommendations (`getRestaurantRecommendations`):
    *   **Test:** Call the function with a mock `userId` and verify the output against `mockUserPreferences` and `mockRestaurants`.
        *   Check if preferred cuisines are prioritized.
        *   Check if liked/viewed restaurants influence suggestions.
        *   Check if new/exploratory restaurants are included.
        *   Check if the correct number of recommendations is returned.
    *   **Expected:** Recommendations are relevant, diverse, and adhere to the defined logic.

## VI. Integration Testing (Conceptual)

*   **Test:** Review how different components and services are intended to work together (e.g., profile page using recommendation service, auth state affecting UI).
*   **Expected:** Logical flow and data passing between components seem correct. (Full integration testing requires a running application environment).

## VII. `todo.md` Review

*   **Test:** Ensure all relevant items in `todo.md` corresponding to implemented features are marked as complete.
*   **Expected:** `todo.md` accurately reflects the project status.

