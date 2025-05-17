# WhatAboutDinner App - Feature Enhancement Todo List

## Phase 1: Project Setup & Analysis (Completed)

- [x] Extract current project files from `Can You Create an App_.zip`.
- [x] Extract previous project files from `Can you create an app.zip`.
- [x] Analyze `redesigned_host_create_page.tsx` for existing party creation flow and UI elements.
- [x] Analyze `page.tsx` (current version) for party creation UI and color usage.
- [x] Analyze `layout.tsx` for global layout structure and context providers.
- [x] Analyze `AuthGuard.js` for authentication logic and UI messages (color usage).
- [x] Analyze `page.js` (Admin Dashboard) for UI elements and color usage.
- [x] Analyze `pasted_content.txt` for previous build error information.
- [x] Analyze `updated_globals.css` for color definitions and theme variables.

## Phase 2: UI Requirements Definition & Algorithm Design

- [ ] **Invite to Dinner Button:**
    - [x] Determine optimal placement for the "Invite to Dinner" button (bottom middle of the page, under food option and party name sections).
    - [x] Define the button's appearance (text: e.g., "Invite Guests", "Get Party Link"; color: light blue).
    - [ ] Specify the functionality upon clicking the button (e.g., generate a unique party code/link, display it to the host, provide a "copy link" option).
- [ ] **Color Changes (Red/Orange to Blue):**
    - [ ] Compile a list of all UI components and specific elements currently using red or orange colors that need to be changed to blue (based on file analysis of `.tsx`, `.js`, and `.css` files).
    - [x] Clarify with the user if error messages (e.g., in `AuthGuard.js`, currently red) should also be changed (User preference: Yellow for error messages).
    - [x] Confirm the specific shades of blue to be used (User preference: existing `--primary` (Light Blue - Tailwind blue-300) and `--accent` (brighter blue - Tailwind blue-400) in `updated_globals.css` are suitable for the general theme).
- [ ] **Homepage Food Plate Image:**
    - [ ] Confirm desired image content (specific type of food, style, etc. or if a generic high-quality food image is acceptable).
    - [x] Determine source of the image (User selected `homepage_food_platter_4.png` from AI-generated options).
    - [x] Specify exact placement and sizing (middle of the Home page, directly above "Host a food party" and "Join a food party" options, spanning the width from the far left of the host button to the far right of the join button).
- [ ] **Profile Sign-in Flow:**
    - [x] Design the UI for the profile sign-in page (e.g., input fields for email/username and password, "Sign In" button, links for "Forgot Password?" or "Sign Up" if applicable).
    - [ ] Define the user experience for successful sign-in (e.g., redirection to a dashboard or user-specific page).
    - [ ] Define the user experience for failed sign-in (e.g., clear error messages; color: Yellow).
- [ ] **User Verification    - [x] Obtain detailed clarification from the user on the scope of "user verification (them and others)" (User selected Phone Number Verification)..
    - [ ] Define the UI elements and workflow for this verification process based on the clarification.
- [ ] **Social Profile Features:**
    - [x] Design UI for customizable user profiles (e.g., profile picture, cover photo, bio, display name, theme preferences, similar to X/Twitter) (Initial structure and edit modal created in `app/profile/page.tsx` and `components/EditProfileModal.tsx`).
    - [ ] Define UI for managing friend connections (e.g., sending/accepting friend requests, viewing friend lists, unfriending).
    - [ ] Design UI for sharing meal pictures (e.g., upload form, gallery view, feed display).
    - [ ] Design UI for sharing recipes (e.g., recipe creation form with fields for ingredients, instructions, prep time; recipe browsing/viewing page).
- [ ] **Recommendation Algorithms Design:**
    - [ ] **Recipe Voting Algorithm:**
        - [ ] Define data points to track for recipe preferences (e.g., previously chosen recipes, voted-on recipes, cuisine types, ingredients, prep time).
        - [ ] Design logic for suggesting "similar but different" meals (e.g., same cuisine, different main ingredient; similar ingredients, different cooking style).
        - [ ] Design logic for suggesting "completely different" meals not yet tried by the user/group.
        - [ ] Determine how to present these suggestions in the UI.
    - [ ] **Restaurant Orders Algorithm:**
        - [ ] Define data points to track for restaurant preferences (e.g., previously ordered from restaurants, types of cuisine, price range, location if relevant).
        - [ ] Design logic for suggesting stores with "similar food types" to previously tried ones.
        - [ ] Design logic for suggesting "completely different" restaurants/food types not yet tried.
        - [ ] Determine how to present these suggestions in the UI.
    - [ ] **Data Storage:**
        - [ ] Define how user/group preference data will be stored and accessed for the algorithms.
- [ ] **Other Requirements:**
    - [ ] Gather and document any additional requirements or "other things" the user wants to implement in this phase.

## Phase 3: Implementation

- [ ] **Homepage Food Plate Image:**
    - [ ] Obtain or generate the food plate image.
    - [ ] Add the image to the relevant homepage component (`page.tsx` or similar).
    - [ ] Style the image for correct placement, spanning, and responsiveness.
- [ ] **Invite to Dinner Button:**
    - [ ] Implement the UI for the "Invite to Dinner" button in the identified React component (e.g., `redesigned_host_create_page.tsx`).
    - [ ] Implement the client-side logic to generate/display the party code/link.
- [ ] **Color Changes:**
    - [ ] Modify `updated_globals.css` to ensure the blue theme is consistently defined and applied. Update or remove old orange/red color variables if they are superseded. Add yellow for error messages.
    - [ ] Update `AuthGuard.js` to change red text/backgrounds to yellow for error notifications.
    - [ ] Update `page.js` (Admin Dashboard) to change all instances of orange text and UI elements to blue.
    - [ ] Update `redesigned_host_create_page.tsx` and `page.tsx` to change orange/red UI elements (buttons, focus rings, text) to blue.
    - [ ] Conduct a project-wide search for any remaining hardcoded red/orange color styles or Tailwind classes and update them to use the new blue/yellow theme.
- [ ] **Profile Sign-in Flow:**
    - [ ] Develop the React components for the sign-in page UI.
    - [ ] Implement the sign-in logic, including handling user input and interacting with the authentication context (`useAuth`).
    - [ ] Implement redirection logic post-successful sign-in.
    - [ ] Implement clear error message display (yellow) for failed sign-in attempts.
- [ ] **User Verification:**
    - [ ] Develop UI components for the user verification process as per defined requirements.
    - [ ] Implement the necessary client-side and/or server-side logic for verification (scope dependent on clarification).
- [ ] **Social Profile Features:**
    - [ ] Develop UI components for customizable user profiles.
    - [ ] Implement logic for profile data storage and retrieval (e.g., profile picture, bio, preferences).
    - [ ] Develop UI components for friend management (friend requests, friend lists, user search).
    - [ ] Implement backend logic for managing friend relationships.
    - [ ] Develop UI components for sharing and viewing meal pictures (upload, display, feed).
    - [ ] Implement backend logic for storing and serving meal pictures.
    - [ ] Develop UI components for creating, sharing, and viewing recipes.
    - [ ] Implement backend logic for storing and serving recipes.
- [ ] **Recommendation Algorithms Implementation:**
    - [ ] Implement data collection and storage mechanisms for user preferences related to recipes and restaurants.
    - [ ] Implement the recipe suggestion algorithm based on the designed logic.
    - [ ] Integrate recipe suggestions into the recipe voting party type UI.
    - [ ] Implement the restaurant suggestion algorithm based on the designed logic.
    - [ ] Integrate restaurant suggestions into the restaurant order party type UI.

## Phase 4: Testing

- [ ] **Homepage Food Plate Image:**
    - [ ] Verify image displays correctly on the homepage as per specifications.
    - [ ] Test responsiveness of the image on different screen sizes.
- [ ] **Invite to Dinner Button:**
    - [ ] Test the button's visibility, appearance, and click functionality.
    - [ ] Verify correct generation and display of the party code/link.
    - [ ] Test any associated actions like "copy link".
- [ ] **Color Changes:**
    - [ ] Thoroughly review all updated pages and components to ensure all specified red/orange elements are now blue, and error messages are yellow.
    - [ ] Verify color consistency across the application.
    - [ ] Check for any unintended color changes or visual regressions.
- [ ] **Profile Sign-in Flow:**
    - [ ] Test successful sign-in with valid credentials.
    - [ ] Test failed sign-in with invalid credentials and verify error messages (yellow).
    - [ ] Test redirection logic.
- [ ] **User Verification:**
    - [ ] Test the user verification process end-to-end based on its implemented functionality.
- [ ] **Social Profile Features:**
    - [ ] Test profile customization (updating and viewing profile information, pictures, themes).
    - [ ] Test friend connection features (sending, accepting, rejecting requests; viewing friends; unfriending).
    - [ ] Test meal picture sharing (uploading, viewing, feed display).
    - [ ] Test recipe sharing (creating, viewing, searching/browsing recipes).
- [ ] **Recommendation Algorithms:**
    - [ ] Test recipe suggestion algorithm with various user histories (no history, some history, extensive history).
    - [ ] Verify the relevance and variety of recipe suggestions.
    - [ ] Test restaurant suggestion algorithm with various user histories.
    - [ ] Verify the relevance and variety of restaurant suggestions.
    - [ ] Test edge cases and error handling for both algorithms.
- [ ] **Overall Testing:**
    - [ ] Perform responsive design testing on different screen sizes.
    - [ ] Conduct general usability testing for all new features.

## Phase 5: Integration & Deployment

- [ ] Ensure all new features are correctly integrated with the existing application components and data flow.
- [ ] Verify that the application builds successfully without errors (referencing `pasted_content.txt` for context on past build issues if they resurface).
- [ ] Ask the user if permanent deployment to a production environment is required for these changes.
- [ ] If requested, deploy the updated application and provide the user with the access URL for demonstration and feedback.

## Phase 6: Documentation

- [ ] Document the implementation details for the new features, including component changes, new CSS variables, and any new logic for authentication, party invites, social features, and recommendation algorithms.
- [ ] Update any existing project documentation to reflect these changes.
