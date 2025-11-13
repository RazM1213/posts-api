import express from 'express';
import { PostRepository } from './repositories/PostRepository.js';
import { CommentRepository } from './repositories/CommentRepository.js';
import { PostService } from './services/PostService.js';
import { CommentService } from './services/CommentService.js';
import { PostController } from './controllers/PostController.js';
import { CommentController } from './controllers/CommentController.js';
import { createPostRoutes } from './routes/postRoutes.js';
import { createCommentRoutes } from './routes/commentRoutes.js';

export function createApp(database) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const postRepository = new PostRepository(database);
  const commentRepository = new CommentRepository(database);

  const postService = new PostService(postRepository);
  const commentService = new CommentService(commentRepository);

  const postController = new PostController(postService);
  const commentController = new CommentController(commentService);

  app.use('/post', createPostRoutes(postController));
  app.use('/comment', createCommentRoutes(commentController));

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
}