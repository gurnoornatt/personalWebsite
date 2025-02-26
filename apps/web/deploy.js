// Cloudflare Pages deployment script
// This serves as an entry point for Wrangler

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Load the Next.js server from the standalone build
let nextServer;
try {
  // Try to load from the standalone output
  const serverPath = join(process.cwd(), '.next/standalone/server.js');
  if (existsSync(serverPath)) {
    // Use dynamic import to load the server
    const { default: createNextServer } = await import(serverPath);
    nextServer = createNextServer();
  } else {
    throw new Error('Next.js standalone server not found');
  }
} catch (error) {
  console.error('Failed to load Next.js server:', error);
  process.exit(1);
}

// Create a simple HTTP server that forwards requests to Next.js
const server = createServer(async (req, res) => {
  try {
    // Forward the request to the Next.js server
    await nextServer(req, res);
  } catch (err) {
    console.error('Error processing request:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

// Export a fetch handler for Cloudflare Workers
export default {
  fetch(request, env, ctx) {
    return new Promise((resolve) => {
      const url = new URL(request.url);
      
      // Create a mock request object for the Node.js HTTP server
      const mockReq = {
        method: request.method,
        url: url.pathname + url.search,
        headers: Object.fromEntries(request.headers),
        body: request.body,
      };
      
      // Create a mock response object
      const mockRes = {
        headers: new Headers(),
        chunks: [],
        statusCode: 200,
        
        setHeader(name, value) {
          this.headers.set(name, value);
        },
        
        getHeader(name) {
          return this.headers.get(name);
        },
        
        writeHead(statusCode, headers) {
          this.statusCode = statusCode;
          if (headers) {
            Object.entries(headers).forEach(([name, value]) => {
              this.headers.set(name, value);
            });
          }
        },
        
        write(chunk) {
          this.chunks.push(chunk);
        },
        
        end(chunk) {
          if (chunk) {
            this.chunks.push(chunk);
          }
          
          // Combine all chunks into a response
          const body = this.chunks.length > 0 
            ? new Uint8Array(Buffer.concat(this.chunks.map(c => Buffer.from(c)))) 
            : null;
          
          // Create the response
          const response = new Response(body, {
            status: this.statusCode,
            headers: this.headers,
          });
          
          resolve(response);
        }
      };
      
      // Process the request through the Next.js server
      server.emit('request', mockReq, mockRes);
    });
  }
}; 