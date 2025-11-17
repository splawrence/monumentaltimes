# TinaCMS Integration with Monumental Times

## What Was Added

Your React + Vite app now includes TinaCMS, a Git-backed headless CMS that allows you to create and edit blog articles through a visual admin interface.

## Key Features

✅ **Visual Article Editor** - Create and edit articles without touching code  
✅ **Image Upload** - Upload featured images that auto-save to your repo  
✅ **Markdown Content** - Articles stored as `.mdx` files in version control  
✅ **GitHub Pages Compatible** - Works seamlessly with your existing deployment  
✅ **Searchable** - All TinaCMS articles appear in site search  
✅ **No Database** - Pure static files, nothing external to manage  

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Admin Panel
Open your browser to: **http://localhost:5173/admin**

### 4. Create Your First Article
- Click "Blog Articles" → "Create Document"
- Fill in Title, Author, Content, Image, etc.
- Click Save

## Files Changed/Added

### New Files
- `tina/config.ts` - TinaCMS schema configuration
- `src/utils/tinacmsLoader.js` - Utility to load articles from TinaCMS
- `public/content/articles/` - Directory for all article files
- `public/content/articles/getting-started.mdx` - Example article
- `TINACMS_SETUP.md` - Detailed setup guide

### Modified Files
- `package.json` - Added tinacms, @tinacms/cli, gray-matter dependencies
- `src/main.jsx` - Wrapped App with TinaProvider for visual editing
- `vite.config.js` - Added build configuration for TinaCMS

## Your Article Structure

Each article is a `.mdx` file with frontmatter metadata:

```mdx
---
title: "My Article Title"
summary: "Brief description for grids"
author: "Your Name"
date: 2025-11-16
category: "Spiritual/Bible"
readTime: 4
image: "/images/my-image.png"
isBreaking: false
---

# Article Content Here

Your article body with markdown formatting...
```

## Deployment to GitHub Pages

Articles are deployed just like always:

```bash
npm run deploy
```

**Important**: Make sure to commit the `public/content/articles/` folder and images to git!

## Categories Available

- Spiritual/Bible
- Opinion/Testimony
- News Flash
- Biography/History
- Recipes
- Poetry & Art
- Stories & Comics
- Tech & Sports
- Reviews
- Book review
- Prayer
- Poetry
- Stories
- Human interest

## Search Integration

TinaCMS articles automatically:
- Appear in article grids
- Show in search results (filtered by title, summary, author, category, content)
- Integrate with your existing sampleData articles

## Cloud Features (Optional)

For cloud-based editing and media hosting:
1. Sign up at [tina.io](https://tina.io)
2. Connect your GitHub repo
3. Set environment variables: `VITE_TINA_CLIENT_ID` and `TINA_TOKEN`

Without these, TinaCMS works locally for development.

## Next Steps

→ Read `TINACMS_SETUP.md` for detailed setup instructions  
→ Check `public/content/articles/getting-started.mdx` for an example  
→ Create your first article in the admin panel at `/admin`  

## Troubleshooting

**Admin panel not loading?**
- Make sure `npm run dev` is running
- Visit `http://localhost:5173/admin`
- Clear browser cache if needed

**Articles not showing?**
- Ensure you clicked "Save"
- Check browser console for errors
- Refresh the page

**Images not uploading?**
- Upload through the TinaCMS editor, not manually
- They auto-save to `/public/images/`

For more help, see `TINACMS_SETUP.md` or visit [tina.io/docs](https://tina.io/docs/)
