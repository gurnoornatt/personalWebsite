'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Twitter, Github, Linkedin, Globe, Plus, Trash } from 'lucide-react';

// Default social links
const defaultSocialLinks = [
  {
    id: '1',
    platform: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  },
  {
    id: '2',
    platform: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    id: '3',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  }
];

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export default function SocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newLink, setNewLink] = useState<SocialLink>({
    id: '',
    platform: '',
    url: '',
    icon: 'globe'
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Load social links from localStorage on component mount
  useEffect(() => {
    const loadSocialLinks = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedLinks = localStorage.getItem('socialLinks');
          if (storedLinks) {
            setSocialLinks(JSON.parse(storedLinks));
          } else {
            setSocialLinks(defaultSocialLinks);
          }
        } else {
          setSocialLinks(defaultSocialLinks);
        }
      } catch (error) {
        console.error('Error loading social links:', error);
        toast.error('Failed to load social links');
        setSocialLinks(defaultSocialLinks);
      }
    };

    loadSocialLinks();
  }, []);

  const handleSave = () => {
    setIsLoading(true);

    try {
      // Validate links
      for (const link of socialLinks) {
        if (!link.platform.trim() || !link.url.trim()) {
          toast.error('All fields are required for each social link');
          setIsLoading(false);
          return;
        }

        // Basic URL validation
        try {
          new URL(link.url);
        } catch (e) {
          toast.error(`Invalid URL for ${link.platform}`);
          setIsLoading(false);
          return;
        }
      }

      // Save to localStorage
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
      toast.success('Social links updated successfully');
    } catch (error) {
      console.error('Error saving social links:', error);
      toast.error('Failed to save social links');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default social links?')) {
      setSocialLinks(defaultSocialLinks);
      localStorage.setItem('socialLinks', JSON.stringify(defaultSocialLinks));
      toast.success('Social links reset to default');
    }
  };

  const handleAddNew = () => {
    if (!newLink.platform.trim() || !newLink.url.trim()) {
      toast.error('Platform name and URL are required');
      return;
    }

    // Basic URL validation
    try {
      new URL(newLink.url);
    } catch (e) {
      toast.error('Invalid URL');
      return;
    }

    const linkToAdd = {
      ...newLink,
      id: Date.now().toString()
    };

    setSocialLinks([...socialLinks, linkToAdd]);
    setNewLink({
      id: '',
      platform: '',
      url: '',
      icon: 'globe'
    });
    setIsAddingNew(false);
    toast.success('New social link added');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      setSocialLinks(socialLinks.filter(link => link.id !== id));
      toast.success('Social link deleted');
    }
  };

  const handleUpdateLink = (id: string, field: keyof SocialLink, value: string) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const renderIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
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
          <h1 className="text-xl font-medium">Social Links</h1>
        </div>

        {/* Social Links Form */}
        <div className="border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {renderIcon(link.icon)}
                </div>
                <Input
                  value={link.platform}
                  onChange={(e) => handleUpdateLink(link.id, 'platform', e.target.value)}
                  placeholder="Platform name"
                  className="w-1/3"
                />
                <Input
                  value={link.url}
                  onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                  placeholder="URL"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {isAddingNew ? (
            <div className="space-y-4 border border-border rounded-md p-4">
              <h3 className="text-sm font-medium">Add New Social Link</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {renderIcon(newLink.icon)}
                </div>
                <Input
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  placeholder="Platform name"
                  className="w-1/3"
                />
                <Input
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="URL"
                  className="flex-1"
                />
              </div>
              <div className="flex space-x-2">
                <Button type="button" size="sm" onClick={handleAddNew}>
                  Add
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Social Link
            </Button>
          )}

          <div className="flex space-x-2">
            <Button 
              type="button" 
              onClick={handleSave} 
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
            >
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-base font-medium">Preview</h2>
          <div className="space-y-2 p-4 bg-background rounded-md">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-4 h-4">
                  {renderIcon(link.icon)}
                </div>
                <a 
                  href={link.url} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 