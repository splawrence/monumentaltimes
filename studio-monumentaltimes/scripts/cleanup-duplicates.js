import {createClient} from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

// Load environment variables
dotenv.config({path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env.local')})

const client = createClient({
  projectId: 'zz8qqi3i',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
})

async function cleanupDuplicates() {
  try {
    console.log('Fetching all posts...')
    
    // Query all posts
    const posts = await client.fetch(
      `*[_type == "post"] {
        _id,
        title,
        _createdAt,
        slug
      }`
    )

    // Sort by title and creation date
    posts.sort((a, b) => {
      if (a.title !== b.title) {
        return a.title.localeCompare(b.title)
      }
      return new Date(b._createdAt) - new Date(a._createdAt)
    })

    console.log(`Found ${posts.length} total posts`)

    // Group by title to find duplicates
    const titleMap = {}
    const toDelete = []

    for (const post of posts) {
      if (!titleMap[post.title]) {
        titleMap[post.title] = []
      }
      titleMap[post.title].push(post)
    }

    // Identify duplicates (keep the first/newest one)
    for (const [title, docs] of Object.entries(titleMap)) {
      if (docs.length > 1) {
        console.log(`\nFound ${docs.length} copies of: "${title}"`)
        // Keep the first one (most recent due to sorting), delete the rest
        for (let i = 1; i < docs.length; i++) {
          console.log(`  - Marking for deletion: ${docs[i]._id} (created ${docs[i]._createdAt})`)
          toDelete.push(docs[i]._id)
        }
      }
    }

    if (toDelete.length === 0) {
      console.log('\n✓ No duplicates found!')
      return
    }

    console.log(`\n\nDeleting ${toDelete.length} duplicate documents...`)

    // Delete in batches
    for (let i = 0; i < toDelete.length; i++) {
      try {
        await client.delete(toDelete[i])
        console.log(`✓ Deleted: ${toDelete[i]}`)
      } catch (error) {
        console.error(`✗ Failed to delete ${toDelete[i]}: ${error.message}`)
      }
    }

    console.log(`\n✓ Cleanup complete! Deleted ${toDelete.length} duplicate articles.`)
  } catch (error) {
    console.error('Cleanup failed:', error)
    process.exit(1)
  }
}

cleanupDuplicates()
