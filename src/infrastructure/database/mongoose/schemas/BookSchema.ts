import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    index: true 
  },
  author: { 
    type: String, 
    required: true,
    index: true 
  },
  publicationYear: { 
    type: Number, 
    required: true,
    index: true 
  },
  isbn: { 
    type: String, 
    required: true,
    unique: true 
  },
  totalCopies: { 
    type: Number, 
    default: 4 
  },
  availableCopies: { 
    type: Number, 
    default: 4 
  },
  retailPrice: { 
    type: Number, 
    required: true 
  }
}, {
  timestamps: true,
  indexes: [
    { title: 'text', author: 'text' }
  ]
});

bookSchema.index({ author: 1, publicationYear: 1 });
bookSchema.index({ title: 1, publicationYear: 1 });

export const BookModel = mongoose.model('Book', bookSchema);
