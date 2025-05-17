import mongoose from 'mongoose';

const uri = "mongodb+srv://nicdeme48:5Tf613bwFht2wQKw@cluster0.dkv4hre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('Attempting to connect to MongoDB...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })
  .then(async () => {
    console.log('Connection successful!');
    
    // Try to create a test collection
    console.log('Attempting to create a test collection...');
    const testCollection = mongoose.connection.collection('test_collection');
    
    // Try to insert a simple document
    console.log('Attempting to insert a test document...');
    await testCollection.insertOne({ test: 'document', createdAt: new Date() });
    console.log('Document inserted successfully!');
    
    // Try to read the document back
    console.log('Attempting to read the test document...');
    const doc = await testCollection.findOne({ test: 'document' });
    console.log('Document read successfully:', doc);
    
    mongoose.disconnect();
    console.log('All operations completed successfully!');
  })
  .catch(err => {
    console.error('Operation failed:', err);
    mongoose.disconnect();
  });
