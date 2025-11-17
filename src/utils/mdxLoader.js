/**
 * Loads MDX articles from static files for GitHub Pages deployment
 * This works by:
 * 1. Loading a manifest file that lists all article paths
 * 2. Fetching each MDX file
 * 3. Parsing frontmatter and content
 */

/**
 * Parse MDX frontmatter and content
 */
function parseMDX(content) {
  // Normalize line endings to \n
  const normalizedContent = content.replace(/\r\n/g, '\n');
  
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = normalizedContent.match(frontmatterRegex);
  
  if (!match) {
    console.warn('No frontmatter found in content', normalizedContent.substring(0, 100));
    return { frontmatter: {}, content: normalizedContent };
  }
  
  const frontmatterText = match[1];
  const bodyContent = match[2];
  
  // Simple YAML parser for frontmatter
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let multilineValue = [];
  let inMultiline = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith('#')) continue; // Skip comments
    
    // Check for multiline string continuation (indented lines)
    if (inMultiline && (line.startsWith('  ') || line.startsWith('\t'))) {
      multilineValue.push(line.trim());
      continue;
    } else if (inMultiline) {
      // End of multiline value
      frontmatter[currentKey] = multilineValue.join(' ').trim();
      multilineValue = [];
      inMultiline = false;
      currentKey = null;
    }
    
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle multiline strings (>- or >)
      if (value === '>-' || value === '>') {
        currentKey = key;
        inMultiline = true;
        multilineValue = [];
        continue;
      }
      
      // Parse value types
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value) && value !== '') value = Number(value);
      
      frontmatter[key] = value;
    }
  }
  
  // Handle last multiline value if exists
  if (inMultiline && multilineValue.length > 0) {
    frontmatter[currentKey] = multilineValue.join(' ').trim();
  }
  
  return { frontmatter, content: bodyContent };
}

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
 * Load all articles from the manifest
 */
export async function loadArticlesFromMDX() {
  try {
    // Load the manifest file
    const manifestResponse = await fetch('/content/article-manifest.json');
    if (!manifestResponse.ok) {
      console.warn('Article manifest not found. Run "npm run generate-manifest" to create it.');
      return [];
    }
    
    const manifest = await manifestResponse.json();
    const articlePaths = manifest.articles || [];
    
    // Fetch all article files
    const articlePromises = articlePaths.map(async (relativePath) => {
      try {
        const response = await fetch(`/content/articles/${relativePath}`);
        if (!response.ok) {
          console.warn(`Failed to fetch ${relativePath}: ${response.status}`);
          return null;
        }
        
        const mdxContent = await response.text();
        console.log(`Fetched ${relativePath}, length: ${mdxContent.length}, starts with:`, mdxContent.substring(0, 50));
        
        const { frontmatter, content } = parseMDX(mdxContent);
        
        console.log('Parsed article:', relativePath, frontmatter);
        
        // Convert to app article format
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
          content: mdxToHTML(content), // Convert MDX to HTML for display
          searchContent: mdxToPlainText(content), // Plain text for search
          rawContent: content, // Keep original MDX
          source: 'mdx',
        };
      } catch (error) {
        console.error(`Error loading article ${relativePath}:`, error);
        return null;
      }
    });
    
    const articles = await Promise.all(articlePromises);
    return articles.filter(article => article !== null);
    
  } catch (error) {
    console.error('Error loading articles from MDX:', error);
    return [];
  }
}
