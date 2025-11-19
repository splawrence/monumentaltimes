# Railway Deployment Guide for Monumental Times

## Overview

This guide will help you deploy Monumental Times to Railway with full TinaCMS functionality.

## Prerequisites

1. A Railway account
2. A TinaCMS Cloud account (for content management)
3. Your repository connected to Railway

## Step 1: Set Up TinaCMS Cloud

1. Go to [TinaCMS Cloud](https://app.tina.io)
2. Create an account and connect your GitHub repository
3. Create a new project and note down:
   - `VITE_TINA_CLIENT_ID` (from project settings)
   - `TINA_TOKEN` (from project settings)

## Step 2: Configure Railway Environment Variables

In your Railway project dashboard:

1. Go to your service settings
2. Click on the "Variables" tab
3. Add the following environment variables:

```
VITE_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
NODE_ENV=production
```

## Step 3: Deploy

1. Push your changes to GitHub
2. Railway will automatically detect the changes and start building
3. The deployment will:
   - Install dependencies
   - Build the Vite frontend
   - Build TinaCMS admin interface
   - Start the production server

## Step 4: Verify Deployment

1. Once deployed, visit your Railway URL
2. The main site should load normally
3. Visit `/admin` to access the TinaCMS admin interface
4. You should be able to edit content through the admin panel

## Architecture

The deployed application includes:

- **Frontend**: React + Vite application served as static files
- **Backend**: TinaCMS server providing API endpoints for content management
- **Admin Interface**: TinaCMS admin panel accessible at `/admin`

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure TINA_TOKEN has proper permissions for your repository

### Admin Panel Not Working

- Verify VITE_TINA_CLIENT_ID is correct
- Check that TinaCMS Cloud project is connected to the right repository
- Ensure the repository branch matches what's configured in TinaCMS

### Content Not Saving

- Check TINA_TOKEN permissions
- Verify the repository has proper write access
- Check Railway logs for any error messages

## File Structure Changes for Railway

Key files added/modified for Railway deployment:

- `server.js` - Production server combining static file serving and TinaCMS API
- `railway.json` - Railway configuration
- `nixpacks.toml` - Build configuration
- `.env.railway` - Environment variables template
- Updated `package.json` with production scripts and dependencies

## Local Development vs Production

- **Local**: Uses `tinacms dev` command with Vite dev server
- **Production**: Uses custom Node.js server that serves built files and TinaCMS API

## Support

For issues specific to:
- **Railway deployment**: Check Railway documentation and logs
- **TinaCMS**: Check TinaCMS documentation and your cloud dashboard
- **This application**: Refer to the main README.md and documentation files