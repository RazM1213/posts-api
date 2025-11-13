export class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  createComment = async (req, res) => {
    try {
      const comment = await this.commentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllComments = async (req, res) => {
    try {
      const { postId } = req.query;
      
      if (postId) {
        const comments = await this.commentService.getCommentsByPostId(postId);
        res.status(200).json(comments);
      } else {
        const comments = await this.commentService.getAllComments();
        res.status(200).json(comments);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getCommentById = async (req, res) => {
    try {
      const comment = await this.commentService.getCommentById(req.params.id);
      res.status(200).json(comment);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  updateComment = async (req, res) => {
    try {
      const comment = await this.commentService.updateComment(req.params.id, req.body);
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const result = await this.commentService.deleteComment(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}