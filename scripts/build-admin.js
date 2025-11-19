#!/usr/bin/env node

/**
 * Build script for TinaCMS admin interface
 * This creates a basic admin interface that can work locally without cloud credentials
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminDir = path.join(__dirname, '..', 'admin');
const publicAdminDir = path.join(__dirname, '..', 'public', 'admin');

console.log('Building TinaCMS admin interface...');

// Create admin directory if it doesn't exist
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

// Copy admin files from public/admin to admin/ (built location)
if (fs.existsSync(publicAdminDir)) {
  console.log('Copying admin files from public/admin...');
  
  const copyRecursive = (src, dest) => {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      files.forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  copyRecursive(publicAdminDir, adminDir);
  console.log('✓ Admin files copied successfully');
} else {
  // Create a basic admin interface
  console.log('Creating basic admin interface...');
  
  const adminHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monumental Times Admin</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2563eb;
            margin-bottom: 30px;
        }
        .info-box {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .feature-list li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
        }
        .btn {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
        }
        .btn:hover {
            background: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏛️ Monumental Times Admin</h1>
        
        <div class="info-box">
            <h3>Admin Interface Ready</h3>
            <p>Your Monumental Times admin interface is now available on Railway!</p>
        </div>

        <h3>Current Features:</h3>
        <ul class="feature-list">
            <li>Static website deployment</li>
            <li>Article management via MDX files</li>
            <li>Responsive design</li>
            <li>Search functionality</li>
        </ul>

        <h3>To Enable Full CMS Features:</h3>
        <p>Set up TinaCMS Cloud credentials in your Railway environment variables:</p>
        <ul>
            <li><code>VITE_TINA_CLIENT_ID</code> - Your TinaCMS client ID</li>
            <li><code>TINA_TOKEN</code> - Your TinaCMS API token</li>
        </ul>

        <a href="/" class="btn">← Back to Website</a>
        <a href="https://app.tina.io" class="btn" target="_blank">Set up TinaCMS Cloud</a>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(adminDir, 'index.html'), adminHTML);
  console.log('✓ Basic admin interface created');
}

console.log('✓ TinaCMS admin build completed');