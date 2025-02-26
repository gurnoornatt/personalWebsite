'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample books data as fallback
const initialBooks = [
  {
    id: "1",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "https://m.media-amazon.com/images/I/61fdrEuPJwL._SL1500_.jpg",
    status: "Read",
    rating: 5,
    notes: "A fascinating exploration of the two systems that drive the way we think."
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://m.media-amazon.com/images/I/81wgcld4wxL._SL1500_.jpg",
    status: "Currently Reading",
    rating: 4,
    notes: "Practical strategies for forming good habits and breaking bad ones."
  },
  {
    id: "3",
    title: "Superintelligence",
    author: "Nick Bostrom",
    coverImage: "https://m.media-amazon.com/images/I/71wvKXWfcML._SL1500_.jpg",
    status: "Want to Read",
    rating: null,
    notes: ""
  },
];

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: string;
  rating: number | null;
  notes: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get books from localStorage or use initial data
    const getBooks = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedBooks = localStorage.getItem('books');
          if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
          }
        }
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getBooks();
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full space-y-10">
        {/* Header with navigation back to home */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-base font-medium hover:text-muted-foreground transition-colors">
            Gurnoor Natt
          </Link>
          <h1 className="text-xl font-medium">Books</h1>
        </div>

        {/* Books List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Loading books...</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No books added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books.map((book) => (
              <div key={book.id} className="flex space-x-3">
                <div className="relative w-20 h-30 flex-shrink-0 overflow-hidden rounded-md">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/400x600?text=No+Cover';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      No Cover
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <h2 className="text-sm font-medium">{book.title}</h2>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      book.status === "Read" 
                        ? "bg-green-500/10 text-green-500" 
                        : book.status === "Currently Reading"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-gray-500/10 text-gray-500"
                    }`}>
                      {book.status}
                    </span>
                    {book.rating && (
                      <span className="text-xs text-yellow-500">
                        {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
                      </span>
                    )}
                  </div>
                  {book.notes && <p className="text-xs text-muted-foreground">{book.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 