import { BaseRepository } from './BaseRepository.js';

export class PostRepository extends BaseRepository {
  constructor(database) {
    super(database, 'posts');
  }

  async findBySender(senderId) {
    return await this.db.find(this.collectionName, { sender: senderId });
  }

  async createPost(postData) {
    const post = {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return await this.create(post);
  }

  async updatePost(id, postData) {
    const updateData = {
      ...postData,
      updatedAt: new Date()
    };
    return await this.update(id, updateData);
  }
}