export class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = async (req, res) => {
    try {
      const post = await this.postService.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllPosts = async (req, res) => {
    try {
      const { sender } = req.query;
      
      if (sender) {
        const posts = await this.postService.getPostsBySender(sender);
        res.status(200).json(posts);
      } else {
        const posts = await this.postService.getAllPosts();
        res.status(200).json(posts);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getPostById = async (req, res) => {
    try {
      const post = await this.postService.getPostById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  updatePost = async (req, res) => {
    try {
      const post = await this.postService.updatePost(req.params.id, req.body);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      const result = await this.postService.deletePost(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}