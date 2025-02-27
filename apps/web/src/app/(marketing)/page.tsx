'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

// Version marker to verify we're seeing the latest deployment
// NEW VERSION - Updated Feb 27, 2024
console.log('Home page version: Feb 27, 2024 - NEW VERSION');

// Default profile data
const defaultProfile = {
  name: 'Gurnoor Natt - NEW VERSION',
  mainBio: 'This is the NEW VERSION of the site. If you see this, the deployment worked correctly!',
  secondaryBio: 'The old version showed text about AI-powered platform for neurodivergent children. This new version should replace that content.'
};

// Default social links
const defaultSocialLinks = [
  {
    id: '1',
    platform: 'Twitter (New Version)',
    url: 'https://twitter.com/yourhandle',
    icon: 'twitter'
  },
  {
    id: '2',
    platform: 'GitHub (New Version)',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    id: '3',
    platform: 'LinkedIn (New Version)',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  }
];

export default function Home() {
  const [profile, setProfile] = useState(defaultProfile);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        // Ensure we're in a browser environment before accessing localStorage
        if (typeof window !== 'undefined') {
          // Load profile data
          const storedProfile = localStorage.getItem('profile');
          if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
          }

          // Load social links
          const storedLinks = localStorage.getItem('socialLinks');
          if (storedLinks) {
            setSocialLinks(JSON.parse(storedLinks));
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full space-y-10">
        {/* Header with Name */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">{profile.name}</h1>
          <nav className="flex space-x-6">
            <Link href="/thoughts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Thoughts
            </Link>
            <Link href="/books" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Books
            </Link>
          </nav>
        </div>

        {/* Bio Section */}
        <div className="space-y-4">
          <p className="text-base">
            {profile.mainBio}
          </p>
          <p className="text-sm text-muted-foreground">
            {profile.secondaryBio}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-2">
          {socialLinks.map((link) => (
            <Link 
              key={link.id}
              href={link.url} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.platform}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
