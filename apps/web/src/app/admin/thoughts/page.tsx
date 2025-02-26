'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Pencil, Trash, Plus, Calendar } from 'lucide-react';

// Sample thoughts data - in a real app, this would come from a database or CMS
const initialThoughts = [
  {
    id: "1",
    title: "The Future of AI in Speech Therapy",
    excerpt: "How AI can revolutionize speech therapy for neurodivergent children...",
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
    excerpt: "The importance of accessibility in technology development...",
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
  excerpt: string;
  content: string;
  date: string;
  slug: string;
}

// Get thoughts from localStorage or use initial data
const getStoredThoughts = (): Thought[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('thoughts');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored thoughts', e);
      }
    }
  }
  return initialThoughts;
};

export default function ManageThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentThought, setCurrentThought] = useState<Thought>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    date: '',
    slug: ''
  });
  const [contentPreview, setContentPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Load thoughts from localStorage on component mount
  useEffect(() => {
    setThoughts(getStoredThoughts());
  }, []);

  // Save thoughts to localStorage whenever they change
  useEffect(() => {
    if (thoughts.length > 0) {
      localStorage.setItem('thoughts', JSON.stringify(thoughts));
    }
  }, [thoughts]);

  const handleEdit = (thought: Thought) => {
    setCurrentThought(thought);
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this thought?')) {
      setThoughts(thoughts.filter(thought => thought.id !== id));
      toast.success('Thought deleted');
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentThought.title || !currentThought.excerpt || !currentThought.content) {
      toast.error('Title, excerpt, and content are required');
      return;
    }

    // Ensure date is set - default to today if not provided
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    if (currentThought.id) {
      // Update existing thought
      const title = currentThought.title;
      const updatedThought: Thought = {
        id: currentThought.id,
        title: title,
        excerpt: currentThought.excerpt,
        content: currentThought.content,
        date: currentThought.date || today,
        slug: currentThought.slug || generateSlug(title)
      };
      
      setThoughts(thoughts.map(thought => 
        thought.id === currentThought.id ? updatedThought : thought
      ));
      toast.success('Thought updated');
    } else {
      // Add new thought
      const title = currentThought.title;
      const newThought: Thought = {
        id: Date.now().toString(),
        title: title,
        excerpt: currentThought.excerpt,
        content: currentThought.content,
        date: currentThought.date || today,
        slug: generateSlug(title)
      };
      setThoughts([...thoughts, newThought]);
      toast.success('Thought created');
    }
    
    setIsEditing(false);
    setCurrentThought({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      date: '',
      slug: ''
    });
    setShowPreview(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentThought({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      date: '',
      slug: ''
    });
    setShowPreview(false);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    setContentPreview(currentThought.content);
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full space-y-10">
        {/* Header with navigation back to admin */}
        <div className="flex justify-between items-center">
          <Link href="/admin" className="text-base font-medium hover:text-muted-foreground transition-colors">
            Admin
          </Link>
          <h1 className="text-xl font-medium">Manage Thoughts</h1>
        </div>

        {/* Add New Button */}
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Thought
          </Button>
        )}

        {/* Edit Form */}
        {isEditing && (
          <div className="border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-base font-medium">
              {currentThought.id ? 'Edit Thought' : 'Add New Thought'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={currentThought.title}
                  onChange={(e) => setCurrentThought({...currentThought, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={currentThought.date}
                  onChange={(e) => setCurrentThought({...currentThought, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Excerpt
                </label>
                <Textarea
                  id="excerpt"
                  value={currentThought.excerpt}
                  onChange={(e) => setCurrentThought({...currentThought, excerpt: e.target.value})}
                  required
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content (HTML)
                  </label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={togglePreview}
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </Button>
                </div>
                
                {showPreview ? (
                  <div 
                    className="prose prose-invert prose-sm max-w-none border border-border rounded-md p-4 min-h-[200px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: contentPreview || '' }} 
                  />
                ) : (
                  <Textarea
                    id="content"
                    value={currentThought.content}
                    onChange={(e) => setCurrentThought({...currentThought, content: e.target.value})}
                    required
                    rows={10}
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">
                  Slug (URL path)
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="slug"
                    value={currentThought.slug}
                    onChange={(e) => setCurrentThought({...currentThought, slug: e.target.value})}
                    placeholder="auto-generated-from-title"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setCurrentThought({
                      ...currentThought, 
                      slug: generateSlug(currentThought.title)
                    })}
                    title="Generate slug from title"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty to auto-generate from title
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">
                  {currentThought.id ? 'Update' : 'Create'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Thoughts List */}
        {!isEditing && (
          <div className="space-y-4">
            {thoughts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No thoughts added yet. Click "Add New Thought" to get started.
              </div>
            ) : (
              thoughts.map((thought) => (
                <div key={thought.id} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">{thought.title}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground">{thought.date}</p>
                        <p className="text-xs text-muted-foreground">/{thought.slug}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(thought)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleDelete(thought.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{thought.excerpt}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
} 