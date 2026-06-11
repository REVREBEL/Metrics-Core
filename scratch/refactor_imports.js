const fs = require('fs');
const path = require('path');

const srcDir = '/Users/garystringham/github-revrebel/Migration/REBEL-APP/packages/ui/src';
const tsconfigPath = '/Users/garystringham/github-revrebel/Migration/REBEL-APP/tsconfig.json';

const folders = [
  { alias: '@auto-form', dir: 'forms' },
  { alias: '@buttons', dir: 'buttons' },
  { alias: '@charts', dir: 'charts' },
  { alias: '@data-grid', dir: 'data-grid' },
  { alias: '@dropdowns', dir: 'dropdowns' },
  { alias: '@dropdown', dir: 'dropdowns' },
  { alias: '@image-blocks', dir: 'image-blocks' },
  { alias: '@inputs', dir: 'inputs' },
  { alias: '@links', dir: 'links' },
  { alias: '@lists', dir: 'lists' },
  { alias: '@layouts', dir: 'layouts' },
  { alias: '@menus', dir: 'menus' },
  { alias: '@popovers', dir: 'popovers' },
  { alias: '@skeleton', dir: 'skeleton' },
  { alias: '@tabs', dir: 'tabs' },
  { alias: '@tables', dir: 'tables' },
  { alias: '@textarea', dir: 'textarea' },
  { alias: '@typography', dir: 'typography' },
  { alias: '@studio-blocks', dir: 'studio-blocks' }
];

const aliases = folders.map(f => f.alias);

// Build export mapping: alias -> exportName -> subpath
const exportMap = {};

function parseFileExports(filePath) {
  const exports = [];
  if (!fs.existsSync(filePath)) return exports;
  const content = fs.readFileSync(filePath, 'utf8');

  // Regex to match named exports
  const namedExportRegex = /export\s+(const|let|var|function|class|type|interface|enum)\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push(match[2]);
  }

  // Match export { A, B } or export { A as B }
  const bracesExportRegex = /export\s*\{\s*([^}]+)\s*\}/g;
  while ((match = bracesExportRegex.exec(content)) !== null) {
    const parts = match[1].split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const specifiers = trimmed.split(/\s+as\s+/);
      const exportedName = specifiers[specifiers.length - 1].trim();
      exports.push(exportedName);
    }
  }

  // Match default exports
  const defaultExportRegex = /export\s+default\s+(?:function|class)?\s*(\w+)?/g;
  while ((match = defaultExportRegex.exec(content)) !== null) {
    if (match[1]) {
      exports.push(match[1]);
    }
  }

  return exports;
}

// 1. Build the export mapping
for (const folder of folders) {
  const primitivePath = path.join(srcDir, 'primitives', folder.dir);
  if (!fs.existsSync(primitivePath)) continue;

  const files = fs.readdirSync(primitivePath);
  for (const file of files) {
    if (file === 'index.ts' || file === 'index.tsx' || (!file.endsWith('.ts') && !file.endsWith('.tsx'))) continue;

    const fullPath = path.join(primitivePath, file);
    const exports = parseFileExports(fullPath);
    const basename = file.replace(/\.tsx?$/, '');

    for (const exp of exports) {
      if (!exportMap[folder.alias]) {
        exportMap[folder.alias] = {};
      }
      exportMap[folder.alias][exp] = `${folder.alias}/${basename}`;
    }
  }
}

// Hand-coded additions/overrides
if (exportMap['@buttons']) {
  exportMap['@buttons']['Button'] = '@buttons/button';
  exportMap['@buttons']['buttonVariants'] = '@buttons/button';
  exportMap['@buttons']['ButtonGroup'] = '@buttons/button-group';
  exportMap['@buttons']['ButtonGroupText'] = '@buttons/input-group-button-group';
  exportMap['@buttons']['ToolbarButton'] = '@buttons/toolbar-button';
}
if (exportMap['@dropdowns']) {
  exportMap['@dropdowns']['DropdownMenu'] = '@dropdowns/dropdown-menu';
}
if (exportMap['@dropdown']) {
  exportMap['@dropdown'] = exportMap['@dropdowns'];
}
if (exportMap['@tabs']) {
  exportMap['@tabs']['Tabs'] = '@tabs/tabs';
  exportMap['@tabs']['TabsList'] = '@tabs/tabs';
  exportMap['@tabs']['TabsTrigger'] = '@tabs/tabs';
  exportMap['@tabs']['TabsContent'] = '@tabs/tabs';
}
if (exportMap['@popovers']) {
  exportMap['@popovers']['Popover'] = '@popovers/popover';
  exportMap['@popovers']['PopoverTrigger'] = '@popovers/popover';
  exportMap['@popovers']['PopoverContent'] = '@popovers/popover';
  exportMap['@popovers']['PopoverAnchor'] = '@popovers/popover';
}
if (exportMap['@auto-form']) {
  exportMap['@auto-form']['Field'] = '@auto-form/fields/field';
  exportMap['@auto-form']['FieldLabel'] = '@auto-form/fields/field';
  exportMap['@auto-form']['FieldDescription'] = '@auto-form/fields/field';
  exportMap['@auto-form']['FieldGroup'] = '@auto-form/fields/field';
  exportMap['@auto-form']['AutoForm'] = '@auto-form/form';
  exportMap['@auto-form']['AutoFormSubmit'] = '@auto-form/form';
  exportMap['@auto-form']['useAutoForm'] = '@auto-form/form';
  exportMap['@auto-form']['FieldSet'] = '@auto-form/fields/field';
  exportMap['@auto-form']['FieldLegend'] = '@auto-form/fields/field';
}

function rewriteFileImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let modified = false;

  // Pattern to match: import { ... } from "alias"
  // Match single or multi-line imports
  const importRegex = /import\s+(type\s+)?\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]/gs;

  newContent = content.replace(importRegex, (match, isType, specifiersStr, importSource) => {
    if (!aliases.includes(importSource)) {
      return match; // Keep as is
    }

    const typePrefix = isType ? 'type ' : '';
    const specifiers = specifiersStr.split(',').map(s => s.trim()).filter(Boolean);
    const subpathGroups = {};
    const unmapped = [];

    for (const specifier of specifiers) {
      // Handle alias imports: e.g. "A as B" or "type A as B" or "type A"
      let name = specifier;
      if (name.includes(' as ')) {
        const parts = name.split(/\s+as\s+/);
        name = parts[0].trim();
      }
      if (name.startsWith('type ')) {
        name = name.substring(5).trim();
      }

      const map = exportMap[importSource];
      if (map && map[name]) {
        const targetSubpath = map[name];
        if (!subpathGroups[targetSubpath]) {
          subpathGroups[targetSubpath] = [];
        }
        subpathGroups[targetSubpath].push(specifier);
      } else {
        unmapped.push(specifier);
      }
    }

    if (unmapped.length > 0) {
      console.warn(`[WARNING] In file ${filePath}: Unmapped specifiers in import from "${importSource}": ${unmapped.join(', ')}`);
    }

    // Generate new import statements
    const newImports = [];
    for (const [subpath, specs] of Object.entries(subpathGroups)) {
      newImports.push(`import ${typePrefix}{ ${specs.join(', ')} } from "${subpath}"`);
    }

    if (unmapped.length > 0) {
      let guessedSubpath = `${importSource}/index`;
      if (importSource === '@buttons') guessedSubpath = '@buttons/button';
      else if (importSource === '@inputs') guessedSubpath = '@inputs/input';
      else if (importSource === '@tabs') guessedSubpath = '@tabs/tabs';
      else if (importSource === '@tables') guessedSubpath = '@tables/table';
      
      newImports.push(`import ${typePrefix}{ ${unmapped.join(', ')} } from "${guessedSubpath}"`);
    }

    modified = true;
    return newImports.join('\n');
  });

  if (modified && newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`[REFACTORED] ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walk(fullPath);
      }
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      rewriteFileImports(fullPath);
    }
  }
}

console.log("=== STARTING IMPORT REFACTORING ===");
walk(srcDir);
console.log("=== IMPORT REFACTORING COMPLETED ===");

// 2. Delete local index.ts/index.tsx files from folders (excluding ui-core, registry)
console.log("=== DELETING LOCAL INDEX FILES ===");
for (const folder of folders) {
  if (folder.dir === 'ui-core' || folder.dir === 'registry') continue;
  
  const idxPathTs = path.join(srcDir, 'primitives', folder.dir, 'index.ts');
  const idxPathTsx = path.join(srcDir, 'primitives', folder.dir, 'index.tsx');

  if (fs.existsSync(idxPathTs)) {
    fs.unlinkSync(idxPathTs);
    console.log(`Deleted: ${idxPathTs}`);
  }
  if (fs.existsSync(idxPathTsx)) {
    fs.unlinkSync(idxPathTsx);
    console.log(`Deleted: ${idxPathTsx}`);
  }
}

// 3. Update tsconfig.json path mappings (regex-based to support comments/formatting)
console.log("=== UPDATING TSCONFIG.JSON ===");
if (fs.existsSync(tsconfigPath)) {
  let raw = fs.readFileSync(tsconfigPath, 'utf8');
  for (const folder of folders) {
    const lineRegex = new RegExp(`^\\s*"${folder.alias}"\\s*:\\s*\\[[^\\]]+\\],?\\s*\\n`, 'gm');
    if (lineRegex.test(raw)) {
      raw = raw.replace(lineRegex, '');
      console.log(`Removed from tsconfig path mapping: "${folder.alias}"`);
    }
  }
  fs.writeFileSync(tsconfigPath, raw, 'utf8');
  console.log("tsconfig.json updated successfully.");
}
