import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { generateSnakeAnimation } from 'generate-snake-animation';
import { loadCharts, loadSettings } from './runtime.mjs';
import { renderProfile } from './render.mjs';

const charts = await loadCharts();
const settings = await loadSettings('light');
const collection = {
  totalCommitContributions: 100, totalIssueContributions: 2,
  totalPullRequestContributions: 5, totalPullRequestReviewContributions: 3,
  totalRepositoryContributions: 1,
  commitContributionsByRepository: [
    { repository: { primaryLanguage: { name: 'TypeScript', color: '#3178c6' } }, contributions: { totalCount: 60 } },
    { repository: { primaryLanguage: { name: 'JavaScript', color: '#f1e05a' } }, contributions: { totalCount: 30 } },
    { repository: { primaryLanguage: null }, contributions: { totalCount: 10 } },
  ],
  contributionCalendar: { isHalloween: false, totalContributions: 111, weeks: [{ contributionDays: [
    { date: '2026-01-04', weekday: 0, contributionCount: 5, contributionLevel: 'FIRST_QUARTILE' },
    { date: '2026-01-05', weekday: 1, contributionCount: 10, contributionLevel: 'SECOND_QUARTILE' },
    { date: '2026-01-06', weekday: 2, contributionCount: 0, contributionLevel: 'NONE' },
  ] }] },
};
const user = { contributionsCollection: collection, repositories: { nodes: [{ stargazerCount: 20, forkCount: 4 }, { stargazerCount: 9, forkCount: 2 }] } };
const userInfo = charts.aggregateUserInfo({ data: { user } });
const fakeSnake = '<svg xmlns="http://www.w3.org/2000/svg" width="880" height="192" viewBox="-16 -32 880 192"><desc>Generated with https://github.com/Platane/snk</desc><rect class="s" width="10" height="10"/></svg>';

test('vendored chart sources and license retain the recorded upstream contents', async () => {
  const base = new URL('./vendor/github-profile-3d-contrib/', import.meta.url);
  const manifest = JSON.parse(await readFile(new URL('UPSTREAM.json', base), 'utf8'));
  for (const [file, expected] of Object.entries(manifest.files)) {
    const actual = createHash('sha256').update(await readFile(new URL(file, base))).digest('hex');
    assert.equal(actual, expected, file);
  }
});

test('preserves upstream commit-language attribution and exposes exact values', () => {
  assert.equal(userInfo.totalStargazerCount, 29);
  assert.equal(userInfo.totalForkCount, 6);
  for (const compact of [false, true]) {
    const xml = renderProfile({ username: 'fixture', userInfo, snakeSvg: fakeSnake, charts, settings, compact });
    const doc = new JSDOM(xml, { contentType: 'image/svg+xml' }).window.document;
    assert.equal(doc.querySelector('parsererror'), null);
    assert.equal(doc.querySelectorAll('[data-source="Platane/snk"]').length, 1);
    assert.match(doc.documentElement.textContent, /TypeScript\s+60\.0%/);
    assert.match(doc.documentElement.textContent, /JavaScript\s+30\.0%/);
    assert.match(doc.documentElement.textContent, /other\s+10\.0%/);
    assert.equal(doc.querySelectorAll('.axis text').length, 5);
    assert.match(doc.querySelector('.axis text').textContent, /Commit · 100/);
    assert.equal(doc.querySelectorAll('polygon.radar').length, 1);
    assert.equal(doc.querySelectorAll('[data-source$="/pie"] path').length, 3);
  }
});

test('an empty contribution year renders explicit empty language state', () => {
  const empty = { ...userInfo, totalContributions: 0, totalCommitContributions: 0, contributesLanguage: [] };
  const xml = renderProfile({ username: 'fixture', userInfo: empty, snakeSvg: fakeSnake, charts, settings });
  assert.match(xml, /No language-attributed commits/);
  assert.doesNotMatch(xml, /NaN|Infinity/);
});

test('published snk generates real routes and eating animations from contribution cells', async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ data: { user } }), { headers: { 'Content-Type': 'application/json' } });
  try {
    const [xml] = await generateSnakeAnimation({ platform: 'github', username: 'fixture', githubToken: 'test-fixture' }, [{
      format: 'svg',
      drawOptions: { sizeCell: 16, sizeDot: 12, sizeDotBorderRadius: 2, colorDots: { 1: '#9be9a8', 2: '#40c463', 3: '#30a14e', 4: '#216e39' }, colorEmpty: '#ebedf0', colorSnake: 'purple', colorDotBorder: '#1b1f230a' },
      animationOptions: { stepDurationMs: 100 },
    }]);
    const doc = new JSDOM(xml, { contentType: 'image/svg+xml' }).window.document;
    assert.equal(doc.querySelector('parsererror'), null);
    assert.equal(doc.querySelectorAll('.s').length, 4);
    assert.equal(doc.querySelectorAll('.c').length, 3);
    assert.equal([...doc.querySelectorAll('.c')].filter((el) => el.classList.length > 1).length, 2);
    assert.match(xml, /Generated with https:\/\/github.com\/Platane\/snk/);
    assert.match(xml, /@keyframes/);
    assert.doesNotMatch(xml, /NaN|Infinity/);
  } finally {
    globalThis.fetch = previousFetch;
  }
});
