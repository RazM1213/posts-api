export class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async createComment(commentData) {
    this.validateCommentData(commentData);
    return await this.commentRepository.createComment(commentData);
  }

  async getAllComments() {
    return await this.commentRepository.findAll();
  }

  async getCommentById(id) {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return comment;
  }

  async getCommentsByPostId(postId) {
    return await this.commentRepository.findByPostId(postId);
  }

  async updateComment(id, commentData) {
    this.validateCommentData(commentData);
    const updated = await this.commentRepository.updateComment(id, commentData);
    if (!updated) {
      throw new Error('Comment not found or update failed');
    }
    return await this.commentRepository.findById(id);
  }

  async deleteComment(id) {
    const deleted = await this.commentRepository.delete(id);
    if (!deleted) {
      throw new Error('Comment not found or delete failed');
    }
    return { message: 'Comment deleted successfully' };
  }

  validateCommentData(commentData) {
    if (!commentData.content || typeof commentData.content !== 'string') {
      throw new Error('Content is required and must be a string');
    }
    if (!commentData.author || typeof commentData.author !== 'string') {
      throw new Error('Author is required and must be a string');
    }
    if (!commentData.postId || typeof commentData.postId !== 'string') {
      throw new Error('PostId is required and must be a string');
    }
  }
}