'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get credentials from environment variables
      const correctUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'NotEven';
      const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '#H1k2g3e4n5';

      // Validate credentials
      if (username === correctUsername && password === correctPassword) {
        // Set a cookie to indicate authentication
        // Add secure flag in production environments
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = isProduction 
          ? 'admin_auth=true; path=/; max-age=86400; SameSite=Strict; Secure' // 24 hours
          : 'admin_auth=true; path=/; max-age=86400'; // 24 hours
        
        document.cookie = cookieOptions;
        toast.success('Login successful');
        router.push('/admin');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-base font-medium hover:text-muted-foreground transition-colors">
            Gurnoor Natt
          </Link>
          <h1 className="mt-4 text-xl font-medium">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the admin area
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </main>
  );
} 