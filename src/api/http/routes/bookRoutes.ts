import express from 'express';
import BookController from '../controllers/BookController';

const router = express.Router();

router.post('/', BookController.createBook);
router.get('/search', BookController.searchBooks);
router.get('/:id', BookController.getBookById);
router.delete('/:id', BookController.deleteBook);

export default router;