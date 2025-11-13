import { MongoClient, ObjectId } from 'mongodb';
import { IDatabase } from './IDatabase.js';

export class MongoDatabase extends IDatabase {
  constructor(uri, dbName) {
    super();
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  async insertOne(collection, document) {
    const result = await this.db.collection(collection).insertOne(document);
    return result;
  }

  async find(collection, query = {}) {
    const documents = await this.db.collection(collection).find(query).toArray();
    return documents;
  }

  async findOne(collection, query) {
    const document = await this.db.collection(collection).findOne(query);
    return document;
  }

  async updateOne(collection, query, update) {
    const result = await this.db.collection(collection).updateOne(query, { $set: update });
    return result;
  }

  async deleteOne(collection, query) {
    const result = await this.db.collection(collection).deleteOne(query);
    return result;
  }

  createObjectId(id) {
    return new ObjectId(id);
  }

  isValidObjectId(id) {
    return ObjectId.isValid(id);
  }
}