import dotenv from 'dotenv';
import { createApp } from './src/app.js';
import { MongoDatabase } from './src/database/MongoDatabase.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/posts_comments_db';

const dbName = MONGODB_URI.split('/').pop().split('?')[0];
const database = new MongoDatabase(MONGODB_URI, dbName);
const app = createApp(database);

async function startServer() {
  try {
    await database.connect();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();