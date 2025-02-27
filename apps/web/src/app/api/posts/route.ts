import { NextResponse } from 'next/server';
import { getPosts as getPostsFromService } from '@/api/posts.api';

// GET /api/posts
export async function GET() {
  try {
    // In a real implementation, you'd call your database or service
    // For now, we'll return sample data
    const posts = [
      { id: '1', title: 'First Post', content: 'This is an example post', createdAt: new Date().toISOString() },
      { id: '2', title: 'Second Post', content: 'Another example post', createdAt: new Date().toISOString() },
    ];
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, you'd save to a database
    // For now, we'll just return the created post with a generated ID
    const newPost = {
      id: Math.random().toString(36).substring(2, 9),
      title: body.title,
      content: body.content,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 