# Recommended .gitignore additions for TinaCMS

Add these lines to your `.gitignore` file (if it exists) to exclude unnecessary files while keeping your articles and images:

```gitignore
# TinaCMS generated files (safe to exclude - generated at build time)
/admin/
/.tina/

# Node modules
node_modules/

# Build output
dist/
.vite/

# Environment variables (but DO commit articles and images)
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

## Important Files to KEEP in Git

Make sure these files ARE committed to your repository:

```gitignore
# ✅ DO COMMIT THESE:
# public/content/articles/     ← Your articles
# public/images/               ← Your article images
# tina/config.ts              ← TinaCMS config
# src/utils/tinacmsLoader.js  ← Article loading utility
```

## Current Recommended .gitignore

Here's a complete recommended `.gitignore` file for your project:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

# TinaCMS generated files
/admin/
/.tina/

# Environment
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## Command to Update .gitignore

If you want to create/update it from command line:

```bash
# Check if .gitignore exists
cat .gitignore

# Or create a new one with TinaCMS entries
echo "# TinaCMS" >> .gitignore
echo "/admin/" >> .gitignore
echo "/.tina/" >> .gitignore
```

## Verify Your Setup

After updating .gitignore, check that these ARE tracked:

```bash
# These should show up in git:
git status
# Look for:
# - public/content/articles/
# - public/images/
# - tina/config.ts
# - src/utils/tinacmsLoader.js
```

If you've already committed files and need to update:

```bash
# Remove items that were accidentally committed
git rm -r --cached admin/
git rm -r --cached .tina/

# Commit the .gitignore changes
git add .gitignore
git commit -m "Update .gitignore for TinaCMS"
```
