'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

// Default profile data
const defaultProfile = {
  name: 'Gurnoor Natt',
  mainBio: 'An undergrad at University of San Francisco building an AI-powered platform that provides speech therapy for neurodivergent children.',
  secondaryBio: 'Software engineering bandwidth and genius ideas are the bottlenecks to rapid AI progress. My work is an attempt at solving the former. In doing so, more talent, effort, and resources can be devoted to the latter.'
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage on component mount
    try {
      if (typeof window !== 'undefined') {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Validate inputs
      if (!profile.name.trim()) {
        toast.error('Name cannot be empty');
        return;
      }

      // Save to localStorage
      localStorage.setItem('profile', JSON.stringify(profile));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setProfile(defaultProfile);
    toast.info('Profile reset to default values');
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Manage Profile</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mainBio" className="text-sm font-medium">
            Main Bio
          </label>
          <Textarea
            id="mainBio"
            name="mainBio"
            value={profile.mainBio}
            onChange={handleInputChange}
            placeholder="Your main bio"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            This is the primary bio displayed on your homepage.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="secondaryBio" className="text-sm font-medium">
            Secondary Bio
          </label>
          <Textarea
            id="secondaryBio"
            name="secondaryBio"
            value={profile.secondaryBio}
            onChange={handleInputChange}
            placeholder="Your secondary bio"
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            This is the additional information displayed below your main bio.
          </p>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="p-6 border rounded-lg bg-background">
          <h3 className="text-xl font-medium mb-4">{profile.name}</h3>
          <p className="text-base mb-2">{profile.mainBio}</p>
          <p className="text-sm text-muted-foreground">{profile.secondaryBio}</p>
        </div>
      </div>
    </div>
  );
} 