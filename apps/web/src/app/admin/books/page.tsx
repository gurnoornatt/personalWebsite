'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Pencil, Trash, Plus, Image } from 'lucide-react';

// Sample books data - in a real app, this would come from a database or CMS
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

// Update the getStoredBooks function to safely handle localStorage
const getStoredBooks = (): Book[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('books');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored books', e);
      }
    }
  }
  return initialBooks;
};

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book>({
    id: '',
    title: '',
    author: '',
    coverImage: '',
    status: 'Want to Read',
    rating: null,
    notes: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load books from localStorage on component mount
  useEffect(() => {
    setBooks(getStoredBooks());
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books]);

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setImagePreview(book.coverImage);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
      toast.success('Book deleted');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentBook.title || !currentBook.author) {
      toast.error('Title and author are required');
      return;
    }
    
    if (currentBook.id) {
      // Update existing book
      setBooks(books.map(book => 
        book.id === currentBook.id ? currentBook : book
      ));
      toast.success('Book updated');
    } else {
      // Add new book
      const newBook: Book = {
        ...currentBook,
        id: Date.now().toString(),
        coverImage: currentBook.coverImage || 'https://placehold.co/400x600?text=No+Cover',
      };
      setBooks([...books, newBook]);
      toast.success('Book created');
    }
    
    setIsEditing(false);
    setCurrentBook({
      id: '',
      title: '',
      author: '',
      coverImage: '',
      status: 'Want to Read',
      rating: null,
      notes: ''
    });
    setImagePreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentBook({
      id: '',
      title: '',
      author: '',
      coverImage: '',
      status: 'Want to Read',
      rating: null,
      notes: ''
    });
    setImagePreview(null);
  };

  const handleImagePreview = (url: string) => {
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full space-y-10">
        {/* Header with navigation back to admin */}
        <div className="flex justify-between items-center">
          <Link href="/admin" className="text-base font-medium hover:text-muted-foreground transition-colors">
            Admin
          </Link>
          <h1 className="text-xl font-medium">Manage Books</h1>
        </div>

        {/* Add New Button */}
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Book
          </Button>
        )}

        {/* Edit Form */}
        {isEditing && (
          <div className="border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-base font-medium">
              {currentBook.id ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={currentBook.title}
                  onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium">
                  Author
                </label>
                <Input
                  id="author"
                  value={currentBook.author}
                  onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="coverImage" className="text-sm font-medium">
                  Cover Image URL
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="coverImage"
                    value={currentBook.coverImage}
                    onChange={(e) => {
                      setCurrentBook({...currentBook, coverImage: e.target.value});
                      handleImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/book-cover.jpg"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleImagePreview(currentBook.coverImage)}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative w-20 h-30 overflow-hidden rounded-md border border-border">
                    <img 
                      src={imagePreview} 
                      alt="Cover preview" 
                      className="object-cover w-full h-full"
                      onError={() => {
                        toast.error('Failed to load image');
                        setImagePreview(null);
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={currentBook.status}
                  onValueChange={(value) => setCurrentBook({...currentBook, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Read">Read</SelectItem>
                    <SelectItem value="Currently Reading">Currently Reading</SelectItem>
                    <SelectItem value="Want to Read">Want to Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating (1-5)
                </label>
                <Select
                  value={currentBook.rating?.toString() || "null"}
                  onValueChange={(value) => setCurrentBook({
                    ...currentBook, 
                    rating: value === "null" ? null : parseInt(value, 10)
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">No Rating</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  value={currentBook.notes}
                  onChange={(e) => setCurrentBook({...currentBook, notes: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  {currentBook.id ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Books List */}
        {!isEditing && (
          <div className="space-y-4">
            {books.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No books added yet. Click "Add New Book" to get started.
              </div>
            ) : (
              books.map((book) => (
                <div key={book.id} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      {book.coverImage && (
                        <div className="relative w-16 h-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={book.coverImage}
                            alt={`Cover of ${book.title}`}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://placehold.co/400x600?text=No+Cover';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-base font-medium">{book.title}</h3>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                        <div className="flex items-center space-x-2 mt-1">
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
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(book)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {book.notes && <p className="text-sm text-muted-foreground">{book.notes}</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
} 