import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../public/content/articles');
const outputFile = path.join(__dirname, '../public/content/articles-data.json');

/**
 * Parse MDX frontmatter and content
 */
function parseMDX(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }
  
  const frontmatterText = match[1];
  const bodyContent = match[2];
  
  // Simple YAML parser
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let multilineValue = [];
  let inMultiline = false;
  
  for (const line of lines) {
    if (line.trim().startsWith('#')) continue;
    
    if (inMultiline && (line.startsWith('  ') || line.startsWith('\t'))) {
      multilineValue.push(line.trim());
      continue;
    } else if (inMultiline) {
      frontmatter[currentKey] = multilineValue.join(' ').trim();
      multilineValue = [];
      inMultiline = false;
      currentKey = null;
    }
    
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      if (value === '>-' || value === '>') {
        currentKey = key;
        inMultiline = true;
        multilineValue = [];
        continue;
      }
      
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value) && value !== '') value = Number(value);
      else if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
        // Remove surrounding quotes
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  }
  
  if (inMultiline && multilineValue.length > 0) {
    frontmatter[currentKey] = multilineValue.join(' ').trim();
  }
  
  return { frontmatter, content: bodyContent };
}

function getAllMDXFiles(dir, baseDir = dir) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllMDXFiles(fullPath, baseDir));
    } else if (item.endsWith('.mdx') && !item.startsWith('.gitkeep')) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { frontmatter, content: body } = parseMDX(content);
      
      results.push({
        path: relativePath,
        frontmatter,
        content: body
      });
    }
  }

  return results;
}

try {
  const articles = getAllMDXFiles(articlesDir);
  const data = {
    articles: articles,
    generatedAt: new Date().toISOString(),
    count: articles.length
  };

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✓ Generated articles data with ${articles.length} articles`);
  console.log(`  Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating articles data:', error);
  process.exit(1);
}
