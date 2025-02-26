// Cloudflare Worker script for Next.js application
// This script doesn't rely on Node.js modules or KV storage

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
      // Skip cache files completely
      if (pathname.includes('/cache/') || pathname.includes('/.next/cache/')) {
        return new Response('Not found', { status: 404 });
      }

      // Handle static assets (/_next/static/*)
      if (pathname.includes('/_next/static/') || 
          pathname.endsWith('.js') || 
          pathname.endsWith('.css') ||
          pathname.endsWith('.json') ||
          pathname.endsWith('.ico') ||
          pathname.endsWith('.png') ||
          pathname.endsWith('.jpg') ||
          pathname.endsWith('.svg')) {
        // Let Cloudflare Pages handle the static asset
        return fetch(request);
      }

      // Handle API routes (/api/*)
      if (pathname.startsWith('/api/')) {
        // Let Cloudflare Functions handle the API route
        return fetch(request);
      }

      // For all other routes, let Cloudflare Pages handle them
      return fetch(request);
    } catch (e) {
      return errorResponse(`Worker error: ${e.message}`);
    }
  },
}; 