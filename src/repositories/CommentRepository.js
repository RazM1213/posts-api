import { BaseRepository } from './BaseRepository.js';

export class CommentRepository extends BaseRepository {
  constructor(database) {
    super(database, 'comments');
  }

  async findByPostId(postId) {
    return await this.db.find(this.collectionName, { postId: postId });
  }

  async createComment(commentData) {
    const comment = {
      ...commentData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return await this.create(comment);
  }

  async updateComment(id, commentData) {
    const updateData = {
      ...commentData,
      updatedAt: new Date()
    };
    return await this.update(id, updateData);
  }
}