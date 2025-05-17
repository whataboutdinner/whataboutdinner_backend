import mongoose from 'mongoose';

const uri = "mongodb+srv://nicdeme48:5Tf613bwFht2wQKw@cluster0.dkv4hre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('Attempting to connect to MongoDB...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('Connection successful!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Connection failed:', err);
  });
