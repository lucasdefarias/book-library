import { Request, Response, NextFunction } from 'express';
import { BookModel } from '../../../infrastructure/database/mongoose/schemas/BookSchema';

class BookController {
  // Get all books with pagination
  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const books = await BookModel.find()
        .select('title author publicationYear isbn availableCopies retailPrice')
        .skip(skip)
        .limit(limit);

      const total = await BookModel.countDocuments();

      res.status(200).json({
        success: true,
        count: books.length,
        total,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
        data: books
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a single book by ID
  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookModel.findById(req.params.id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  // Create a new book
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      // Set default values for copies if not provided
      if (!req.body.totalCopies) {
        req.body.totalCopies = 4;
      }
      if (!req.body.availableCopies && req.body.availableCopies !== 0) {
        req.body.availableCopies = req.body.totalCopies;
      }

      const book = await BookModel.create(req.body);

      res.status(201).json({
        success: true,
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a book
  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a book
  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookModel.findByIdAndDelete(req.params.id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Search books by criteria
  async searchBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, author, year, query } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      let searchQuery: any = {};

      // Handle full-text search
      if (query) {
        searchQuery = { $text: { $search: query as string } };
      } else {
        // Handle specific field searches
        if (title) {
          searchQuery.title = { $regex: title as string, $options: 'i' };
        }
        if (author) {
          searchQuery.author = { $regex: author as string, $options: 'i' };
        }
        if (year) {
          searchQuery.publicationYear = parseInt(year as string);
        }
      }

      const books = await BookModel.find(searchQuery)
        .skip(skip)
        .limit(limit);

      const total = await BookModel.countDocuments(searchQuery);

      res.status(200).json({
        success: true,
        count: books.length,
        total,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
        data: books
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();