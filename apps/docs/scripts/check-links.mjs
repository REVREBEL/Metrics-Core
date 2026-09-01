import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

async function checkLinks() {
  const baseDir = path.resolve(process.cwd(), 'src/content');
  const files = await glob('**/*.{md,mdx}', { cwd: baseDir, nodir: true, absolute: true });
  let brokenLinksCount = 0;

  console.log(`Scanning ${files.length} files for broken links...`);

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    const fileDir = path.dirname(file);
    const brokenLinksInFile = [];

    for (const link of links) {
      const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(link);
      if (!match) continue;

      let href = match[2];

      // Ignore external links, mailto links, and anchor-only links
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
        continue;
      }

      // Remove anchors and query strings
      const anchorIndex = href.indexOf('#');
      if (anchorIndex !== -1) {
        href = href.substring(0, anchorIndex);
      }
      const queryIndex = href.indexOf('?');
      if (queryIndex !== -1) {
        href = href.substring(0, queryIndex);
      }

      // If the link is now empty, skip it (it was likely just an anchor/query)
      if (!href) {
        continue;
      }
      
      // Resolve the absolute path to the linked file
      const absolutePath = path.resolve(fileDir, href);

      if (!existsSync(absolutePath)) {
        // Before flagging as broken, check if it's a root-relative link from /apps/docs
        const docsRoot = path.resolve('apps/docs');
        const rootRelativePath = path.resolve(docsRoot, href.startsWith('/') ? href.substring(1) : href);

        if (!existsSync(rootRelativePath)) {
            brokenLinksInFile.push(href);
            brokenLinksCount++;
        }
      }
    }

    if (brokenLinksInFile.length > 0) {
      console.log(`❌ Found ${brokenLinksInFile.length} broken link(s) in ${path.relative(process.cwd(), file)}:`);
      for (const brokenLink of brokenLinksInFile) {
        console.log(`   - ${brokenLink}`);
      }
    }
  }

  if (brokenLinksCount > 0) {
    console.log(`\nFound a total of ${brokenLinksCount} broken links.`);
    process.exit(1);
  } else {
    console.log('✅ No broken links found.');
  }
}

checkLinks();
