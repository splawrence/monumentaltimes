# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for managing articles in Monumental Times.

---

## Prerequisites

- Sanity account (sign up at https://sanity.io)
- Node.js >=18.0.0
- npm >=8.0.0

---

## Step 1: Create a Sanity Project

### Option A: Using Sanity CLI (Recommended)

1. **Initialize a new Sanity studio:**
   ```bash
   npx @sanity/cli@latest init
   ```

2. **Follow the prompts:**
   - Choose "Create new project"
   - Give it a name (e.g., "Monumental Times Articles")
   - Choose the dataset (default: `production`)
   - Accept the default template or choose minimal
   - Choose the output path (create in a separate folder like `sanity/`)

3. **Save your Project ID and Dataset:**
   - You'll need these for environment variables

### Option B: Using Sanity Dashboard

1. Go to https://sanity.io/manage
2. Create a new project
3. Copy your project ID (you'll see it in Settings)

---

## Step 2: Configure Environment Variables

Create a `.env.local` file in the project root with your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

Example:
```env
VITE_SANITY_PROJECT_ID=abc123xyz456
VITE_SANITY_DATASET=production
```

---

## Step 3: Create the Article Schema

If you created a Sanity studio, define your article schema.

### Create `sanity/schemaTypes/article.js`:

```javascript
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Spiritual/Bible', value: 'Spiritual/Bible' },
          { title: 'Opinion/Testimony', value: 'Opinion/Testimony' },
          { title: 'News Flash', value: 'News Flash' },
          { title: 'Biography/History', value: 'Biography/History' },
          { title: 'Recipes', value: 'Recipes' },
          { title: 'Poetry & Art', value: 'Poetry & Art' },
          { title: 'Stories & Comics', value: 'Stories & Comics' },
          { title: 'Tech & Sports', value: 'Tech & Sports' },
          { title: 'Reviews', value: 'Reviews' },
          { title: 'Book Review', value: 'Book Review' },
          { title: 'Prayer', value: 'Prayer' },
          { title: 'Human Interest', value: 'Human Interest' },
          { title: 'General', value: 'General' },
        ],
      },
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      initialValue: 5,
    },
    {
      name: 'isBreaking',
      title: 'Breaking News?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
}
```

### Update `sanity/schemaTypes/index.js`:

```javascript
import article from './article'

export const schemaTypes = [article]
```

---

## Step 4: Deploy/Publish Schema

If using Sanity CLI:

```bash
cd sanity
sanity deploy
```

Then go to your Sanity project dashboard to publish the schema.

---

## Step 5: Update Your App to Fetch from Sanity

The `src/utils/sanityClient.js` already contains utilities for fetching articles. Here's how to use it in your App.jsx:

### Example: Replace article sources with Sanity

```javascript
import { useEffect, useState } from 'react'
import { fetchArticles } from './utils/sanityClient'
import { loadArticlesFromMDX } from './utils/mdxLoader'

export default function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function loadArticles() {
      // Fetch from Sanity
      const sanityArticles = await fetchArticles()
      
      // Optionally also load from MDX (legacy articles)
      const mdxArticles = await loadArticlesFromMDX()
      
      // Combine both sources
      setArticles([...sanityArticles, ...mdxArticles])
    }
    
    loadArticles()
  }, [])

  // ... rest of your component
}
```

---

## Step 6: Add Articles in Sanity Studio

If you set up a Sanity studio:

```bash
cd sanity
npm run dev
```

Visit `http://localhost:3333` to access your Sanity Studio and create articles.

---

## Available Sanity Client Functions

### Fetch all articles:
```javascript
import { fetchArticles } from './utils/sanityClient'

const articles = await fetchArticles()
```

### Fetch a single article:
```javascript
import { fetchArticleById } from './utils/sanityClient'

const article = await fetchArticleById('article-id')
```

### Search articles:
```javascript
import { searchArticles } from './utils/sanityClient'

const results = await searchArticles('spiritual')
```

### Generate image URLs:
```javascript
import { urlFor } from './utils/sanityClient'

const imageUrl = urlFor(article.image).width(800).url()
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_SANITY_PROJECT_ID` | Yes | `'your-project-id'` | Your Sanity project ID |
| `VITE_SANITY_DATASET` | No | `'production'` | Dataset name |

---

## Switching CDN Mode

In `src/utils/sanityClient.js`, find this line:

```javascript
useCdn: true, // Set to false for real-time updates during development
```

- **`useCdn: true`** — Use content delivery network (faster, but slight cache delay)
- **`useCdn: false`** — Always get latest content (use during development)

---

## Troubleshooting

### "Error fetching articles from Sanity"
- Check your `VITE_SANITY_PROJECT_ID` is correct
- Verify your dataset exists in Sanity dashboard
- Ensure Sanity allows API access (check Settings → API)

### Articles not showing up
- Make sure articles are published (not drafts)
- Check that articles match the schema
- Verify your GROQ queries are correct

### Images not loading
- Images must be uploaded to Sanity, not external URLs
- Use `urlFor()` to generate proper image URLs
- Check image field configuration in schema

---

## Next Steps

1. Create your Sanity project at https://sanity.io
2. Add your credentials to `.env.local`
3. Define your article schema
4. Deploy schema to Sanity
5. Start adding articles via Sanity Studio
6. Update your App.jsx to call `fetchArticles()`

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Client Reference](https://www.sanity.io/docs/client-libraries/js-client)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URL Builder](https://www.sanity.io/docs/image-url)
