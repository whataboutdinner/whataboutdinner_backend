# Social Features - Design Document

This document outlines the design for the social features in the WhatAboutDinner application, covering the friending system, sharing meal pictures, and sharing recipes.

**Overall Goal:** Foster a community within the app by enabling users to connect with friends, share their culinary experiences, and discover new ideas.

## Phase 5: Social Features Implementation (from todo.md)

### 5.1 Requirement Finalization (Social)

1.  **Friending System:**
    *   **Sending Friend Requests:**
        *   Users can search for other users by username.
        *   A "Send Friend Request" button on a user_s profile (if not already friends or request pending).
        *   Backend: Store request (senderId, receiverId, status: "pending") in a `friendRequests` collection or directly in user documents.
    *   **Accepting/Declining Friend Requests:**
        *   Users receive notifications for new friend requests.
        *   A dedicated section (e.g., "Friend Requests" page) to view incoming requests with Accept/Decline options.
        *   Backend: On accept, update both users_ `friends` list (add each other_s `userId`) and remove/update the request status. On decline, remove/update request status.
    *   **Viewing Friends List:**
        *   A section in the user_s profile to display their list of friends (username, profile picture, link to their profile).
    *   **Removing Friends:**
        *   Option to remove a friend from the friends list. Updates both users_ `friends` list.
    *   **Data Model (MongoDB - within User Schema or separate `friendships` collection):**
        *   In User Schema: `friends: [ObjectId]`, `friendRequestsSent: [{userId: ObjectId, status: String}]`, `friendRequestsReceived: [{userId: ObjectId, status: String}]`.
        *   Alternatively, a `friendships` collection: `{ user1Id: ObjectId, user2Id: ObjectId, status: "friends"/"pending_user1_user2"/"pending_user2_user1", initiatedAt: Date, acceptedAt: Date }`.

2.  **Share Meal Pictures:**
    *   **Uploading Pictures:**
        *   Interface for users to upload one or more pictures of a meal.
        *   Option to add a caption, tags (e.g., #homemade, #dinnerparty, cuisine type), and link to a party/event if applicable.
        *   Backend: Handle image file uploads (store on a service like AWS S3, Cloudinary), save image URL and metadata (caption, tags, `userId`, `partyId`, `createdAt`) in a `mealPosts` collection in MongoDB.
    *   **Viewing Pictures:**
        *   On user profiles: A gallery/feed of their shared meal pictures.
        *   (Optional - Future) A global or friends-only feed for discovering meal pictures.
    *   **Interactions (Likes/Comments - Optional - Future):**
        *   Ability to like and comment on shared meal pictures.
        *   Backend: Store likes and comments linked to the `mealPostId`.
    *   **Data Model (MongoDB `mealPosts` collection):**
        *   `postId` (ObjectId)
        *   `userId` (ObjectId, ref: Users)
        *   `imageUrl` (String - URL to image on S3/Cloudinary)
        *   `caption` (String)
        *   `tags` (Array of Strings)
        *   `partyId` (Optional ObjectId, ref: Parties)
        *   `createdAt` (Date)
        *   `likesCount` (Number, default: 0)
        *   `commentsCount` (Number, default: 0)

3.  **Share Recipes:**
    *   **Creating/Posting Recipes:**
        *   Interface for users to input recipe details:
            *   `recipeName` (String)
            *   `description` (String)
            *   `ingredients`: (Array of objects: `{ name: String, quantity: String, unit: String }`)
            *   `instructions`: (Array of Strings - steps)
            *   `prepTime` (String, e.g., "30 minutes")
            *   `cookTime` (String, e.g., "1 hour")
            *   `servings` (Number)
            *   `cuisineType` (String)
            *   `tags` (Array of Strings, e.g., ["Vegan", "Dessert", "Easy"])
            *   `mainImageUrls`: (Array of Strings - URLs to recipe images, uploaded similarly to meal pictures)
        *   Backend: Save recipe data in a `recipes` collection in MongoDB, linked to the `userId`.
    *   **Viewing Recipes:**
        *   On user profiles: A list/gallery of their shared recipes.
        *   Search/Browse functionality for recipes (global or friends-only).
        *   Detailed recipe view page.
    *   **Interactions (Ratings/Reviews/Saves - Optional - Future):**
        *   Ability to rate, review, or save/bookmark recipes.
        *   Backend: Store ratings, reviews, and saves linked to `recipeId` and `userId`.
    *   **Data Model (MongoDB `recipes` collection):**
        *   `recipeId` (ObjectId)
        *   `userId` (ObjectId, ref: Users - author)
        *   `recipeName` (String)
        *   `description` (String)
        *   `ingredients` (Array of Objects)
        *   `instructions` (Array of Strings)
        *   `prepTime` (String)
        *   `cookTime` (String)
        *   `servings` (Number)
        *   `cuisineType` (String)
        *   `tags` (Array of Strings)
        *   `mainImageUrls` (Array of Strings)
        *   `createdAt` (Date)
        *   `updatedAt` (Date)
        *   `averageRating` (Number, default: 0)
        *   `savesCount` (Number, default: 0)

### 5.2 Design UI/UX (Social)

1.  **Friend Management UI:**
    *   Search users page/modal.
    *   Friend requests notification/page (list of incoming requests with accept/decline buttons).
    *   User profile section displaying friends list (with links to their profiles and an option to unfriend).
2.  **Meal Picture Sharing UI:**
    *   Upload form: File input, caption field, tags input, optional party link.
    *   Display on profile: Gallery or feed layout for meal pictures.
    *   (Optional) Full-screen image viewer with caption and interactions.
3.  **Recipe Sharing UI:**
    *   Recipe creation form: Structured fields for all recipe details.
    *   Recipe display on profile: List or card view.
    *   Detailed recipe page: Clearly formatted ingredients, instructions, images, and metadata.
    *   (Optional) Recipe search/filter interface.

### Next Steps after Design:

1.  **Refine MongoDB Schemas:** Finalize schemas for `users` (friendship fields), `mealPosts`, and `recipes` collections.
2.  **Develop Backend Logic (Phase 5.4):**
    *   Implement API endpoints for all social interactions:
        *   Friending: Send request, accept/decline request, list friends, remove friend, search users.
        *   Meal Pictures: Upload picture (including image handling to S3/Cloudinary), get user_s pictures, (optional) get feed, like/comment.
        *   Recipes: Create recipe, update recipe, delete recipe, get user_s recipes, get specific recipe, (optional) search recipes, rate/review/save.
    *   Use Socket.io for real-time notifications (e.g., new friend request, new comment) if desired.
3.  **Develop Frontend Logic (Phase 5.3):**
    *   Create React components for all UI elements designed.
    *   Integrate API calls for all social features.
    *   Handle image uploads on the client-side before sending to backend.
4.  **Integrate and Test (Phase 5.5):**
    *   Thoroughly test all social features: friending flows, picture sharing, recipe sharing, and any interaction features.
    *   Ensure data integrity and correct display across profiles and feeds.


