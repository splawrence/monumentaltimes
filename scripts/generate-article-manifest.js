import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../public/content/articles');
const outputFile = path.join(__dirname, '../public/content/article-manifest.json');

function getAllMDXFiles(dir, baseDir = dir) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllMDXFiles(fullPath, baseDir));
    } else if (item.endsWith('.mdx') && !item.startsWith('.gitkeep')) {
      // Store relative path from articles directory
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push(relativePath);
    }
  }

  return results;
}

try {
  const mdxFiles = getAllMDXFiles(articlesDir);
  const manifest = {
    articles: mdxFiles,
    generatedAt: new Date().toISOString(),
    count: mdxFiles.length
  };

  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`✓ Generated article manifest with ${mdxFiles.length} articles`);
  console.log(`  Output: ${outputFile}`);
} catch (error) {
  console.error('Error generating article manifest:', error);
  process.exit(1);
}
