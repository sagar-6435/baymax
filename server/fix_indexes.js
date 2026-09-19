const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const User = require('./models/User');
    
    try {
      await User.collection.dropIndex('googleId_1');
      console.log('Dropped googleId_1 index');
    } catch (e) {
      console.log('Error dropping googleId_1:', e.message);
    }
    
    try {
      await User.collection.dropIndex('email_1');
      console.log('Dropped email_1 index');
    } catch (e) {
      console.log('Error dropping email_1:', e.message);
    }
    
    // Recreate indexes based on current schema
    await User.syncIndexes();
    console.log('Indexes synced successfully');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

fixIndexes();
