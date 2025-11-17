# TinaCMS Integration Setup Guide

This guide walks you through setting up and using TinaCMS with your Monumental Times website.

## Step 1: Install Dependencies

Run this command in your project directory:

```bash
npm install
```

This will install TinaCMS and required dependencies:
- `tinacms`: The headless CMS
- `@tinacms/cli`: Command-line tools for building the admin interface
- `gray-matter`: Markdown front-matter parser

## Step 2: Build the TinaCMS Admin Interface

Before running your dev server, build the admin interface:

```bash
npx tinacms init --next=false
```

Then build the admin files:

```bash
npx @tinacms/cli build
```

This generates the admin interface in your project.

## Step 3: Start Local Development

Run the development server as usual:

```bash
npm run dev
```

The admin panel will be available at: **http://localhost:5173/admin**

## Step 4: Create Articles in TinaCMS

1. Open the admin panel at `/admin`
2. Click "Blog Articles" in the sidebar
3. Click "Create Document"
4. Fill in article details:
   - **Title, Summary, Author**: Basic info
   - **Publish Date**: When article goes live
   - **Category**: Choose from predefined categories
   - **Featured Image**: Upload image (auto-stored in `/public/images/`)
   - **Breaking News**: Toggle for breaking stories
5. Write content in the rich text editor
6. Click "Save" to publish

## Article Format

Articles are saved as `.mdx` files in `/public/content/articles/`.

Example structure:
```mdx
---
title: "Article Title"
summary: "Brief summary for article grids"
author: "Author Name"
date: 2025-11-16T12:00:00
category: "Spiritual/Bible"
readTime: 5
image: "/images/article-image.png"
isBreaking: false
---

# Article Title

Your article content here. Supports markdown formatting.

- Bullet points
- Bold **text**
- Links [like this](https://example.com)
```

## Categories

Choose from these predefined categories:
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

## Image Management

1. Upload images in the TinaCMS editor
2. Images are automatically stored in `/public/images/`
3. Images are included in GitHub Pages deployment
4. Recommended formats: `.png`, `.jpg`, `.webp`
5. Keep file sizes under 2MB for faster loading

## GitHub Pages Deployment

TinaCMS content works seamlessly with GitHub Pages:

```bash
npm run deploy
```

This:
1. Builds your Vite app
2. Includes all TinaCMS articles in the build
3. Deploys everything to `gh-pages` branch

**Important**: Articles are committed to your GitHub repository. Make sure you:
- Add `/admin` to `.gitignore` (generated files)
- Commit `/public/content/articles/` folder
- Include `/public/images/` folder in version control

## Optional: TinaCMS Cloud Setup

For cloud-based visual editing and media management:

1. Create a free account at [tina.io](https://tina.io)
2. Connect your GitHub repository
3. Set environment variables in your GitHub Actions or deployment:
   ```
   VITE_TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_token_here
   ```
4. This enables:
   - Cloud-based visual editing
   - Hosted media storage
   - Collaborative editing

Without these, TinaCMS works locally for development.

## Mixing Articles

Your site now supports **two article sources**:

1. **Legacy Articles**: In `src/data/sampleData.js` (hard-coded)
2. **TinaCMS Articles**: In `/public/content/articles/` (editable via admin UI)

Both types:
- Appear in article grids
- Show in search results
- Display in the featured article section

## Building & Testing

### Local Development
```bash
npm run dev          # Start dev server with HMR
# Visit http://localhost:5173 for site
# Visit http://localhost:5173/admin for editor
```

### Production Build
```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run deploy       # Deploy to GitHub Pages
```

## Troubleshooting

### Issue: Admin panel shows 404
- Ensure `npm run dev` is running
- Admin builds automatically; wait a moment for it to generate
- Check `/admin/index.html` exists after running dev

### Issue: Articles not appearing after save
- Refresh the browser
- Check that article date is not in the future
- Verify the `.mdx` file exists in `/public/content/articles/`

### Issue: Images not displaying
- Upload images through the TinaCMS editor (not manually)
- Images are stored in `/public/images/`
- Use relative paths: `/images/filename.png`

### Issue: Deployment fails
- Ensure `/public/content/articles/` is committed to git
- Check that `.gitignore` doesn't exclude article files
- Run `npm run build` locally to verify build succeeds

## File Structure After Setup

```
monumentaltimes/
├── public/
│   ├── content/
│   │   └── articles/
│   │       ├── getting-started.mdx
│   │       └── your-articles.mdx
│   └── images/
│       └── article-images.png
├── tina/
│   └── config.ts          # TinaCMS configuration
├── src/
│   ├── utils/
│   │   └── tinacmsLoader.js
│   ├── App.jsx
│   └── main.jsx
├── package.json           # Updated with TinaCMS deps
└── vite.config.js
```

## Next Steps

1. Create your first article in the admin panel
2. Test viewing it on the home page
3. Test searching for it
4. Deploy with `npm run deploy`
5. Verify it appears on your live site

For more information, visit:
- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS GitHub](https://github.com/tinacms/tinacms)
