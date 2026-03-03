import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import matter from 'gray-matter'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env.local')})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Initialize Sanity client
const client = createClient({
  projectId: 'zz8qqi3i',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
})

// Helper function to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.warn(`  ⚠ Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    const filename = path.basename(imagePath)

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    })

    console.log(`    ✓ Uploaded image: ${filename} (${asset._id})`)
    return asset._id
  } catch (error) {
    console.warn(`  ⚠ Failed to upload image ${imagePath}:`, error.message)
    return null
  }
}

// Helper function to find image file in various locations
async function findAndUploadImage(imagePath, slug) {
  const possiblePaths = [
    // Check source paths from frontmatter
    path.join(__dirname, '../../public', imagePath),
    path.join(__dirname, '../../public/images', path.basename(imagePath)),
    // Check src/assets with various naming conventions
    path.join(__dirname, `../../src/assets/${slug}.png`),
    path.join(__dirname, `../../src/assets/${slug}.jpg`),
    path.join(__dirname, `../../src/assets/${slug}.jpeg`),
  ]

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return await uploadImageToSanity(filePath)
    }
  }

  return null
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Helper function to convert markdown content to portable text blocks
function convertMarkdownToPortableText(markdown) {
  if (!markdown) return []

  const blocks = []
  const lines = markdown.split('\n')
  let currentParagraph = []
  let isBlockquote = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Handle headings
    if (line.startsWith('#')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          _key: `block-${Math.random().toString(36).substr(2, 9)}`,
          children: [{_type: 'span', text: currentParagraph.join(' ')}],
        })
        currentParagraph = []
      }

      const level = line.match(/^#+/)[0].length
      const title = line.replace(/^#+\s/, '')
      blocks.push({
        _type: 'block',
        style: `h${Math.min(level, 6)}`,
        _key: `block-${Math.random().toString(36).substr(2, 9)}`,
        children: [{_type: 'span', text: title}],
      })
      continue
    }

    // Handle blockquotes
    if (line.startsWith('>')) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          _key: `block-${Math.random().toString(36).substr(2, 9)}`,
          children: [{_type: 'span', text: currentParagraph.join(' ')}],
        })
        currentParagraph = []
      }

      const quoteText = line.replace(/^>\s*/, '')
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        _key: `block-${Math.random().toString(36).substr(2, 9)}`,
        children: [{_type: 'span', text: quoteText}],
      })
      continue
    }

    // Handle empty lines
    if (!line) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          _key: `block-${Math.random().toString(36).substr(2, 9)}`,
          children: [{_type: 'span', text: currentParagraph.join(' ')}],
        })
        currentParagraph = []
      }
      continue
    }

    // Handle horizontal rules
    if (line.match(/^\*+$/) || line.match(/^-+$/) || line.match(/^_+$/)) {
      if (currentParagraph.length > 0) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          _key: `block-${Math.random().toString(36).substr(2, 9)}`,
          children: [{_type: 'span', text: currentParagraph.join(' ')}],
        })
        currentParagraph = []
      }
      continue
    }

    // Regular text
    currentParagraph.push(line)
  }

  // Add any remaining paragraph
  if (currentParagraph.length > 0) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      _key: `block-${Math.random().toString(36).substr(2, 9)}`,
      children: [{_type: 'span', text: currentParagraph.join(' ')}],
    })
  }

  return blocks.length > 0 ? blocks : []
}

// Main import function
async function importMDXArticles() {
  try {
    // Read articles from the MDX files
    const articlesDir = path.join(__dirname, '../../public/content/articles')
    
    const articles = []
    
    // Recursively read all MDX files
    function readArticles(dir) {
      const files = fs.readdirSync(dir)
      
      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          readArticles(filePath)
        } else if (file.endsWith('.mdx') && file !== '.gitkeep.mdx') {
          try {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            const {data, content} = matter(fileContent)
            articles.push({
              frontmatter: data,
              content: content.trim(),
              fileName: file,
            })
          } catch (error) {
            console.error(`Error reading file ${filePath}:`, error.message)
          }
        }
      }
    }
    
    readArticles(articlesDir)
    
    console.log(`Found ${articles.length} articles to import...`)

    let successCount = 0
    let errorCount = 0

    for (const article of articles) {
      try {
        const {frontmatter, content} = article
        const slug = generateSlug(frontmatter.title)

        // Build the document
        const doc = {
          _type: 'post',
          title: frontmatter.title,
          slug: {
            _type: 'slug',
            current: slug,
          },
          publishedAt: frontmatter.date || new Date().toISOString(),
          body: convertMarkdownToPortableText(content),
        }

        // Add category if it exists
        if (frontmatter.category) {
          doc.category = frontmatter.category
        }

        // Add image if it exists and is not empty string
        if (frontmatter.image && frontmatter.image.trim()) {
          console.log(`  Uploading image for: "${frontmatter.title}"`)
          const assetId = await findAndUploadImage(frontmatter.image, slug)
          
          if (assetId) {
            doc.image = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: assetId,
              },
            }
          }
        }

        // Create the document
        const result = await client.create(doc)
        console.log(`✓ Imported: "${frontmatter.title}" (${result._id}) - Category: ${frontmatter.category || 'N/A'}`)
        successCount++
      } catch (error) {
        console.error(`✗ Error importing "${article.frontmatter.title}":`, error.message)
        errorCount++
      }
    }

    console.log(
      `\nImport complete: ${successCount} successful, ${errorCount} failed out of ${articles.length} articles.`,
    )
  } catch (error) {
    console.error('Failed to import articles:', error)
    process.exit(1)
  }
}

// Run import
importMDXArticles().catch((error) => {
  console.error('Import failed:', error)
  process.exit(1)
})
