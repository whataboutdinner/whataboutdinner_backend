# Recommendation Algorithm Design Document - WhatAboutDinner App

## 1. Introduction

This document outlines the design for the recommendation algorithms to be implemented in the WhatAboutDinner application. The goal is to enhance user experience by providing personalized suggestions for both recipe-based parties and restaurant order parties.

Two main algorithms will be designed:
1.  **Recipe Voting Algorithm:** Suggests recipes based on past choices, aiming for variety and discovery.
2.  **Restaurant Orders Algorithm:** Suggests restaurants based on past orders, also balancing familiarity with new options.

## 2. General Principles

-   **Personalization:** Recommendations should be tailored to individual user or group preferences where possible.
-   **Variety & Discovery:** Algorithms should balance suggesting familiar options with introducing new ones to prevent filter bubbles and encourage exploration.
-   **Transparency (Optional):** Consider if/how to explain to users why a particular suggestion is made (e.g., "Because you liked [X]").
-   **Cold Start:** Address how recommendations will be handled for new users or groups with no prior history.
-   **Data Privacy:** Ensure all data collection and usage comply with privacy best practices.

## 3. Recipe Voting Algorithm

### 3.1. Data Points to Track

For each user and/or party:
-   **Recipe History:** List of recipes previously cooked/chosen by the host or party.
-   **Voting History:** Recipes voted on by participants (positive votes).
-   **Cuisine Preferences:** Implicitly derived from recipe history (e.g., Italian, Mexican, Indian) or explicitly stated if a profile feature for this is added.
-   **Key Ingredients:** Common ingredients in liked/chosen recipes (e.g., chicken, pasta, specific vegetables).
-   **Dietary Tags/Restrictions (if available):** e.g., vegetarian, gluten-free, vegan.
-   **Prep Time Preferences:** Average or range of prep times for chosen recipes.
-   **Disliked/Rejected Recipes (if tracked):** Recipes that were available but not chosen or received negative votes.

### 3.2. Suggestion Logic

When a host is creating a recipe voting party, the system can suggest recipes to add as options.

**A. Suggesting "Similar but Different" Meals:**
1.  **Based on Last Party/Recipe:** Identify the last successful party recipe or a highly-rated recipe.
    *   *Similarity criteria:* Same cuisine, but different main protein (e.g., if last was Chicken Alfredo, suggest Shrimp Scampi or Vegetarian Lasagna).
    *   *Similarity criteria:* Similar key ingredients, but different preparation style (e.g., if last was grilled chicken, suggest baked chicken with a different sauce or a chicken stir-fry).
2.  **Based on Frequent Cuisines/Ingredients:** Analyze the top 2-3 cuisines or key ingredients from the user/group history.
    *   Suggest popular or highly-rated recipes within those cuisines that haven't been tried recently.
    *   Suggest recipes that use a preferred key ingredient in a new way.

**B. Suggesting "Completely Different" Meals:**
1.  **Explore New Cuisines:** Identify cuisines not present or rare in the user/group history. Suggest popular or introductory dishes from these new cuisines.
2.  **Trending/Popular Recipes:** If a global or community-wide recipe rating system exists, suggest recipes that are currently trending or highly rated by other users, filtered by any known dietary preferences.
3.  **Random (with constraints):** Offer a "Surprise Me" option that picks a well-rated recipe, ensuring it doesn’t match recent history and fits basic dietary profiles if known.

### 3.3. UI Presentation

-   Suggestions could appear as a list or carousel when the host is adding recipe options.
-   Each suggestion should display the recipe name, a photo, key tags (cuisine, prep time), and perhaps a brief reason (e.g., "Try something new!" or "Based on your love for Italian food").

## 4. Restaurant Orders Algorithm

### 4.1. Data Points to Track

For each user and/or party:
-   **Order History:** List of restaurants previously ordered from.
-   **Cuisine Types Ordered:** e.g., Pizza, Chinese, Burgers, Sushi.
-   **Price Range:** Average price point of past orders (if available from restaurant data).
-   **Location Data (if relevant and permission given):** To suggest local options, though the app seems to focus on delivery services which handle this.
-   **Specific Dishes Liked (if granular data is captured):** e.g., user always orders a specific pizza topping.
-   **Disliked/Rejected Restaurants (if tracked).

### 4.2. Suggestion Logic

When a host is selecting a restaurant for a party:

**A. Suggesting Stores with "Similar Food Types":**
1.  **Based on Last Order:** Identify the cuisine type of the last restaurant ordered from.
    *   Suggest other restaurants in the same cuisine category that are well-rated or offer similar menu items but haven't been tried by the user/group recently.
2.  **Based on Frequent Cuisines:** Analyze the top 2-3 most frequently ordered cuisine types.
    *   Suggest new or highly-rated restaurants within these preferred cuisines.

**B. Suggesting "Completely Different" Restaurants/Food Types:**
1.  **Explore New Cuisines:** Identify cuisine types not present or rare in the user/group order history. Suggest popular or well-rated restaurants offering these cuisines.
2.  **Trending/Popular Restaurants:** If integrated with a delivery service API that provides this data, suggest restaurants that are trending or highly-rated locally.
3.  **Special Offers/Deals:** Highlight restaurants offering promotions or deals, especially if they align with known cuisine preferences or are from a new cuisine type.

### 4.3. UI Presentation

-   Suggestions could appear when the host is about to choose a restaurant delivery service or browse restaurants.
-   Display restaurant name, cuisine type, rating (if available), and potentially a reason for the suggestion.

## 5. Data Storage and Access

-   **User/Group Profiles:** User and group (party) profiles will need to store preference data. This could be a NoSQL database (like Firestore or MongoDB) for flexibility.
    -   **User Data:** `userId`, `recipeHistory: [recipeId]`, `restaurantHistory: [restaurantId]`, `cuisinePreferences: [{cuisine: string, score: float}]`, `ingredientPreferences: [{ingredient: string, score: float}]`.
    -   **Party Data (if group history is separate):** `partyId`, `chosenRecipe: recipeId`, `chosenRestaurant: restaurantId`.
-   **Recipe/Restaurant Data:** A separate database/collection for recipes (with ingredients, cuisine tags, prep times) and restaurants (with cuisine tags, potentially menu highlights).
-   **Access:** Backend APIs will be needed to:
    -   Record user choices and update preference scores.
    -   Query user/group history.
    -   Fetch recipe/restaurant details.
    -   Execute the recommendation logic.

## 6. Cold Start Problem

-   **New Users/Groups:**
    -   Offer a short onboarding questionnaire to capture initial preferences (e.g., "What are some of your favorite cuisines?" "Any dietary restrictions?").
    -   Default to globally popular/trending recipes or restaurants.
    -   Prominently feature a diverse set of options to help users start building their history.

## 7. Future Enhancements

-   **Collaborative Filtering:** "Users who liked X also liked Y."
-   **Content-Based Filtering Refinements:** More sophisticated analysis of recipe ingredients or restaurant menu items.
-   **Contextual Recommendations:** Time of day, day of week, special occasions.
-   **Machine Learning Models:** For more complex pattern recognition as data grows.

## 8. Next Steps

-   Refine data models for user preferences, recipes, and restaurants.
-   Develop initial versions of the scoring and suggestion logic.
-   Plan for API endpoints to support these features.
-   Discuss with the user for feedback on this initial design.
