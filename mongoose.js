import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("************************************************************");
  console.error("[lib/mongoose.js] MONGODB_URI is not defined in environment variables");
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error("************************************************************");
  throw new Error('Please define the MONGODB_URI environment variable');
}

console.log("##################################################################################");
console.log("[lib/mongoose.js] PARSE START: This file is being read by Node.js.");
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log("##################################################################################");

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("************************************************************");
  console.log(`[dbConnect FUNCTION ENTERED in lib/mongoose.js]`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Check if URI might be problematic (for debugging)
  const uriIsPotentiallyProblematic = !MONGODB_URI || MONGODB_URI.indexOf('mongodb') !== 0;
  console.log(`uriIsPotentiallyProblematic flag is: ${uriIsPotentiallyProblematic}`);
  console.log("************************************************************");

  if (cached.conn) {
    return cached.conn;
  }

  console.log("************************************************************");
  console.log(`[dbConnect in lib/mongoose.js] PREPARING FOR mongoose.connect.`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`URI that will be used for connect (from process.env inside dbConnect):`);
  console.log(MONGODB_URI);
  console.log("************************************************************");

  if (!cached.promise) {
    console.log("[dbConnect] Creating new Mongoose connection promise...");

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("************************************************************");
      console.log(`[dbConnect in lib/mongoose.js] mongoose.connect SUCCEEDED!`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log("************************************************************");
      return mongoose;
    });
  }
  
  console.log("[dbConnect] Awaiting Mongoose connection promise...");
  cached.conn = await cached.promise;
  console.log("[dbConnect] Mongoose connection promise resolved.");
  return cached.conn;
}

export default dbConnect;
