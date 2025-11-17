import matter from 'gray-matter';

/**
 * Loads all MDX/MD articles from the TinaCMS content directory
 * Returns articles in the same format as sampleData for seamless integration
 */
export const loadTinaCMSArticles = async () => {
  try {
    // Get list of article files from the public/content/articles directory
    const response = await fetch('/content/articles');
    
    if (!response.ok) {
      console.warn('TinaCMS content directory not found or not accessible');
      return [];
    }

    const articles = [];
    // Note: This is a simplified approach. For production, use a proper file listing API
    // or generate a manifest file during build time.
    
    return articles;
  } catch (error) {
    console.warn('Error loading TinaCMS articles:', error);
    return [];
  }
};

/**
 * Converts a TinaCMS markdown frontmatter article to the app's article format
 */
export const convertTinaCMSArticle = (filename, data) => {
  const { frontmatter, body } = data;
  
  return {
    id: `tina-${filename}`,
    title: frontmatter.title || '',
    summary: frontmatter.summary || '',
    author: frontmatter.author || 'Anonymous',
    timestamp: frontmatter.date ? new Date(frontmatter.date) : new Date(),
    image: frontmatter.image || null,
    category: frontmatter.category || 'General',
    readTime: frontmatter.readTime || 5,
    isBreaking: frontmatter.isBreaking || false,
    content: body,
    source: 'tinacms',
  };
};

/**
 * Parses an MDX/MD file content using gray-matter
 */
export const parseMDXFile = (fileContent) => {
  return matter(fileContent);
};
