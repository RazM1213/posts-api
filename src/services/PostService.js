export class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData) {
    this.validatePostData(postData);
    return await this.postRepository.createPost(postData);
  }

  async getAllPosts() {
    return await this.postRepository.findAll();
  }

  async getPostById(id) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async getPostsBySender(senderId) {
    return await this.postRepository.findBySender(senderId);
  }

  async updatePost(id, postData) {
    this.validatePostData(postData);
    const updated = await this.postRepository.updatePost(id, postData);
    if (!updated) {
      throw new Error('Post not found or update failed');
    }
    return await this.postRepository.findById(id);
  }

  async deletePost(id) {
    const deleted = await this.postRepository.delete(id);
    if (!deleted) {
      throw new Error('Post not found or delete failed');
    }
    return { message: 'Post deleted successfully' };
  }

  validatePostData(postData) {
    if (!postData.title || typeof postData.title !== 'string') {
      throw new Error('Title is required and must be a string');
    }
    if (!postData.content || typeof postData.content !== 'string') {
      throw new Error('Content is required and must be a string');
    }
    if (!postData.sender || typeof postData.sender !== 'string') {
      throw new Error('Sender is required and must be a string');
    }
  }
}