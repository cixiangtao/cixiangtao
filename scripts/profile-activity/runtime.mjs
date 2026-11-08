import { build } from 'esbuild';
import { mkdir, readFile } from 'node:fs/promises';

const cache = new URL('./.cache/', import.meta.url);

/** Compile unmodified upstream TypeScript, keeping installed libraries external. */
export async function loadCharts() {
  await mkdir(cache, { recursive: true });
  const outfile = new URL('charts.mjs', cache);
  await build({
    entryPoints: [new URL('charts.mjs', import.meta.url).pathname],
    outfile: outfile.pathname,
    bundle: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    logLevel: 'silent',
  });
  return import(outfile.href);
}

export async function loadSettings(theme) {
  const file = theme === 'dark' ? 'NightGreenSettings' : 'NormalSettings';
  return JSON.parse(await readFile(new URL(`./vendor/github-profile-3d-contrib/src/settings/${file}.json`, import.meta.url), 'utf8'));
}
