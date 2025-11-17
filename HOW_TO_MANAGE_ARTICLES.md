# How to Manage Your Blog Articles - Simple Guide

> **For Content Creators & Editors** - No coding knowledge required!

## What is TinaCMS?

TinaCMS is your blog's **content management system** - think of it as a simple editor (like Microsoft Word) built right into your website. It lets you create, edit, and organize articles without writing any code.

---

## Required Tools & Installation (Mac Users)

Before you can use TinaCMS to manage articles, you need to install a few tools on your Mac. Don't worry - this is a one-time setup!

### What You Need

1. **Node.js & npm** - The runtime environment that powers the blog
2. **Git** - Version control system to save and publish your work
3. **A Code Editor** (Optional but helpful) - VS Code is recommended
4. **A Web Browser** - You probably already have this (Chrome, Firefox, Safari, or Edge)

### Automated Installation (Recommended) ⚡

**The easiest way:** Run our automated setup script that installs everything for you!

**Steps:**
1. Open **Terminal** (press `Cmd+Space`, type "Terminal", press Enter)
2. Copy and paste this command, then press Enter:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/splawrence/monumentaltimes/master/setup-mac.sh | bash
   ```
3. Follow the on-screen prompts
4. Enter your Mac password when asked
5. Answer "yes" when asked if you want to install VS Code (recommended)
6. Answer "yes" when asked if you want to clone the project

**That's it!** The script will install everything and set up the project automatically.

**What the script does:**
- ✅ Installs Homebrew (if not already installed)
- ✅ Installs Node.js & npm
- ✅ Installs Git and configures it
- ✅ Optionally installs VS Code
- ✅ Clones the project repository
- ✅ Installs all project dependencies
- ✅ Verifies everything is working

**Alternative:** If you prefer to run the script from the downloaded project:
```bash
cd ~/Documents/monumentaltimes
chmod +x setup-mac.sh
./setup-mac.sh
```

---

### Manual Installation (If You Prefer Step-by-Step)

#### 1. Install Homebrew (Package Manager)

Homebrew makes installing other tools easy. It's like an App Store for developer tools.

**Steps:**
1. Open **Terminal** (press `Cmd+Space`, type "Terminal", press Enter)
2. Copy and paste this command, then press Enter:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Follow the on-screen prompts (you may need to enter your Mac password)
4. Wait for installation to complete (this may take a few minutes)

**Verify it worked:**
```bash
brew --version
```
You should see something like `Homebrew 4.x.x`

---

#### 2. Install Node.js & npm

Node.js runs the development server, and npm manages the blog's dependencies.

**Steps:**
1. In Terminal, run:
   ```bash
   brew install node
   ```
2. Wait for installation to complete

**Verify it worked:**
```bash
node --version
npm --version
```
You should see version numbers like `v20.x.x` and `10.x.x`

---

#### 3. Install Git

Git tracks changes to your articles and helps publish them to the live website.

**Steps:**
1. In Terminal, run:
   ```bash
   brew install git
   ```
2. Wait for installation to complete

3. Configure Git with your name and email:
   ```bash
   git config --global user.name "tikvah02"
   git config --global user.email "tikvah2002@gmail.com"
   ```
   (Use the email associated with your GitHub account)

**Verify it worked:**
```bash
git --version
```
You should see something like `git version 2.x.x`

---

#### 4. Install VS Code (Optional but Recommended)

VS Code is a free code editor that makes it easier to manage files if needed.

**Steps:**
1. Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click **"Download for Mac"**
3. Open the downloaded file
4. Drag **Visual Studio Code** to your **Applications** folder
5. Open VS Code from Applications

**OR install via Homebrew:**
```bash
brew install --cask visual-studio-code
```

---

### One-Time Project Setup

After installing the tools, you need to get the blog project on your computer:

**Steps:**
1. Open Terminal
2. Navigate to where you want to store the project (e.g., your Documents folder):
   ```bash
   cd ~/Documents
   ```
3. Clone the blog repository (replace with your actual repository URL):
   ```bash
   git clone https://github.com/yourusername/monumentaltimes.git
   ```
4. Navigate into the project folder:
   ```bash
   cd monumentaltimes
   ```
5. Install the project dependencies:
   ```bash
   npm install
   ```
   This will take a few minutes the first time.

**That's it!** You're now ready to run the blog and create articles.

---

### Quick Setup Verification

Run these commands to make sure everything is installed correctly:

```bash
# Check all tools are installed
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
git --version     # Should show 2.x.x or higher
brew --version    # Should show 4.x.x or higher

# Navigate to your project (adjust path as needed)
cd ~/Documents/monumentaltimes

# Start the development server
npm run dev
```

If you see "Local: http://localhost:5173/", everything is working! 🎉

Press `Ctrl+C` to stop the server when you're done.

---

### Troubleshooting Installation

**"Command not found" errors:**
- Make sure you completed the Homebrew installation
- Try closing and reopening Terminal
- Run `brew doctor` to check for issues

**"Permission denied" errors:**
- Don't use `sudo` with Homebrew or npm
- Check file permissions: `ls -la ~/Documents/monumentaltimes`

**npm install fails:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Make sure you have a stable internet connection

**Still having issues?**
- Contact your technical team for help
- Check the project's GitHub repository for specific setup instructions

---

## Getting Started

### Step 1: Open the Editor

1. **On your computer**, make sure the website is running locally:
   - Open a terminal/command prompt
   - Navigate to your project folder
   - Type: `npm run dev` and press Enter
   - Wait for the message saying the site is ready

2. **Open your web browser** (Chrome, Firefox, Edge, etc.)

3. **Go to the admin panel** by typing this in the address bar:
   ```
   http://localhost:5173/admin/index.html
   ```

4. You should see the **TinaCMS Admin Panel** - a clean interface with your articles listed

---

## Creating a New Article

### Step-by-Step Instructions

1. **Click the "Blog Articles" button** on the left sidebar (if you don't see it, you're already in the right place)

2. **Click "Create Document"** button (usually green or blue, at the top)

3. **Fill in the Article Details:**

   | Field | What to Enter | Example |
   |-------|---------------|---------|
   | **Title** | Your article's headline | "Faith in Action: A Personal Journey" |
   | **Summary** | A short preview (1-2 sentences) | "Discover how one family's faith transformed their community during difficult times." |
   | **Author** | Your name or pen name | "Sarah Johnson" |
   | **Publish Date** | When the article should appear | Click the calendar and select today's date |
   | **Category** | What type of article this is | Choose from dropdown (see categories below) |
   | **Reading Time** | About how many minutes to read | 5 (just estimate - 3-7 minutes is typical) |
   | **Featured Image** | The main photo for your article | Click "Upload" and select an image from your computer |
   | **Breaking News** | Is this urgent/important news? | Usually leave this OFF (toggle only for urgent announcements) |

4. **Write Your Article Content:**
   - Use the **rich text editor** (looks like a word processor)
   - The toolbar has buttons for:
     - **Bold** and *italic* text
     - Headings (for section titles)
     - Bullet points and numbered lists
     - Links to other websites
     - Quotes and more

5. **Preview Your Work:**
   - Look at the preview on the right side to see how it will appear

6. **Save Your Article:**
   - Click the **"Save"** button at the top right
   - You'll see a confirmation message when it's saved

**That's it!** Your article is now published and will appear on your website immediately.

---

## Available Categories

Choose the category that best fits your article:

- **Spiritual/Bible** - Biblical teachings, devotions, scripture studies
- **Opinion/Testimony** - Personal stories, testimonies, editorial pieces
- **News Flash** - Urgent community news or announcements
- **Biography/History** - Life stories, historical accounts
- **Recipes** - Food and cooking content
- **Poetry & Art** - Creative writing, poems, artwork
- **Stories & Comics** - Fictional stories, comics, narratives
- **Tech & Sports** - Technology topics, sports coverage
- **Reviews** - Movie, book, product reviews
- **Book Review** - Specifically book reviews
- **Prayer** - Prayer guides, prayer requests
- **Human Interest** - Inspiring human stories

---

## Editing an Existing Article

1. **Open the admin panel** (same as before: `http://localhost:5173/admin/index.html`)

2. **Find your article** in the list - you'll see all articles displayed with their titles

3. **Click on the article title** you want to edit

4. **Make your changes** in any field (title, content, image, etc.)

5. **Click "Save"** when you're done

The changes appear on your website immediately!

---

## Deleting an Article

1. **Open the article** you want to delete (click on its title)

2. **Look for the "Actions" or "More Options" menu** (usually three dots ⋮ or a gear icon)

3. **Select "Delete"**

4. **Confirm** when asked "Are you sure?"

The article is removed from your website.

---

## Uploading Images

### Best Practices for Images

- **Size:** Use images that are at least 1200 pixels wide for best quality
- **Format:** JPG or PNG files work best
- **File names:** Use descriptive names like `prayer-sunset.jpg` instead of `IMG_1234.jpg`
- **File size:** Keep images under 2MB (compress if needed)

### How to Upload

1. When creating/editing an article, find the **"Featured Image"** field

2. Click the **"Upload"** button

3. **Select an image** from your computer

4. Wait for the upload to complete (you'll see the image preview)

5. Click **"Save"** to keep the image with your article

**Tip:** You can also upload images by dragging and dropping them into the upload area!

---

## Tips for Great Articles

### Writing Tips

✅ **Start with a hook** - Grab attention in the first sentence  
✅ **Use short paragraphs** - 2-4 sentences each for easy reading  
✅ **Add headings** - Break up long articles with section headings  
✅ **Include images** - Visual content keeps readers engaged  
✅ **Proofread** - Check spelling and grammar before saving  

### SEO Tips (Help People Find Your Articles)

✅ **Use descriptive titles** - "5 Simple Recipes for Busy Families" vs "Recipes"  
✅ **Write clear summaries** - Tell readers exactly what they'll learn  
✅ **Choose accurate categories** - Helps readers find related content  
✅ **Include keywords** - Use words people might search for naturally in your content  

---

## Troubleshooting Common Issues

### "I can't access the admin panel"

**Solution:** Make sure the development server is running:
1. Open terminal/command prompt
2. Navigate to your project folder
3. Run: `npm run dev`
4. Wait for it to start, then try accessing `http://localhost:5173/admin` again

### "My image won't upload"

**Possible causes:**
- Image file is too large (compress it to under 2MB)
- File format not supported (use JPG or PNG)
- Internet connection interrupted (try again)

### "My changes aren't showing on the website"

**Solutions:**
1. Make sure you clicked "Save"
2. Refresh your browser (press F5 or Ctrl+R)
3. Clear your browser cache
4. Close and reopen the page

### "I accidentally deleted an article!"

If you haven't deployed yet (pushed to GitHub), check with your technical team - they may be able to recover it from version control.

---

## Publishing Your Articles to the Live Website

After creating articles locally, they need to be published to your live website:

### What You Need to Know

1. **Local vs. Live:**
   - **Local** = On your computer only (what you see at `localhost:5173`)
   - **Live** = On the internet for everyone to see

2. **Publishing Process:**
   - Your articles are saved as files on your computer
   - These files need to be "pushed" to GitHub
   - GitHub Pages then updates your live website

### How to Publish (Simple Version)

**Ask your technical team to:**
1. Commit your new articles to Git
2. Push the changes to GitHub
3. Deploy to GitHub Pages

**OR if you're comfortable with basic commands:**

**One-Command Publish (Easiest):**
```bash
# This single command does everything: saves, commits, pushes, and deploys
npm run publish
```

**Step-by-Step (If you prefer to see each step):**
```bash
# 1. Save your changes to Git
git add public/content/articles/
git add public/images/

# 2. Create a commit
git commit -m "Added new articles"

# 3. Push to GitHub
git push origin master

# 4. Deploy to live site
npm run deploy
```

Your articles will appear on the live website in a few minutes!

---

## Article Content Formatting Guide

### Headings

Use headings to organize your content:

```
# Main Heading (use once per article)
## Section Heading
### Subsection Heading
```

### Text Formatting

- **Bold text** - for emphasis
- *Italic text* - for subtle emphasis
- ~~Strikethrough~~ - for corrections

### Lists

**Bullet points:**
- First item
- Second item
- Third item

**Numbered lists:**
1. First step
2. Second step
3. Third step

### Links

To add a link:
1. Select the text you want to link
2. Click the link button in the toolbar
3. Enter the website URL
4. Click "Add"

### Quotes

Use quotes for testimonials or scripture:

> "This is an important quote that stands out from the regular text."

### Images in Content

Besides the featured image, you can add images within your article:
1. Click where you want the image
2. Click the image button in the toolbar
3. Upload or select an image
4. Add a caption (optional)

---

## Keyboard Shortcuts (Time Savers!)

When editing in the content area:

- **Ctrl+B** (Windows) or **Cmd+B** (Mac) = Bold
- **Ctrl+I** / **Cmd+I** = Italic
- **Ctrl+K** / **Cmd+K** = Add link
- **Ctrl+Z** / **Cmd+Z** = Undo
- **Ctrl+S** / **Cmd+S** = Save (in some browsers)

---

## Example: Creating Your First Article

Let's walk through creating a sample article step-by-step:

### Scenario: You want to write about a church bake sale

1. **Open admin panel:** `http://localhost:5173/admin`

2. **Click "Create Document"**

3. **Fill in the fields:**
   - **Title:** "Annual Bake Sale a Sweet Success!"
   - **Summary:** "Our community came together for the annual church bake sale, raising over $500 for local charities."
   - **Author:** Your name
   - **Date:** Select today's date
   - **Category:** "News Flash" or "Human Interest"
   - **Reading Time:** 3
   - **Featured Image:** Upload a photo from the bake sale
   - **Breaking News:** OFF

4. **Write the content:**
   ```
   # Community Comes Together for Charity
   
   Last Saturday's church bake sale was our biggest success yet! Over 100 community 
   members stopped by to enjoy homemade treats and support local charities.
   
   ## By the Numbers
   
   - $500+ raised for local food bank
   - 50+ volunteers helped organize
   - 200+ baked goods donated
   
   ## Special Thanks
   
   We want to thank everyone who baked, volunteered, and attended. Your generosity 
   makes a real difference in our community.
   
   **Save the date:** Next year's bake sale is already scheduled for the first 
   Saturday in November!
   ```

5. **Preview** your article on the right side

6. **Click "Save"**

**Congratulations!** You've published your first article! 🎉

---

## Getting Help

### If You Get Stuck

1. **Check this guide** - Review the relevant section
2. **Try the troubleshooting section** - Common issues and solutions
3. **Contact your technical team** - They can help with advanced issues
4. **Check the other guides:**
   - `TINACMS_README.md` - Technical overview
   - `TINACMS_QUICK_START.md` - Quick reference
   - `TINACMS_SETUP.md` - Detailed technical setup

---

## Quick Reference Cheat Sheet

| Task | Steps |
|------|-------|
| **Create article** | Admin panel → Create Document → Fill fields → Save |
| **Edit article** | Admin panel → Click article title → Make changes → Save |
| **Upload image** | In article → Featured Image field → Upload → Select file |
| **Delete article** | Open article → Actions menu → Delete → Confirm |
| **Publish to live site** | Run `npm run publish` in terminal |
| **Preview article** | Look at right side of editor while creating/editing |

---

## Remember

- **Save often** - Click save whenever you make changes
- **Preview before saving** - Check how it looks on the right side
- **Use good images** - They make articles more engaging
- **Write clearly** - Short paragraphs and simple language work best
- **Choose the right category** - Helps readers find your content
- **Test links** - Make sure any links you add actually work

---

**Happy writing!** 📝✨

You now have everything you need to create and manage beautiful articles for your blog. Don't be afraid to experiment - you can always edit or delete articles if needed.
