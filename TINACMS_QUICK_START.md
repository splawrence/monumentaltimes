# TinaCMS Quick Reference

## Installation & Setup (One-time)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open admin panel
# Navigate to: http://localhost:5173/admin
```

## Creating Articles

### Via TinaCMS Admin (Easiest)
1. Open admin panel: `http://localhost:5173/admin`
2. Click "Blog Articles" → "Create Document"
3. Fill in:
   - **Title** - Article headline
   - **Summary** - Brief preview (appears in article grids)
   - **Author** - Your name
   - **Publish Date** - When article goes live
   - **Category** - Choose from dropdown
   - **Reading Time** - Estimated minutes (e.g., 5)
   - **Featured Image** - Upload a photo
   - **Breaking News** - Toggle if urgent
4. Write content in rich text editor
5. Click "Save"

### Via Code (Advanced)
1. Create `.mdx` file in `public/content/articles/`
2. Add frontmatter and content:
```mdx
---
title: "Article Title"
summary: "Short preview"
author: "Your Name"
date: 2025-11-16
category: "Spiritual/Bible"
readTime: 5
image: "/images/photo.png"
isBreaking: false
---

# Article Heading

Your content here using markdown...
```

## Article Categories

Choose from:
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

- Upload images through admin panel
- Auto-saved to `/public/images/`
- Recommended: PNG, JPG (< 2MB)
- Automatically included in GitHub Pages deployment

## Publishing to Live Site

```bash
npm run deploy
```

This:
- Builds your app
- Includes all articles and images
- Deploys to GitHub Pages
- Takes ~1-2 minutes

## File Locations

```
Your Project/
├── public/
│   ├── content/
│   │   └── articles/          ← Your .mdx files go here
│   │       └── getting-started.mdx
│   └── images/                ← Article images auto-saved here
├── src/
│   └── data/
│       └── sampleData.js       ← Legacy hard-coded articles
└── tina/
    └── config.ts              ← TinaCMS configuration
```

## Combining Article Sources

Your site automatically displays:
- **TinaCMS articles** from `public/content/articles/`
- **Legacy articles** from `src/data/sampleData.js`

Both appear in search and grids - no special setup needed!

## Development Commands

```bash
npm run dev         # Start dev server + admin panel
npm run build       # Build for production
npm run deploy      # Deploy to GitHub Pages
npm run lint        # Check for errors
npm run preview     # Preview production build locally
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin panel won't load | Make sure `npm run dev` is running, wait 5 seconds, refresh browser |
| Articles don't appear | Click Save button, clear browser cache, refresh |
| Images not showing | Upload through admin (not manually), check path is `/images/filename.png` |
| Build fails | Run `npm run build` locally to test, check console for errors |

## Optional: Enable Cloud Features

For team collaboration and cloud media hosting:

1. Create account at [tina.io](https://tina.io)
2. Connect your GitHub repo
3. Generate API keys
4. Add to your GitHub Actions secrets:
   - `VITE_TINA_CLIENT_ID`
   - `TINA_TOKEN`

Then cloud editing works on production!

## Need Help?

- Read `TINACMS_SETUP.md` for detailed instructions
- Check `TINACMS_README.md` for overview
- See `public/content/articles/getting-started.mdx` for example
- Visit [tina.io/docs](https://tina.io/docs/) for TinaCMS docs

---

**You're all set!** Start creating articles in the admin panel. 🚀
