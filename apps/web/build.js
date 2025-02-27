#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Print version info for debugging
console.log('Node version:', process.version);
console.log('Build script running at:', new Date().toISOString());
console.log('Current directory:', process.cwd());

// Clean previous build artifacts
console.log('\n=== Cleaning previous build artifacts ===');
try {
  if (fs.existsSync('.next')) {
    console.log('Removing .next directory...');
    fs.rmSync('.next', { recursive: true, force: true });
  }
  
  if (fs.existsSync('.vercel/output')) {
    console.log('Removing .vercel/output directory...');
    fs.rmSync('.vercel/output', { recursive: true, force: true });
  }
  
  const cacheDir = path.join('node_modules', '.cache');
  if (fs.existsSync(cacheDir)) {
    console.log('Removing node_modules/.cache directory...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }
} catch (error) {
  console.error('Error during cleanup:', error);
}

// Create a version marker file
console.log('\n=== Creating version marker ===');
fs.writeFileSync('public/version.txt', `Build date: ${new Date().toISOString()}\n`);

// Run the Next.js build
console.log('\n=== Running Next.js build ===');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 