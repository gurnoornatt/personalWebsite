'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample books data as fallback
const initialBooks = [
  {
    id: "1",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    coverImage: "https://m.media-amazon.com/images/I/81Y8QLPFFlL._SL1500_.jpg",
    status: "Read",
    rating: 5,
    notes: "A masterpiece of adventure and revenge."
  },
  {
    id: "2",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverImage: "https://m.media-amazon.com/images/I/91N22NRvKoL._SL1500_.jpg",
    status: "Read",
    rating: 5,
    notes: "An elegant tale of a count living under house arrest in a luxury hotel."
  },
  {
    id: "3",
    title: "Perfume: The Story of a Murderer",
    author: "Patrick Süskind",
    coverImage: "https://m.media-amazon.com/images/I/71QcX1DbYML._SL1360_.jpg",
    status: "Read",
    rating: 4,
    notes: "A dark and haunting tale about the sense of smell and obsession."
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://m.media-amazon.com/images/I/91Fq9Nx-sTL._SL1500_.jpg",
    status: "Read",
    rating: 5,
    notes: "The quintessential sci-fi epic about politics, religion, and ecology."
  },
  {
    id: "5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://m.media-amazon.com/images/I/91vS2L5YfEL._SL1500_.jpg",
    status: "Read",
    rating: 5,
    notes: "A thrilling sci-fi adventure about a lone astronaut's mission to save humanity."
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
        {/* Header */}
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-medium">Books</h1>
        </div>
        
        {/* Navigation Link */}
        <div className="flex justify-center items-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Gurnoor Natt
          </Link>
        </div>

        {/* Books List */}
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground text-xs">Loading books...</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-xs">No books added yet.</p>
          </div>
        ) : (
          <div className="space-y-8 mt-6">
            {books.map((book) => (
              <div key={book.id} className="flex space-x-4">
                <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded-sm">
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
                  <h2 className="text-sm">{book.title}</h2>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {book.status}
                    </span>
                    {book.rating && (
                      <span className="text-xs text-muted-foreground">
                        {"★".repeat(book.rating)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 