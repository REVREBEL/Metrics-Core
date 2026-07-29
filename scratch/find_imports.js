const fs = require('fs');
const path = require('path');

const srcDir = '/Users/garystringham/github-revrebel/Migration/REBEL-APP/packages/ui/src';

const aliases = [
  '@forms',
  '@buttons',
  '@charts',
  '@data-grid',
  '@dropdown',
  '@dropdowns',
  '@image-blocks',
  '@inputs',
  '@links',
  '@lists',
  '@layouts',
  '@menus',
  '@popovers',
  '@skeleton',
  '@tabs',
  '@tables',
  '@textarea',
  '@typography',
  '@studio-blocks'
];

// Match imports from exactly the alias, e.g. from '@buttons' or from "@buttons"
const importRegex = new RegExp(`from\\s+['"](${aliases.join('|')})['"]`, 'g');

function walk(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walk(fullPath, results);
      }
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (importRegex.test(content)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const found = walk(srcDir);
console.log(`Found ${found.length} files with base alias imports:`);
found.forEach(f => console.log(f));
