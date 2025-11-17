/**
 * Loads MDX articles from pre-generated JSON for GitHub Pages deployment
 * Articles are converted to JSON at build time to avoid GitHub Pages
 * stripping frontmatter from .mdx files
 */

/**
 * Convert MDX content to HTML for display
 */
function mdxToHTML(mdxContent) {
  let html = mdxContent
    .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
    .trim();
  
  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Convert horizontal rules
  html = html.replace(/^\*\*\*+\s*$/gm, '<hr />');
  html = html.replace(/^---+\s*$/gm, '<hr />');
  html = html.replace(/^___+\s*$/gm, '<hr />');
  
  // Convert bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Convert line breaks (backslash at end of line)
  html = html.replace(/\\\s*$/gm, '<br />');
  
  // Convert links and images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
  
  // Split into paragraphs and handle lists
  const lines = html.split('\n');
  const result = [];
  let inParagraph = false;
  let inList = false;
  let currentParagraph = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      if (inParagraph) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
        inParagraph = false;
      }
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      continue;
    }
    
    // Check if line is already HTML (starts with <)
    if (line.startsWith('<')) {
      if (inParagraph) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
        inParagraph = false;
      }
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(line);
      continue;
    }
    
    // Handle unordered lists
    const listMatch = line.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      if (inParagraph) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
        inParagraph = false;
      }
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push('<li>' + listMatch[1] + '</li>');
      continue;
    }
    
    // Handle ordered lists
    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      if (inParagraph) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
        inParagraph = false;
      }
      if (inList && result[result.length - 1] !== '</ol>') {
        result.push('</ul>');
        inList = false;
      }
      if (!inList || result[result.length - 2] !== '<ol>') {
        if (inList) result.push('</ul>');
        result.push('<ol>');
        inList = true;
      }
      result.push('<li>' + orderedListMatch[1] + '</li>');
      continue;
    }
    
    // Regular text - add to paragraph
    if (inList) {
      result.push('</ul>');
      inList = false;
    }
    currentParagraph.push(line);
    inParagraph = true;
  }
  
  // Close any open paragraph
  if (inParagraph) {
    result.push('<p>' + currentParagraph.join(' ') + '</p>');
  }
  if (inList) {
    result.push('</ul>');
  }
  
  return result.join('\n');
}

/**
 * Convert MDX content to plain text for search
 */
function mdxToPlainText(mdxContent) {
  // First convert to HTML, then strip tags for search
  const html = mdxToHTML(mdxContent);
  return html
    .replace(/<[^>]+>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Load all articles from the pre-generated JSON data
 */
export async function loadArticlesFromMDX() {
  try {
    // Load the articles data file (generated at build time)
    const response = await fetch('/content/articles-data.json');
    if (!response.ok) {
      console.warn('Articles data not found. Run "npm run generate-manifest" to create it.');
      return [];
    }
    
    const data = await response.json();
    const articlesData = data.articles || [];
    
    // Convert to app article format
    const articles = articlesData.map((articleData) => {
      const { frontmatter, content, path: relativePath } = articleData;
      
      return {
        id: `mdx-${relativePath.replace(/\//g, '-').replace('.mdx', '')}`,
        title: frontmatter.title || 'Untitled',
        summary: frontmatter.summary || '',
        author: frontmatter.author || 'Anonymous',
        timestamp: frontmatter.date ? new Date(frontmatter.date) : new Date(),
        image: frontmatter.image || null,
        category: frontmatter.category || 'General',
        readTime: frontmatter.readTime || 5,
        isBreaking: frontmatter.isBreaking || false,
        canvaEmbed: frontmatter.canvaEmbed || null,
        content: mdxToHTML(content), // Convert MDX to HTML for display
        searchContent: mdxToPlainText(content), // Plain text for search
        rawContent: content, // Keep original MDX
        source: 'mdx',
      };
    });
    
    return articles;
    
  } catch (error) {
    console.error('Error loading articles from JSON:', error);
    return [];
  }
}
