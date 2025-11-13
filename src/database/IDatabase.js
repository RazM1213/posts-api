export class IDatabase {
  async connect() {
    throw new Error('Method connect() must be implemented');
  }

  async disconnect() {
    throw new Error('Method disconnect() must be implemented');
  }

  async insertOne(collection, document) {
    throw new Error('Method insertOne() must be implemented');
  }

  async find(collection, query = {}) {
    throw new Error('Method find() must be implemented');
  }

  async findOne(collection, query) {
    throw new Error('Method findOne() must be implemented');
  }

  async updateOne(collection, query, update) {
    throw new Error('Method updateOne() must be implemented');
  }

  async deleteOne(collection, query) {
    throw new Error('Method deleteOne() must be implemented');
  }
}