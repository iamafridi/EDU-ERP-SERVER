import { Schema, model } from 'mongoose';
import { TBook } from './book.interface';
import { BookCategories } from './book.constant';

const bookSchema = new Schema<TBook>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        publisher: { type: String, trim: true },
        isbn: { type: String, required: true, unique: true, trim: true },
        category: { type: String, enum: BookCategories, required: true },
        edition: { type: String, trim: true },
        publicationYear: { type: Number },
        quantity: { type: Number, required: true, min: 0 },
        availableQuantity: { type: Number, required: true, min: 0 },
        shelfLocation: { type: String, trim: true },
        qrTag: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

bookSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
bookSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Book = model<TBook>('Book', bookSchema);
