'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { notFound } from "next/navigation";

// Sample thoughts data as fallback
const initialThoughts = [
  {
    id: "1",
    title: "The Future of AI in Speech Therapy",
    content: `
      <p>Speech therapy is an essential service for many neurodivergent children, helping them develop communication skills that are crucial for social interaction, education, and overall quality of life. However, traditional speech therapy faces several challenges:</p>
      
      <ul>
        <li>Limited availability of qualified therapists</li>
        <li>High costs that make it inaccessible to many families</li>
        <li>Difficulty in maintaining consistent practice between sessions</li>
        <li>One-size-fits-all approaches that don't account for individual needs</li>
      </ul>
      
      <p>This is where AI can make a transformative difference. By leveraging advances in speech recognition, natural language processing, and machine learning, we can create tools that provide personalized, accessible, and effective speech therapy support.</p>
      
      <h2>How AI Can Enhance Speech Therapy</h2>
      
      <p>AI-powered speech therapy platforms can offer several advantages:</p>
      
      <ol>
        <li><strong>Personalization:</strong> AI can adapt to each child's unique speech patterns, learning pace, and specific challenges.</li>
        <li><strong>Accessibility:</strong> Digital platforms can reach children in remote or underserved areas.</li>
        <li><strong>Engagement:</strong> Interactive, game-based exercises can make practice more enjoyable and motivating.</li>
        <li><strong>Continuous Feedback:</strong> Real-time analysis can provide immediate feedback on pronunciation and articulation.</li>
        <li><strong>Progress Tracking:</strong> Detailed data collection can help monitor improvements over time.</li>
      </ol>
      
      <p>The potential impact of these technologies is enormous. By making effective speech therapy more widely available, we can help more neurodivergent children develop the communication skills they need to express themselves and connect with others.</p>
      
      <p>As we continue to develop these AI tools, it's crucial that we work closely with speech-language pathologists, neurodiversity advocates, and the children and families who will use them. Only through this collaborative approach can we ensure that the technology truly meets the needs of those it aims to serve.</p>
    `,
    date: "2023-12-15",
    slug: "future-of-ai-speech-therapy"
  },
  {
    id: "2",
    title: "Building Accessible Technology",
    content: `
      <p>Accessibility should be at the core of technology development, not an afterthought. When we design with accessibility in mind, we create products that can be used by everyone, regardless of their abilities or disabilities.</p>
      
      <p>This is especially important when developing tools for neurodivergent individuals, who may have unique needs and preferences when it comes to user interfaces, interaction patterns, and sensory experiences.</p>
      
      <h2>Key Principles for Accessible Design</h2>
      
      <ul>
        <li><strong>Simplicity:</strong> Clear, straightforward interfaces reduce cognitive load.</li>
        <li><strong>Flexibility:</strong> Customizable settings accommodate different preferences and needs.</li>
        <li><strong>Multimodal Interaction:</strong> Supporting multiple input and output methods ensures usability for people with different abilities.</li>
        <li><strong>Consistency:</strong> Predictable patterns help users navigate and understand the system.</li>
        <li><strong>Feedback:</strong> Clear feedback helps users understand what's happening and what actions they can take.</li>
      </ul>
      
      <p>By embracing these principles, we can create technology that truly serves everyone, including those who have been historically marginalized or excluded from technological advances.</p>
      
      <p>As we continue to develop our AI-powered speech therapy platform, accessibility remains at the forefront of our design process. We're committed to creating a tool that works for all neurodivergent children, regardless of their specific challenges or learning styles.</p>
    `,
    date: "2023-11-20",
    slug: "building-accessible-technology"
  },
];

interface Thought {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
}

export default function ThoughtPage({ params }: { params: { slug: string } }) {
  const [thought, setThought] = useState<Thought | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  // First, set the slug from params
  useEffect(() => {
    // Handle params.slug
    const resolveSlug = async () => {
      try {
        // In Next.js 15, we need to handle params carefully
        if (params && params.slug) {
          // Just use the slug directly - Next.js will handle the Promise internally
          setSlug(params.slug as string);
        }
      } catch (error) {
        console.error('Error resolving slug:', error);
      }
    };

    resolveSlug();
  }, [params]);

  // Then, fetch the thought once we have the slug
  useEffect(() => {
    if (!slug) return;

    const fetchThought = () => {
      try {
        // Ensure we're in a browser environment
        if (typeof window !== 'undefined') {
          // Try to get thoughts from localStorage
          const stored = localStorage.getItem('thoughts');
          let thoughts = initialThoughts;
          
          if (stored) {
            thoughts = JSON.parse(stored);
          }
          
          // Find the thought with the matching slug
          const foundThought = thoughts.find((t) => t.slug === slug);
          
          if (foundThought) {
            setThought(foundThought);
          } else {
            // If not found in localStorage, check the initial data
            const fallbackThought = initialThoughts.find((t) => t.slug === slug);
            if (fallbackThought) {
              setThought(fallbackThought);
            }
          }
        } else {
          // If we're server-side, use the initial data
          const fallbackThought = initialThoughts.find((t) => t.slug === slug);
          if (fallbackThought) {
            setThought(fallbackThought);
          }
        }
      } catch (error) {
        console.error('Error loading thought:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThought();
  }, [slug]);

  // Show 404 if thought is not found after loading
  if (!isLoading && !thought && slug) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      {isLoading || !slug ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground">Loading thought...</p>
          </div>
        </div>
      ) : thought && (
        <article className="w-full space-y-6">
          {/* Header with navigation back to thoughts */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Link 
                href="/thoughts" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to thoughts
              </Link>
            </div>
            
            <div>
              <time className="text-xs text-muted-foreground">{thought.date}</time>
              <h1 className="text-xl font-medium mt-2">{thought.title}</h1>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: thought.content }} 
          />
        </article>
      )}
    </main>
  );
} 