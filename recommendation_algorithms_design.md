# Recommendation Algorithms - Design Document

This document outlines the design for the recommendation algorithms for the WhatAboutDinner application, covering both Recipe Voting Suggestions and Restaurant Order Suggestions.

**Overall Goal:** Enhance user experience by providing relevant and varied suggestions for meals and restaurants, based on user history, preferences, and a degree of exploration.

## Phase 6: Recommendation Algorithms Implementation (from todo.md)

### 6.1 Design Recommendation Algorithms

#### A. Recipe Voting Suggestions

**Objective:** Suggest meals that are similar to past preferences but also offer variety.

1.  **Data to Track (per user or party, stored in MongoDB):**
    *   `userId` (if suggestions are personalized) or `partyId` (if suggestions are for the current party context).
    *   `pastChosenMeals`: An array of objects, each containing:
        *   `mealName` (String)
        *   `cuisineType` (String, e.g., "Italian", "Mexican", "Chinese")
        *   `mainIngredients`: (Array of Strings, e.g., ["Chicken", "Pasta", "Tomato"])
        *   `tags`: (Array of Strings, e.g., ["Spicy", "Vegetarian", "Quick"])
        *   `voteDate`: (Date)
        *   `userRating`: (Optional, Number 1-5, if users can rate meals post-party)
    *   `userPreferences` (stored in user profile):
        *   `likedCuisines`: (Array of Strings)
        *   `dislikedCuisines`: (Array of Strings)
        *   `likedIngredients`: (Array of Strings)
        *   `dislikedIngredients`: (Array of Strings)
        *   `dietaryRestrictions`: (Array of Strings, e.g., ["Gluten-Free", "Vegan"])
    *   `partyHistory` (if suggestions are party-contextual):
        *   Previous meal choices for this specific party group.

2.  **Algorithm Logic (Conceptual - to be implemented server-side, e.g., in Node.js/Express API):**
    *   **Seed Data:** If a user is new or has limited history, suggest popular or trending meals (requires a global list of recipes with metadata).
    *   **Personalization Factors:**
        *   **Frequency:** Prioritize cuisines/ingredients that appear frequently in `pastChosenMeals` or `likedCuisines`/`likedIngredients`.
        *   **Recency:** Give slight preference to recently enjoyed types of meals, but also ensure variety.
        *   **Similarity:** Suggest meals with similar `cuisineType` or `mainIngredients` to previously liked meals.
            *   Example: If user liked "Spaghetti Carbonara", suggest "Fettuccine Alfredo" (similar cuisine, main ingredient pasta) or "Chicken Pesto Pasta".
        *   **Variety/Exploration (Serendipity):**
            *   Occasionally suggest meals from a different but related cuisine (e.g., if user likes Italian, suggest French or Mediterranean).
            *   Suggest meals with one or two different main ingredients but similar tags (e.g., if liked "Spicy Chicken Tacos", suggest "Spicy Beef Burrito" or "Spicy Fish Tacos").
            *   Avoid suggesting items from `dislikedCuisines` or `dislikedIngredients` or those conflicting with `dietaryRestrictions`.
    *   **Scoring/Ranking:** Develop a simple scoring system. For each potential recipe suggestion:
        *   `score = (cuisine_match_bonus) + (ingredient_match_bonus) + (tag_match_bonus) - (dislike_penalty) + (variety_bonus)`
        *   Filter out recipes that violate dietary restrictions.
        *   Return top N suggestions.

3.  **Presentation (Frontend - in Recipe Voting UI):**
    *   A dedicated section: "Need Inspiration? Try these:"
    *   Display 3-5 recipe cards, each showing: Meal Name, Cuisine, Key Ingredients, (Optional) Image.
    *   Allow users to easily add a suggested recipe to their voting options.
    *   (Optional) A "Refresh Suggestions" button.

#### B. Restaurant Order Suggestions

**Objective:** Suggest restaurants with similar food types to previously tried ones OR completely new/untried options.

1.  **Data to Track (per user, stored in MongoDB):**
    *   `userId`.
    *   `pastOrderedRestaurants`: An array of objects, each containing:
        *   `restaurantName` (String)
        *   `restaurantId` (String, from delivery service API if integrated)
        *   `cuisineTypes`: (Array of Strings, e.g., ["Pizza", "Italian", "Burgers"])
        *   `priceRange`: (String, e.g., "$", "$$", "$$$")
        *   `orderDate`: (Date)
        *   `userRating`: (Optional, Number 1-5, if users can rate restaurants)
    *   `userPreferences` (from profile, can overlap with recipe preferences):
        *   `preferredCuisines`: (Array of Strings)
        *   `preferredPriceRanges`: (Array of Strings)
        *   `blacklistedRestaurants`: (Array of Strings/IDs)

2.  **Algorithm Logic (Conceptual - server-side):**
    *   **Integration with Delivery Service API:** This is crucial. The algorithm would ideally query a delivery service API (e.g., DoorDash, UberEats - requires partnership/API access) for restaurants available in the user's location.
    *   **Seed Data:** If new user, suggest popular/highly-rated restaurants in their area across various common cuisines.
    *   **Personalization Factors:**
        *   **Similarity (Exploitation):**
            *   Suggest restaurants with `cuisineTypes` similar to those in `pastOrderedRestaurants` or `preferredCuisines`.
            *   Filter by `preferredPriceRanges`.
            *   Prioritize previously ordered and highly-rated (by user or globally) restaurants if they haven't been ordered recently (to avoid monotony).
        *   **Exploration (Variety):**
            *   Suggest highly-rated restaurants with cuisine types the user hasn't tried often or at all, but which are popular in their area.
            *   Occasionally suggest a restaurant in a slightly different price range if highly rated.
            *   Avoid `blacklistedRestaurants`.
    *   **Scoring/Ranking:** For each available restaurant from the delivery service API:
        *   `score = (cuisine_match_bonus) + (user_rating_bonus) + (global_rating_bonus) + (price_match_bonus) + (exploration_bonus) - (blacklist_penalty)`
        *   Return top N suggestions.

3.  **Presentation (Frontend - in Restaurant Selection UI):**
    *   A section: "Restaurant Suggestions for Your Party" or "Try Something New?"
    *   Display 3-5 restaurant cards, each showing: Restaurant Name, Cuisine Types, Price Range, (Optional) Delivery Est. Time, Rating.
    *   Allow users to click a suggestion to view the restaurant's menu (ideally within the app or by deep-linking to the delivery service app).

### Next Steps after Design:

1.  **Refine Data Models:** Finalize MongoDB schemas for storing preferences, history, and recipe/restaurant metadata.
2.  **Develop Backend Logic (Phase 6.2):**
    *   Implement API endpoints (e.g., `/api/suggestions/recipes`, `/api/suggestions/restaurants`).
    *   Implement the core algorithm logic on the server.
    *   Develop mechanisms for collecting and storing user preference data.
3.  **Develop Frontend Logic (Phase 6.3):**
    *   Integrate API calls to fetch suggestions.
    *   Implement UI for displaying suggestions as designed.
4.  **Test Algorithms (Phase 6.4):**
    *   Test with diverse user data and scenarios.
    *   Evaluate relevance, variety, and performance.
    *   Iterate and refine based on testing.

