import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log(`Attempting to connect to: ${process.env.MONGODB_URI}`);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('MongoDB connection successful!');
  console.log('Your access issue is resolved.');
  return mongoose.connection.db.listCollections().toArray();
})
.then(collections => {
  console.log('Available collections:');
  collections.forEach(collection => console.log(` - ${collection.name}`));
  mongoose.disconnect();
})
.catch(err => {
  console.error('MongoDB connection failed:');
  console.error(err);
  console.log('Your access issue is NOT resolved yet.');
});
