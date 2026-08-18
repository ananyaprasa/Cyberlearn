/**
 * Clean up old email verification token fields from database
 * These fields were replaced by OTP fields but still exist with null values
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

async function cleanupOldFields() {
  try {
    console.log('🧹 Starting cleanup of old email verification fields...\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check current state
    const beforeCount = await usersCollection.countDocuments({
      $or: [
        { emailVerificationToken: { $exists: true } },
        { emailVerificationExpiry: { $exists: true } },
        { verificationAttempts: { $exists: true } },
        { lastVerificationEmailSent: { $exists: true } }
      ]
    });
    
    console.log(`📊 Users with old fields: ${beforeCount}`);
    
    if (beforeCount === 0) {
      console.log('✅ No old fields found. Database is clean!\n');
      return;
    }
    
    // Remove old fields
    console.log('\n🔧 Removing old fields...');
    const result = await usersCollection.updateMany(
      {},
      {
        $unset: {
          emailVerificationToken: '',
          emailVerificationExpiry: '',
          verificationAttempts: '',
          lastVerificationEmailSent: ''
        }
      }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} documents`);
    
    // Verify cleanup
    const afterCount = await usersCollection.countDocuments({
      $or: [
        { emailVerificationToken: { $exists: true } },
        { emailVerificationExpiry: { $exists: true } },
        { verificationAttempts: { $exists: true } },
        { lastVerificationEmailSent: { $exists: true } }
      ]
    });
    
    console.log(`\n📊 After cleanup:`);
    console.log(`   Users with old fields: ${afterCount}`);
    
    if (afterCount === 0) {
      console.log('\n✅ Cleanup successful! All old fields removed.');
    } else {
      console.log('\n⚠️  Some old fields still remain. Manual intervention may be needed.');
    }
    
  } catch (error) {
    console.error('\n❌ Cleanup failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
  }
}

cleanupOldFields();
