export class BaseRepository {
  constructor(database, collectionName) {
    this.db = database;
    this.collectionName = collectionName;
  }

  async create(data) {
    const result = await this.db.insertOne(this.collectionName, data);
    return { _id: result.insertedId, ...data };
  }

  async findAll(query = {}) {
    return await this.db.find(this.collectionName, query);
  }

  async findById(id) {
    if (!this.db.isValidObjectId(id)) {
      return null;
    }
    return await this.db.findOne(this.collectionName, { _id: this.db.createObjectId(id) });
  }

  async update(id, data) {
    if (!this.db.isValidObjectId(id)) {
      return null;
    }
    const result = await this.db.updateOne(
      this.collectionName,
      { _id: this.db.createObjectId(id) },
      data
    );
    return result.matchedCount > 0;
  }

  async delete(id) {
    if (!this.db.isValidObjectId(id)) {
      return false;
    }
    const result = await this.db.deleteOne(
      this.collectionName,
      { _id: this.db.createObjectId(id) }
    );
    return result.deletedCount > 0;
  }
}