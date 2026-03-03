import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Initialize Sanity client
const client = createClient({
  projectId: 'zz8qqi3i',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
})

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
async function importArticles() {
  try {
    // Read articles data
    const articlesDataPath = path.join(__dirname, '../../public/content/articles-data.json')
    const articlesData = JSON.parse(fs.readFileSync(articlesDataPath, 'utf-8'))

    console.log(`Found ${articlesData.articles.length} articles to import...`)

    let successCount = 0
    let errorCount = 0

    for (const article of articlesData.articles) {
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

        // Add image if it exists and is not empty string
        if (frontmatter.image && frontmatter.image.trim()) {
          doc.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: `image-placeholder-${slug}`,
            },
          }
        }

        // Create the document
        const result = await client.create(doc)
        console.log(`✓ Imported: "${frontmatter.title}" (${result._id})`)
        successCount++
      } catch (error) {
        console.error(`✗ Error importing "${article.frontmatter.title}":`, error.message)
        errorCount++
      }
    }

    console.log(
      `\nImport complete: ${successCount} successful, ${errorCount} failed out of ${articlesData.articles.length} articles.`,
    )
  } catch (error) {
    console.error('Failed to import articles:', error)
    process.exit(1)
  }
}

// Run import
importArticles().catch((error) => {
  console.error('Import failed:', error)
  process.exit(1)
})
