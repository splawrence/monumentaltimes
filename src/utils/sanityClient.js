import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

/**
 * Sanity Client Configuration
 * Update these with your Sanity project credentials
 */
const projectId = 'zz8qqi3i'
const dataset = 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false for real-time updates during development
})

/**
 * Image URL builder for Sanity images
 */
const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}

/**
 * Fetch all posts from Sanity
 */
export async function fetchArticles() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        image,
        body,
        author,
        category,
        canvaEmbed
      }
    `)

    // Transform Sanity posts to app format
    return posts.map((post) => ({
      id: post._id,
      title: post.title || 'Untitled',
      summary: extractSummaryFromBody(post.body),
      author: post.author || 'Monumental Times',
      timestamp: new Date(post.publishedAt),
      image: post.image ? urlFor(post.image).url() : null,
      category: post.category || 'General',
      readTime: estimateReadTime(post.body),
      isBreaking: false,
      content: portableTextToHTML(post.body),
      canvaEmbed: post.canvaEmbed || null,
      source: 'sanity',
    }))
  } catch (error) {
    console.error('Error fetching articles from Sanity:', error)
    return []
  }
}

/**
 * Convert Sanity portable text to HTML
 */
function portableTextToHTML(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  return blocks.map((block) => {
    if (block._type === 'block') {
      const text = block.children?.map((child) => child.text).join('') || ''
      const style = block.style || 'normal'
      
      switch (style) {
        case 'h1':
          return `<h1>${text}</h1>`
        case 'h2':
          return `<h2>${text}</h2>`
        case 'h3':
          return `<h3>${text}</h3>`
        case 'blockquote':
          return `<blockquote>${text}</blockquote>`
        default:
          return `<p>${text}</p>`
      }
    }
    return ''
  }).join('\n')
}

/**
 * Extract first 150 characters from portable text as summary
 */
function extractSummaryFromBody(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  let text = ''
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        text += child.text || ''
        if (text.length > 150) break
      }
      if (text.length > 150) break
    }
  }
  
  return text.substring(0, 150) + (text.length > 150 ? '...' : '')
}

/**
 * Estimate read time from portable text
 */
function estimateReadTime(blocks) {
  if (!blocks || !Array.isArray(blocks)) return 5
  
  let wordCount = 0
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        wordCount += (child.text || '').split(/\s+/).length
      }
    }
  }
  
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200))
}

/**
 * Fetch a single article by ID
 */
export async function fetchArticleById(id) {
  try {
    const article = await client.fetch(`
      *[_type == "article" && _id == $id][0] {
        _id,
        title,
        summary,
        author,
        category,
        readTime,
        isBreaking,
        image,
        content,
        publishedAt
      }
    `, { id })
    
    if (!article) return null
    
    return {
      id: article._id,
      title: article.title || 'Untitled',
      summary: article.summary || '',
      author: article.author || 'Anonymous',
      timestamp: new Date(article.publishedAt),
      image: article.image ? urlFor(article.image).url() : null,
      category: article.category || 'General',
      readTime: article.readTime || 5,
      isBreaking: article.isBreaking || false,
      content: article.content || '',
      source: 'sanity',
    }
  } catch (error) {
    console.error(`Error fetching article ${id} from Sanity:`, error)
    return null
  }
}

/**
 * Search articles by query
 */
export async function searchArticles(query) {
  try {
    const articles = await client.fetch(`
      *[_type == "article" && (
        title match "*${query}*" ||
        summary match "*${query}*" ||
        content match "*${query}*" ||
        author match "*${query}*" ||
        category match "*${query}*"
      )] | order(publishedAt desc) {
        _id,
        title,
        summary,
        author,
        category,
        readTime,
        isBreaking,
        image,
        content,
        publishedAt
      }
    `)
    
    return articles.map((article) => ({
      id: article._id,
      title: article.title || 'Untitled',
      summary: article.summary || '',
      author: article.author || 'Anonymous',
      timestamp: new Date(article.publishedAt),
      image: article.image ? urlFor(article.image).url() : null,
      category: article.category || 'General',
      readTime: article.readTime || 5,
      isBreaking: article.isBreaking || false,
      content: article.content || '',
      source: 'sanity',
    }))
  } catch (error) {
    console.error('Error searching articles:', error)
    return []
  }
}
