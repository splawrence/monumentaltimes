#!/usr/bin/env node

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4001;

console.log("Starting Monumental Times server...");

const app = express();

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve TinaCMS admin if it exists
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Simple API endpoint to get articles (for admin interface)
app.get('/api/articles', (req, res) => {
  // This could be enhanced to read from MDX files dynamically
  res.json({ message: "Articles API - TinaCMS admin can use this endpoint" });
});

// Fallback to index.html for SPA routing (exclude API routes)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Website available at http://localhost:${PORT}`);
  console.log(`✓ Admin interface at http://localhost:${PORT}/admin`);
});