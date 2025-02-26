'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle, BookOpen, MessageSquare, Share2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = document.cookie.includes('admin_auth=true');
    if (!adminAuth) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the admin_auth cookie with appropriate options for all environments
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = isProduction
      ? 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure'
      : 'admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    
    document.cookie = cookieOptions;
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  const handleExportData = () => {
    try {
      if (typeof window === "undefined") return;
      
      const data = {
        profile: localStorage.getItem("profile"),
        books: localStorage.getItem("books"),
        thoughts: localStorage.getItem("thoughts"),
        socialLinks: localStorage.getItem("socialLinks"),
      };
      
      const dataStr = JSON.stringify(data);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `personal-website-backup-${new Date().toISOString().split("T")[0]}.json`;
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          
          if (typeof window === "undefined") return;
          
          if (data.profile) localStorage.setItem("profile", data.profile);
          if (data.books) localStorage.setItem("books", data.books);
          if (data.thoughts) localStorage.setItem("thoughts", data.thoughts);
          if (data.socialLinks) localStorage.setItem("socialLinks", data.socialLinks);
          
          toast.success("Data imported successfully");
          // Reset the file input
          event.target.value = "";
        } catch (error) {
          console.error("Error parsing import file:", error);
          toast.error("Failed to import data: Invalid file format");
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Error importing data:", error);
      toast.error("Failed to import data");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/profile" className="block">
          <Card className="h-full transition-all hover:border-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCircle className="h-5 w-5 mr-2" />
                Profile
              </CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Edit your name, bio, and other personal details displayed on your homepage.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Manage Profile
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/admin/thoughts" className="block">
          <Card className="h-full transition-all hover:border-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Thoughts
              </CardTitle>
              <CardDescription>
                Manage your thoughts and articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add, edit, or delete thoughts that appear in the thoughts section of your website.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Manage Thoughts
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/admin/books" className="block">
          <Card className="h-full transition-all hover:border-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Books
              </CardTitle>
              <CardDescription>
                Manage your book collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add, edit, or delete books that you've read or are currently reading.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Manage Books
              </Button>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/admin/social" className="block">
          <Card className="h-full transition-all hover:border-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Social Links
              </CardTitle>
              <CardDescription>
                Manage your social media links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add, edit, or delete links to your social media profiles displayed on your homepage.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                Manage Social Links
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export or import your website data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleExportData}>
                Export Data
              </Button>
              <div>
                <input
                  type="file"
                  id="import-data"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportData}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("import-data")?.click()}
                >
                  Import Data
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Use these options to back up your website data or restore from a previous backup.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Link href="/">
          <Button variant="outline">
            View Website
          </Button>
        </Link>
      </div>
    </div>
  );
} 