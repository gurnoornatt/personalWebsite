// Cloudflare Worker script for Next.js application
// This script doesn't rely on Node.js modules or KV storage

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const { hostname } = url;

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

      // Handle API routes (/api/*) by redirecting to subdomain
      // This prevents Worker-to-Worker communication errors (Error 1042)
      if (pathname.startsWith('/api/')) {
        // Get the base domain without subdomains (e.g., example.com from www.example.com)
        const baseDomain = hostname.split('.').slice(-2).join('.');
        
        // Build the API subdomain URL 
        const apiPath = pathname.substring(5); // Remove '/api/'
        const apiUrl = new URL(`https://api.${baseDomain}/${apiPath}${url.search}`);
        
        console.log(`Redirecting API request to: ${apiUrl.toString()}`);
        
        // Forward the request to the API subdomain
        return fetch(apiUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
      }

      // For all other routes, including dynamic routes
      const response = await fetch(request);
      
      // If the response is a 404, try serving the index page instead
      // This allows client-side routing to take over for dynamic routes
      if (response.status === 404 && !pathname.includes('.')) {
        console.log(`Handling 404 for path: ${pathname}, falling back to index.html`);
        const indexResponse = await fetch(new URL('/', url));
        return new Response(await indexResponse.text(), {
          headers: {
            'content-type': 'text/html; charset=UTF-8',
          },
        });
      }

      return response;
    } catch (e) {
      console.error(`Worker error for ${pathname}:`, e);
      return errorResponse(`Worker error: ${e.message}`);
    }
  },
}; 