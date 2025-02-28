'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

// Sample thoughts data as fallback
const initialThoughts = [
  {
    id: "1",
    title: "The Future of AI in Speech Therapy",
    excerpt: "How AI can revolutionize speech therapy for neurodivergent children...",
    date: "2023-12-15",
    slug: "future-of-ai-speech-therapy"
  },
  {
    id: "2",
    title: "Building Accessible Technology",
    excerpt: "The importance of accessibility in technology development...",
    date: "2023-11-20",
    slug: "building-accessible-technology"
  },
];

interface Thought {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>(initialThoughts);
  const [isLoading, setIsLoading] = useState(true);

  // Load thoughts from localStorage on component mount
  useEffect(() => {
    const getStoredThoughts = () => {
      try {
        // Ensure we're in a browser environment
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('thoughts');
          if (stored) {
            setThoughts(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error('Error loading thoughts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getStoredThoughts();
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full space-y-10">
        {/* Header */}
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-medium">Thoughts</h1>
        </div>
        
        {/* Navigation Link */}
        <div className="flex justify-center items-center">
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Gurnoor Natt
          </Link>
        </div>

        {/* Thoughts List */}
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground text-xs">Loading thoughts...</p>
            </div>
          </div>
        ) : thoughts.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-xs">No thoughts yet.</p>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            {thoughts.map((thought) => (
              <article key={thought.id} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <time className="text-xs text-muted-foreground">{thought.date}</time>
                </div>
                <h2 className="text-sm">
                  <Link 
                    href={`/thoughts/${thought.slug}`} 
                    className="hover:text-muted-foreground transition-colors"
                  >
                    {thought.title}
                  </Link>
                </h2>
                <p className="text-xs text-muted-foreground">{thought.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 