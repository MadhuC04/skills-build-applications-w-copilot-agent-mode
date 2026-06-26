import { startServer } from './server.js';

startServer().catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
