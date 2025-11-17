# Monumental Times - AI Coding Agent Instructions

## Project Overview

**Monumental Times** is a React + Vite newspaper website focused on spiritual, lifestyle, and community content. The site features a NYT-style layout with featured articles, article grids, search functionality, and about/policies pages. It uses GitHub Pages for deployment via `gh-pages`.

**Key Architecture**: Single-page app with state-driven modal/view switching in `App.jsx`. Articles come from two sources:
1. **Legacy articles**: Hard-coded in `src/data/sampleData.js`
2. **TinaCMS articles**: Editable via admin UI, stored as `.mdx` files in `public/content/articles/`

---

## Critical Developer Workflows

### Build & Deploy
- **Local dev**: `npm run dev` (Vite dev server + TinaCMS admin at `/admin`)
- **Build**: `npm run build` (outputs to `dist/`)
- **Deploy to GitHub Pages**: `npm run deploy` (runs predeploy build, then `gh-pages -d dist`)
- **Linting**: `npm lint` (ESLint check)

### Adding Articles - Two Methods

#### Method 1: Code-Based (Legacy)
1. Add article object to `sampleArticles` array in `src/data/sampleData.js`
2. Import any new images at the top of `sampleData.js`
3. Include required fields: `id, title, summary, author, timestamp, image, category, readTime, content`

#### Method 2: TinaCMS Admin (Recommended)
1. Run `npm run dev`
2. Visit `http://localhost:5173/admin`
3. Click "Blog Articles" → "Create Document"
4. Fill in metadata (title, author, date, image, category, etc.)
5. Write content in rich text editor
6. Click Save

Both methods automatically appear in search and article grids.

---

## Architecture & Data Flow

### Component Hierarchy
```
App.jsx (state hub)
├── Header (search handler, navigation)
├── FeaturedArticle (single large article card)
├── CanvaEmbed (embedded design element)
├── ArticleGrid (reusable grid layout)
│   └── ArticleCard (individual article preview)
├── Sidebar (secondary featured articles)
├── ArticleView (modal for full article display)
├── AboutUs (modal page)
├── Policies (modal page)
└── SearchResults (modal with filtered articles)
```

### State Management (App.jsx)
- **selectedArticle**: Currently viewed article (ArticleView modal)
- **showAbout, showPolicies, showSearchResults**: Boolean toggles for modal pages
- **searchQuery, searchResults**: Search state

**Pattern**: Click article → `setSelectedArticle()` → ArticleView renders modal overlay

### Data Structure (Article Objects)
```javascript
{
  id: number | string,
  title: string,
  summary: string (brief preview),
  author: string,
  timestamp: Date,
  image: imported image asset | string path,
  category: string (e.g., "Spiritual/Bible", "Opinion/Testimony"),
  readTime: number (minutes),
  isBreaking: boolean (optional, shows red label),
  content: string (full article body),
  source: 'sampleData' | 'tinacms' (optional, for tracking origin)
}
```

### TinaCMS Integration

TinaCMS articles are stored as `.mdx` files with YAML frontmatter in `public/content/articles/`:

```mdx
---
title: "Article Title"
summary: "Brief summary"
author: "Author Name"
date: 2025-11-16
category: "Spiritual/Bible"
readTime: 5
image: "/images/filename.png"
isBreaking: false
---

# Article content here

Markdown formatted content...
```

---

## Project-Specific Conventions

### Component Pattern
- **Functional components** with hooks
- **PropTypes validation** on all components (see `ArticleCard.jsx`, `ArticleGrid.jsx`)
- **CSS Modules equivalent**: Each component has matching `.css` file with BEM-like naming
  - Example: `article-card__image`, `article-card--${size}` (size variants)
- **Callback props** for click handlers (`onArticleClick`, `onSearch`)

### Styling Conventions
- BEM-like classes: `component__element` and `component--variant`
- Responsive: Media queries in CSS (breakpoint ~768px for mobile/desktop toggle)
- Search input visibility controlled by `isSearchOpen` state; hidden on mobile unless toggled
- All components use relative sizing/flexbox (not fixed pixels where possible)

### Data Updates

**Legacy Articles**:
- Edit `src/data/sampleData.js` directly
- Images must be imported at top of file to bundle with Vite

**TinaCMS Articles**:
- Use admin panel at `/admin` for creation/editing
- Articles auto-save to `public/content/articles/`
- Images auto-upload to `public/images/`
- No code changes needed

**Search Implementation**: Filter logic in `App.jsx` `handleSearch()` checks `title`, `summary`, `category`, `author`, `content` (case-insensitive substring match). Works on both article sources.

---

## Important Integration Points

### Header Component
- Accepts `onSearch`, `onAboutClick`, `onPoliciesClick` callbacks
- Manages its own state: `isMenuOpen`, `searchQuery`, `isSearchOpen`
- Hamburger menu for mobile nav; search bar responsive
- Currently no links to About/Policies in nav (moved to footer)

### ArticleCard & ArticleGrid
- **ArticleCard**: Displays timestamp as relative time ("5m ago", "Oct 13") using `formatTimestamp()` helper
- **ArticleGrid**: Accepts `columns` prop (default 3) for responsive grid layout
- Both use `onClick` callback to bubble article selection to parent App

### CanvaEmbed Component
- Renders embedded Canva design (visual element between featured article and main content)
- Placeholder component—content/source varies

### Modal Pages (AboutUs, Policies, SearchResults)
- All receive close handler callback
- Render conditionally based on App state
- **Policies.jsx**: Contains hardcoded placeholder text; edit HTML directly to update policies
- Non-technical users should edit Policies via comments in code (see README.md guide)

### TinaCMS Provider (main.jsx)
- Conditionally wraps App if `VITE_TINA_CLIENT_ID` environment variable is set
- Falls back to normal React rendering if TinaCMS not configured
- Enables visual editing capabilities when cloud features are set up

---

## Key Files & Examples

| File | Purpose | Example Pattern |
|------|---------|-----------------|
| `src/App.jsx` | State hub, routing logic | `const [selectedArticle, setSelectedArticle] = useState(null)` |
| `src/data/sampleData.js` | Legacy hard-coded articles | Import images, export arrays |
| `public/content/articles/` | TinaCMS articles directory | `.mdx` files with YAML frontmatter |
| `tina/config.ts` | TinaCMS schema & configuration | Article fields, categories, media settings |
| `src/utils/tinacmsLoader.js` | Utility for loading TinaCMS articles | `loadTinaCMSArticles()`, `parseMDXFile()` |
| `src/components/ArticleCard.jsx` | Reusable article preview | PropTypes validation, timestamp formatting |
| `src/components/Header.jsx` | Search + navigation | Responsive state toggle (`isSearchOpen`) |
| `src/components/Policies.jsx` | Editorial content | JSX with HTML tags for editing |

---

## Common Tasks

### Add New Article via TinaCMS (Recommended)
1. Run `npm run dev`
2. Open `http://localhost:5173/admin`
3. Click "Blog Articles" → "Create Document"
4. Fill in fields and write content
5. Click Save

### Add New Article via Code (Legacy)
1. Open `src/data/sampleData.js`
2. Import image asset at top: `import newImg from '../assets/new-image.png'`
3. Add object to `sampleArticles` array with all required fields
4. Article appears in grids and becomes searchable immediately

### Upload Images
- **TinaCMS**: Upload through admin UI at `/admin` → auto-saves to `public/images/`
- **Legacy**: Place image in `src/assets/`, import at top of `sampleData.js`

### Update Policies Page
Edit JSX in `src/components/Policies.jsx` (users can edit `<h3>` and `<p>` content directly)

### Change Grid Layout
Pass `columns` prop to `ArticleGrid`: `<ArticleGrid articles={articles} columns={2} />`

### Adjust Responsive Breakpoint
Edit CSS in component files or `src/index.css`. Currently mobile breakpoint is `768px`

---

## Notable Practices to Avoid

- **Don't**: Add state at component level when it affects multiple views (use App.jsx)
- **Don't**: Create new data sources—use either `sampleData.js` or TinaCMS admin
- **Don't**: Use inline styles; maintain CSS files for consistency
- **Don't**: Import images without adding to top of `sampleData.js` (legacy articles only; TinaCMS handles this automatically)
- **Don't**: Manually edit `.mdx` files in `public/content/articles/` in production—use TinaCMS admin UI

---

## Deployment Notes

- **Base path**: Set to `/` in `vite.config.js` (adjust if deploying to subdirectory)
- **gh-pages** is configured to deploy `dist/` folder to GitHub Pages
- **CNAME file** exists in `public/` for custom domain support
- **Pre-deploy step**: Runs `npm run build` automatically before `gh-pages` push
- **TinaCMS articles**: Must commit `public/content/articles/` folder to git for deployment
- **Images**: Include `public/images/` in version control

---

## TinaCMS Features

### Categories Available
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

### Cloud Setup (Optional)
For cloud-based visual editing and media hosting:
1. Create account at [tina.io](https://tina.io)
2. Connect GitHub repo
3. Set environment: `VITE_TINA_CLIENT_ID` and `TINA_TOKEN`
4. Enables cloud features without local setup

### Local Development
TinaCMS admin works offline in development. No cloud setup required.

---

## Resources

- `TINACMS_README.md` - Quick start and overview
- `TINACMS_SETUP.md` - Detailed setup and troubleshooting
- `public/content/articles/getting-started.mdx` - Example article


### ArticleCard & ArticleGrid
- **ArticleCard**: Displays timestamp as relative time ("5m ago", "Oct 13") using `formatTimestamp()` helper
- **ArticleGrid**: Accepts `columns` prop (default 3) for responsive grid layout
- Both use `onClick` callback to bubble article selection to parent App

### CanvaEmbed Component
- Renders embedded Canva design (visual element between featured article and main content)
- Placeholder component—content/source varies

### Modal Pages (AboutUs, Policies, SearchResults)
- All receive close handler callback
- Render conditionally based on App state
- **Policies.jsx**: Contains hardcoded placeholder text; edit HTML directly to update policies
- Non-technical users should edit Policies via comments in code (see README.md guide)

---

## Key Files & Examples

| File | Purpose | Example Pattern |
|------|---------|-----------------|
| `src/App.jsx` | State hub, routing logic | `const [selectedArticle, setSelectedArticle] = useState(null)` |
| `src/data/sampleData.js` | All article content | Import images, export arrays (`featuredArticle`, `sampleArticles`, etc.) |
| `src/components/ArticleCard.jsx` | Reusable article preview | PropTypes validation, timestamp formatting |
| `src/components/Header.jsx` | Search + navigation | Responsive state toggle (`isSearchOpen`) |
| `src/components/Policies.jsx` | Editorial content | JSX with HTML tags for non-technical editing |

---

## Common Tasks

### Add New Article
1. Open `src/data/sampleData.js`
2. Import image asset at top: `import newImg from '../assets/new-image.png'`
3. Add object to `sampleArticles` array with all required fields
4. Article appears in grids and becomes searchable immediately

### Update Policies Page
Edit JSX in `src/components/Policies.jsx` (users can edit `<h3>` and `<p>` content directly; see README.md instructions)

### Change Grid Layout
Pass `columns` prop to `ArticleGrid`: `<ArticleGrid articles={articles} columns={2} />`

### Adjust Responsive Breakpoint
Edit CSS in component files or `src/index.css`. Currently mobile breakpoint is `768px` (see `Header.jsx` and CSS files)

---

## Notable Practices to Avoid

- **Don't**: Add state at component level when it affects multiple views (use App.jsx)
- **Don't**: Create new data sources—all articles must route through `sampleData.js`
- **Don't**: Use inline styles; maintain CSS files for consistency
- **Don't**: Import images without adding to top of `sampleData.js` (Vite won't bundle them correctly)

---

## Deployment Notes

- **Base path**: Set to `/` in `vite.config.js` (adjust if deploying to subdirectory)
- **gh-pages** is configured to deploy `dist/` folder to GitHub Pages
- **CNAME file** exists in `public/` for custom domain support
- **Pre-deploy step**: Runs `npm run build` automatically before `gh-pages` push
