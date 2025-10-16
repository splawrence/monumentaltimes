# Monumental Times

A modern, responsive news website built with React and Vite. This project provides a newspaper-style layout with featured articles, article grids, search functionality, and administrative pages.

## For Non-Technical Users

### How to Update the Policies Page

The Policies page contains your editorial policies and article submission guidelines. Follow these steps to update the content:

#### Step 1: Locate the Policies File
1. Open your code editor (VS Code or similar)
2. Navigate to the `src/components/` folder
3. Find the file named `Policies.jsx`

#### Step 2: Understanding the File Structure
The Policies.jsx file is organized into sections:
- **Editorial Policies**: Your newsroom's standards and guidelines
- **Article Submission Guidelines**: Rules for contributors and submissions

#### Step 3: Editing the Content
1. **To change section titles**: Look for text between `<h2>` and `</h2>` tags
   - Example: `<h2>Editorial Policies</h2>`
   
2. **To change subsection titles**: Look for text between `<h3>` and `</h3>` tags
   - Example: `<h3>Accuracy and Fact-Checking</h3>`
   
3. **To change paragraph content**: Look for text between `<p>` and `</p>` tags
   - Example: `<p>Your policy text goes here...</p>`

#### Step 4: What to Replace
Currently, the policies page contains placeholder "Lorem ipsum" text. Replace this with your actual policies:

**For Editorial Policies, consider including:**
- Accuracy and fact-checking procedures
- Independence and objectivity standards
- Ethical guidelines for journalists
- Corrections and transparency policies
- Source protection policies
- Conflict of interest guidelines

**For Article Submission Guidelines, consider including:**
- Submission requirements (format, length, etc.)
- Content standards and quality expectations
- Word count limits for different article types
- Review and approval process timeline
- Publication timeline and scheduling
- Rights, attribution, and licensing information
- Contact information for submissions

#### Step 5: Example of Making Changes
To change a policy section, find this:
```jsx
<h3>Accuracy and Fact-Checking</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
```

Replace it with your content:
```jsx
<h3>Accuracy and Fact-Checking</h3>
<p>All articles must be fact-checked using at least two reliable sources. Our editorial team verifies quotes, statistics, and claims before publication...</p>
```

#### Step 6: Important Formatting Rules
- **Always keep the HTML tags** (`<h2>`, `<h3>`, `<p>`, etc.)
- **Don't delete the `<div>` or `<section>` containers**
- **Keep the quotation marks around text**
- **Be careful not to accidentally delete commas, brackets, or other code characters**

#### Step 7: Adding New Sections
To add a new policy section:
1. Find the end of an existing section (before `</section>`)
2. Add your new content following this pattern:
```jsx
<h3>Your New Policy Title</h3>
<p>Your policy content here...</p>
```

#### Step 8: Updating the Last Updated Date
Find this line near the bottom:
```jsx
<p><strong>Last Updated:</strong> October 2025</p>
```
Change the date to reflect when you made your updates.

#### Step 9: Saving Your Changes
1. Save the file (Ctrl+S or Cmd+S)
2. Test your website to make sure everything displays correctly
3. The changes will appear immediately when you refresh the Policies page

### Getting Help
If you encounter any issues:
1. **Make sure you didn't accidentally delete any HTML tags** (the `<` and `>` symbols)
2. **Check that all quotation marks are properly paired**
3. **Ensure you didn't remove any curly braces `{` or `}`**
4. **If the website breaks**, undo your changes (Ctrl+Z) and try again more carefully

### Contact for Technical Support
If you need help with more complex changes or encounter technical issues, contact your web developer or technical support team.

---

## For Developers

### Tech Stack
- **React 18** - UI framework
- **Vite** - Build tool and development server
- **CSS3** - Styling with responsive design
- **PropTypes** - Runtime type checking

### Getting Started

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd monumentaltimes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

#### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation and search
│   ├── ArticleGrid.jsx # Article layout grid
│   ├── FeaturedArticle.jsx
│   ├── Sidebar.jsx
│   ├── ArticleView.jsx # Modal for full articles
│   ├── AboutUs.jsx     # About us modal
│   ├── Policies.jsx    # Policies modal
│   └── SearchResults.jsx
├── data/               # Sample data
├── assets/            # Images and static files
├── App.jsx           # Main application component
└── main.jsx         # Application entry point
```

### Key Features
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Modal System**: Article views, About Us, and Policies open in overlay modals
- **Search Functionality**: Real-time search across articles
- **Article Management**: Easy-to-modify article data structure
- **Grid Layouts**: Flexible article grid system

### Customization

#### Adding New Pages/Modals
1. Create a new component in `src/components/`
2. Add state management in `App.jsx`
3. Add navigation link in `Header.jsx`
4. Import and render the component conditionally

#### Modifying Article Data
Edit `src/data/sampleData.js` to change articles, categories, and content.

#### Styling
Each component has its own CSS file for easy customization. The design follows a newspaper-inspired layout with modern web standards.

### Deployment
This project can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

Build the project with `npm run build` and deploy the `dist` folder.

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Internet Explorer 11+ (with polyfills)
