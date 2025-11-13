import express from 'express';

export function createCommentRoutes(commentController) {
  const router = express.Router();

  router.post('/', commentController.createComment);

  router.get('/', commentController.getAllComments);

  router.get('/:id', commentController.getCommentById);

  router.put('/:id', commentController.updateComment);

  router.delete('/:id', commentController.deleteComment);

  return router;
}