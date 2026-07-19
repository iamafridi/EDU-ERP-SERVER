import { Types } from 'mongoose';

export type TBookCategory = 'fiction' | 'non-fiction' | 'reference' | 'journal' | 'textbook' | 'other';

export type TBook = {
    title: string;
    author: string;
    publisher?: string;
    isbn: string;
    category: TBookCategory;
    edition?: string;
    publicationYear?: number;
    quantity: number;
    availableQuantity: number;
    shelfLocation?: string;
    qrTag?: string;
    isDeleted: boolean;
};
