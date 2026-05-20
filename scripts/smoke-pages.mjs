import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const jsMatch = html.match(/<script[^>]*src="([^"]+)"/i);
const cssMatch = html.match(/<link[^>]*href="([^"]+\.css)"/i);

if (!jsMatch) throw new Error('No JS script tag found in dist/index.html');
if (!cssMatch) throw new Error('No CSS link tag found in dist/index.html');

const jsPath = `dist/${jsMatch[1].replace(/^\.\//, '')}`;
const cssPath = `dist/${cssMatch[1].replace(/^\.\//, '')}`;

if (!existsSync(jsPath)) throw new Error(`JS asset missing: ${jsPath}`);
if (!existsSync(cssPath)) throw new Error(`CSS asset missing: ${cssPath}`);

console.log('Smoke check passed:', { jsPath, cssPath });
