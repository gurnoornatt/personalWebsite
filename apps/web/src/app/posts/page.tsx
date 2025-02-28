"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Add Post interface
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// This prevents static generation during build
export const dynamic = 'force-dynamic';

// This prevents prerendering during build
export const runtime = 'edge';

export default function TestPostsPage() {
  // Skip authentication check during build
  if (typeof window === 'undefined') {
    return <div>Loading posts...</div>;
  }

  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive">Error loading posts</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      {data?.map((post: Post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Created: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}