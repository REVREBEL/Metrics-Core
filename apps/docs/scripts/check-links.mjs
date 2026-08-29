
import markdownLinkCheck from 'markdown-link-check';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import path from 'path';

async function checkLinks() {
  const baseDir = path.resolve('src/content');
  const files = await glob('**/*.{md,mdx}', { cwd: baseDir, nodir: true, absolute: true });
  let hasErrors = false;

  const promises = files.map(file => {
    return new Promise(async (resolve) => {
      const content = await readFile(file, 'utf8');
      markdownLinkCheck(content, {
        baseUrl: 'file://' + file,
        ignore: [
            /^http/,
            /^mailto:/,
        ],
        projectBaseUrl: 'file://' + baseDir,
       }, (err, results) => {
        if (err) {
          console.error('Error', err);
          hasErrors = true;
          resolve();
          return;
        }

        const deadLinks = results.filter(result => result.status === 'dead');

        if (deadLinks.length > 0) {
            console.log(`❌ Dead links found in ${path.relative(process.cwd(), file)}`);
            deadLinks.forEach(link => {
                console.log(` - ${link.link} (line ${link.line})`);
            });
            hasErrors = true;
        }
        resolve();
      });
    });
  });

  await Promise.all(promises);

  if (hasErrors) {
    console.log('Finished with errors.');
    process.exit(1);
  } else {
    console.log('✅ No broken links found.');
  }
}

checkLinks();
