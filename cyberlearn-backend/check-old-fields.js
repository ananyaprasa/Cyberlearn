import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

async function checkOldFields() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Check for users with old token field
    const usersWithToken = await User.find({
      emailVerificationToken: { $exists: true }
    }).select('name email emailVerificationToken emailVerified');
    
    console.log(`Found ${usersWithToken.length} users with emailVerificationToken field`);
    
    if (usersWithToken.length > 0) {
      console.log('\nSample users:');
      usersWithToken.slice(0, 5).forEach(user => {
        console.log(`- ${user.email}: token=${user.emailVerificationToken ? 'exists' : 'null'}, verified=${user.emailVerified}`);
      });
    }
    
    // Check for users with old expiry field
    const usersWithExpiry = await User.find({
      emailVerificationExpiry: { $exists: true }
    }).select('name email emailVerificationExpiry emailVerified');
    
    console.log(`\nFound ${usersWithExpiry.length} users with emailVerificationExpiry field`);
    
    // Check actual field values
    const usersWithValues = await User.find({
      $or: [
        { emailVerificationToken: { $ne: null } },
        { emailVerificationExpiry: { $ne: null } }
      ]
    }).select('name email emailVerificationToken emailVerificationExpiry emailVerified');
    
    console.log(`\nFound ${usersWithValues.length} users with non-null old field values`);
    
    if (usersWithValues.length > 0) {
      console.log('\nSample users with values:');
      usersWithValues.slice(0, 5).forEach(user => {
        console.log(`- ${user.email}:`);
        console.log(`  token: ${user.emailVerificationToken ? 'has value' : 'null'}`);
        console.log(`  expiry: ${user.emailVerificationExpiry ? 'has value' : 'null'}`);
        console.log(`  verified: ${user.emailVerified}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Connection closed');
  }
}

checkOldFields();
