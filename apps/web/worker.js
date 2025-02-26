// Cloudflare Worker script for Next.js application
// This script doesn't rely on Node.js modules

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Helper to return a Response with an error
    function errorResponse(message, status = 500) {
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // Handle static assets (/_next/static/*)
      if (pathname.includes('/_next/static/')) {
        // Cloudflare Pages will handle this automatically
        return fetch(request);
      }

      // Handle API routes (/api/*)
      if (pathname.startsWith('/api/')) {
        // Fetch the API route - this would be a separate Cloudflare Function
        // Cloudflare Pages function routing will handle this
        return fetch(request);
      }

      // For all other routes, let Cloudflare Pages handle them
      return fetch(request);
    } catch (e) {
      return errorResponse(`Worker error: ${e.message}`);
    }
  },
}; 