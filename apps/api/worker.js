// API Worker for the api subdomain
// This handles all API requests and implements CORS

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Define CORS headers to allow requests from main domain
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Ideally, specify your main domain here
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400', // 24 hours
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      // Handle posts endpoints
      if (pathname === '/posts' || pathname === '/posts/') {
        if (request.method === 'GET') {
          // Example implementation - replace with your actual data fetching logic
          const posts = [
            { id: '1', title: 'First Post', content: 'This is an example post', createdAt: new Date().toISOString() },
            { id: '2', title: 'Second Post', content: 'Another example post', createdAt: new Date().toISOString() },
          ];
          
          // Return the posts with CORS headers
          return new Response(JSON.stringify(posts), {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        if (request.method === 'POST') {
          try {
            const data = await request.json();
            // Process the post creation
            // This is a mock implementation
            const newPost = {
              id: crypto.randomUUID(),
              title: data.title || 'Untitled',
              content: data.content || '',
              createdAt: new Date().toISOString()
            };
            
            return new Response(JSON.stringify(newPost), {
              status: 201,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
              }
            });
          } catch (error) {
            return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
              }
            });
          }
        }
      }

      // Handle other API endpoints here
      // ...

      // If no endpoints match, return 404
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      console.error('API worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
}; 