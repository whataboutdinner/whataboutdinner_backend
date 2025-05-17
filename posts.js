// File: /home/ubuntu/what_about_dinner_app/pages/api/social/posts.js
// Backend logic for sharing meal pictures (and potentially recipes if combined)

// import { MongoClient, ObjectId } from "mongodb";
// import { getSession } from "next-auth/react"; // To secure endpoints
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // For S3 uploads
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // For S3 presigned URLs for client-side uploads
// import formidable from "formidable"; // For parsing multipart/form-data (image uploads)

// // Configure S3 client
// const s3Client = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//   },
// });
// const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parser for formidable to work
//   },
// };

// async function connectDb() {
//   const client = new MongoClient(process.env.MONGODB_URI);
//   await client.connect();
//   return client.db("whataboutdinner");
// }

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // if (!session || !session.user || !session.user.id) {
  //   return res.status(401).json({ message: "Not authenticated" });
  // }
  // const currentUserId = session.user.id;
  const currentUserId = "mockCurrentUserId"; // Placeholder

  // const db = await connectDb();
  // const mealPostsCollection = db.collection("mealPosts");
  // const recipesCollection = db.collection("recipes");

  if (req.method === "POST") { // Create a new meal picture post or recipe post
    // This endpoint might need to handle multipart/form-data for image uploads
    // For simplicity, this placeholder assumes image URLs are provided directly or handled client-side via presigned URLs
    const { type, imageUrl, caption, tags, partyId, recipeDetails } = req.body;
    // type: "meal_picture", "recipe"

    if (!type) {
      return res.status(400).json({ message: "Post type is required." });
    }

    try {
      // TODO: Implement actual DB logic based on `social_features_design.md`
      // - Validate input
      // - For meal_picture: save imageUrl, caption, tags, partyId to mealPostsCollection
      // - For recipe: save recipeDetails to recipesCollection
      // - Handle actual image uploads to S3 if backend is processing them, or ensure client provides valid S3 URLs

      if (type === "meal_picture") {
        if (!imageUrl || !caption) {
          return res.status(400).json({ message: "Image URL and caption are required for meal pictures." });
        }
        console.log(`User ${currentUserId} posted meal picture: ${caption}, URL: ${imageUrl}`);
        // const newMealPost = { userId: new ObjectId(currentUserId), imageUrl, caption, tags: tags || [], partyId: partyId ? new ObjectId(partyId) : null, createdAt: new Date(), likesCount: 0, commentsCount: 0 };
        // const result = await mealPostsCollection.insertOne(newMealPost);
        return res.status(201).json({ message: "Meal picture posted successfully (mock).", postId: "mockMealPostId123" });
      
      } else if (type === "recipe") {
        if (!recipeDetails || !recipeDetails.recipeName || !recipeDetails.ingredients || !recipeDetails.instructions) {
          return res.status(400).json({ message: "Recipe name, ingredients, and instructions are required." });
        }
        console.log(`User ${currentUserId} posted recipe: ${recipeDetails.recipeName}`);
        // const newRecipe = { userId: new ObjectId(currentUserId), ...recipeDetails, createdAt: new Date(), updatedAt: new Date(), averageRating: 0, savesCount: 0 };
        // const result = await recipesCollection.insertOne(newRecipe);
        return res.status(201).json({ message: "Recipe posted successfully (mock).", recipeId: "mockRecipeId123" });
      }

      return res.status(400).json({ message: "Invalid post type." });

    } catch (error) {
      console.error("Post creation failed:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

  } else if (req.method === "GET") { // Fetch posts (e.g., user_s posts, specific post, feed)
    const { type, userId, postId, recipeId } = req.query;
    // type: "meal_pictures_by_user", "recipes_by_user", "single_meal_picture", "single_recipe"

    try {
      // TODO: Implement actual DB logic to fetch posts
      if (type === "meal_pictures_by_user" && userId) {
        const mockMealPosts = [
          { postId: "mp1", userId, imageUrl: "/path/to/meal1.jpg", caption: "Delicious pasta!", tags: ["pasta", "italian"], createdAt: new Date() },
          { postId: "mp2", userId, imageUrl: "/path/to/meal2.jpg", caption: "My breakfast smoothie", tags: ["healthy", "smoothie"], createdAt: new Date() },
        ];
        return res.status(200).json(mockMealPosts);
      } else if (type === "recipes_by_user" && userId) {
        const mockRecipes = [
          { recipeId: "r1", userId, recipeName: "Grandma_s Cookies", cuisineType: "Dessert", createdAt: new Date() },
          { recipeId: "r2", userId, recipeName: "Spicy Chili", cuisineType: "Tex-Mex", createdAt: new Date() },
        ];
        return res.status(200).json(mockRecipes);
      }
      // Add logic for fetching single posts by postId/recipeId or a general feed

      return res.status(400).json({ message: "Invalid GET request parameters for posts." });

    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

