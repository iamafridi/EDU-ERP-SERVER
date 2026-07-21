import mongoose from 'mongoose';
import config from '../app/config';
import { seedDemoData } from '../app/seed';

async function main() {
  console.log('🌱 Starting seed script...');
  try {
    await mongoose.connect(config.database_url as string);
    console.log('  Connected to MongoDB');
    await seedDemoData();
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('  Disconnected from MongoDB');
  }
  process.exit(0);
}

main();
