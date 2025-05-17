# Invite Guests Page/Modal - UI/UX Design

This document outlines the UI/UX design for the new page or modal that appears when the host clicks the "Invite Guests" button on the party creation page.

**Context:** After a host has potentially filled in initial party details (or perhaps the party is created upon clicking "Invite Guests"), this interface allows them to manage invitations.

**Overall Goal:** Provide a clear, intuitive, and efficient way for the host to share the party invitation via a unique link and by directly inviting friends from their existing list.

## 1. Entry Point

-   The user clicks the "Invite Guests" button (light blue, located at the bottom middle of the host party creation page).

## 2. Presentation: Page vs. Modal

-   **Decision:** A full page is likely better given the multiple functionalities (link display, friend selection, sharing options). A modal might become too cluttered.
-   **Page Title:** "Invite Guests to Your Party" (or similar)

## 3. Key Sections and Elements on the "Invite Guests" Page

### 3.1. Unique Party Link Section

-   **Display:** Prominently display the generated unique party link.
    -   Text: "Share this link with your guests:"
    -   Link: `[unique_party_link_here]` (e.g., `https://whataboutdinner.food/party/XYZ123`)
    -   Visual: The link should be easily readable and stand out.
-   **Copy Link Button:**
    -   Button Text: "Copy Link"
    -   Icon: (Optional) A copy icon next to the text.
    -   Functionality: Copies the unique party link to the clipboard.
    -   Feedback: Provide visual feedback upon successful copy (e.g., 

 "Copied!" or changing the button icon/text temporarily).

### 3.2. Invite Friends from List Section

-   **Title:** "Or Invite Your Friends Directly"
-   **Friend List Display:**
    -   If the user has friends, display a scrollable list of their friends.
    -   Each friend item should show: Profile picture (if available), Username.
    -   A checkbox or a toggle next to each friend to select them for an invitation.
    -   Search/Filter Bar: Allow the host to quickly search or filter their friend list.
-   **No Friends State:** If the user has no friends added yet, display a message like: "You haven't added any friends yet. Share the link above, or add friends to your profile to invite them directly next time!" (Optionally, include a link to the profile/friend management section).
-   **Invite Selected Friends Button:**
    -   Button Text: "Send Invites to Selected Friends"
    -   Functionality: Sends an invitation to all selected friends. This might involve an in-app notification and/or an email/text message depending on system capabilities and user preferences.
    -   The invitation should include the party link and a prompt to download the app if the guest doesn't have it, or allow a text reply as per user's request.

### 3.3. Sharing Options / Instructions

-   **Text:** "How guests can join:"
    -   "**Using the App:** Guests with the WhatAboutDinner app can click the link or enter the party code to join directly."
    -   "**Via Text/Web (if applicable):** Guests can reply via text (details on how this works to be defined based on backend capabilities for SMS integration, e.g., Twilio). If a web view for non-app users is planned, mention that too."
    -   "**App Download Prompt:** Invitations sent can include a link to download the WhatAboutDinner app from the App Store / Google Play Store."

## 4. Page Actions / Navigation

-   **"Done" or "Back to Party" Button:** Allows the host to close the invite page and return to the main party view or dashboard.
-   **Implicit Party Creation:** Consider if clicking "Invite Guests" on the previous page should first create the party in the backend (if not already done) so that a valid link can be generated. The UI flow should be seamless.

## 5. Visual Design Considerations

-   Maintain the app's warm, inviting visual design (primary blue, accent green as per original knowledge, but now primary blue and yellow for errors, and light blue for this specific button).
-   Ensure the page is mobile-friendly and responsive.
-   Use clear typography and sufficient spacing for readability.
-   Icons can be used to enhance understanding (e.g., copy icon, add friend icon, share icon).

## 6. Future Enhancements (Optional)

-   Tracking invited guests' status (e.g., "Invited", "Joined").
-   Customizable invitation message.
-   Integration with native mobile sharing options (share sheet).

This design document will be used to guide the frontend and backend development for the invite functionality.
