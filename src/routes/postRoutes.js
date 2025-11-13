import express from 'express';

export function createPostRoutes(postController) {
  const router = express.Router();

  router.post('/', postController.createPost);

  router.get('/', postController.getAllPosts);

  router.get('/:id', postController.getPostById);

  router.put('/:id', postController.updatePost);

  router.delete('/:id', postController.deletePost);

  return router;
}