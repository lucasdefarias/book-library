import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { BookModel } from '../src/infrastructure/database/mongoose/schemas/BookSchema';
import dotenv from 'dotenv';

dotenv.config();

const csvFilePath = path.join(__dirname, 'books_sample_technical_challenge.csv');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  await connectToDatabase();

  const books: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      books.push({
        isbn: row.id,
        title: row.title,
        author: row.author,
        publicationYear: parseInt(row.publication_year),
        publisher: row.publisher,
        retailPrice: parseFloat(row.price),
        totalCopies: 4,
        availableCopies: 4,
      });
    })
    .on('end', async () => {
      try {
        await BookModel.insertMany(books);
        console.log('Books have been successfully seeded');
        mongoose.connection.close();
      } catch (error) {
        console.error('Error seeding books', error);
        mongoose.connection.close();
      }
    });
}

seedDatabase();
