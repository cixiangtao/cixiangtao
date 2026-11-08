import { execFileSync } from 'node:child_process';
import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { generateSnakeAnimation } from 'generate-snake-animation';
import { loadCharts, loadSettings } from './runtime.mjs';
import { renderProfile } from './render.mjs';

const username = process.argv[2] || 'cixiangtao';
if (!/^[a-z\d][a-z\d-]{0,38}$/i.test(username)) throw new Error('Invalid GitHub username');
const token = process.env.GITHUB_TOKEN || execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
if (!token) throw new Error('GITHUB_TOKEN or authenticated gh is required');
const output = new URL('../../output/profile-activity/', import.meta.url);
// snk 3.5.0 exports its generator but not its palette constants. These are the
// documented GitHub palettes; use the README's blue snake for dark contrast.
const palettes = {
  github: { colorBackground: '#ffffff', colorEmpty: '#ebedf0', colorDotBorder: '#1b1f230a', colorDots: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], colorSnake: 'purple' },
  'github-dark': { colorBackground: '#0c1116', colorEmpty: '#161b22', colorDotBorder: '#1b1f230a', colorDots: ['#161b22', '#01311f', '#034525', '#0f6d31', '#00c647'], colorSnake: '#58a6ff' },
};

async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  const result = await response.json();
  if (result.errors?.length) throw new Error(result.errors.map((error) => error.message).join('; '));
  if (!result.data?.user) throw new Error('GitHub user not found');
  return result.data.user;
}

const user = await graphql(`query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions totalIssueContributions totalPullRequestContributions
      totalPullRequestReviewContributions totalRepositoryContributions
      commitContributionsByRepository(maxRepositories: 100) {
        repository { isPrivate primaryLanguage { name color } }
        contributions { totalCount }
      }
      contributionCalendar {
        isHalloween totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`, { login: username });

const repositories = [];
let cursor = null;
do {
  const page = await graphql(`query($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(first: 100, after: $cursor, ownerAffiliations: OWNER, privacy: PUBLIC) {
        pageInfo { hasNextPage endCursor }
        nodes { forkCount stargazerCount }
      }
    }
  }`, { login: username, cursor });
  repositories.push(...page.repositories.nodes);
  cursor = page.repositories.pageInfo.hasNextPage ? page.repositories.pageInfo.endCursor : null;
} while (cursor);
// Public language attribution only, even when the local gh token can see private repos.
user.contributionsCollection.commitContributionsByRepository = user.contributionsCollection.commitContributionsByRepository.filter((entry) => !entry.repository.isPrivate);
user.repositories = { nodes: repositories };
const charts = await loadCharts();
const userInfo = charts.aggregateUserInfo({ data: { user } });
const themes = ['light', 'dark'];
const settings = await Promise.all(themes.map(loadSettings));
const outputs = themes.map((theme) => ({
  format: 'svg',
  drawOptions: { ...palettes[theme === 'dark' ? 'github-dark' : 'github'], sizeCell: 16, sizeDot: 12, sizeDotBorderRadius: 2 },
  animationOptions: { stepDurationMs: 100 },
}));
console.log('Generating with original Platane/snk solver and SVG renderer…');
const snakes = await generateSnakeAnimation({ platform: 'github', username, githubToken: token }, outputs);
const files = new Map();
for (const [i, theme] of themes.entries()) {
  const palette = palettes[theme === 'dark' ? 'github-dark' : 'github'];
  const themeSettings = { ...settings[i], backgroundColor: palette.colorBackground, weakColor: theme === 'light' ? '#59636e' : settings[i].weakColor };
  files.set(`snake-${theme}.svg`, snakes[i]);
  for (const compact of [false, true]) {
    files.set(`${theme}${compact ? '-mobile' : ''}.svg`, renderProfile({ username, userInfo, snakeSvg: snakes[i], charts, settings: themeSettings, compact }));
  }
}
files.set('preview.html', `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>${username} · GitHub 贡献概览</title><style>body{margin:0;background:#e9edf1;color:#1f2328;font:16px system-ui}main{max-width:900px;margin:32px auto;padding:0 16px}h1{font-size:23px}p{line-height:1.8}picture{display:block;margin:24px 0}img{width:100%;height:auto;display:block}a{color:#2457c5}</style><main><h1>@${username} · GitHub 贡献概览</h1><p>地图直接使用 <a href="https://github.com/Platane/snk">Platane/snk</a> 的动画；信息图直接使用 <a href="https://github.com/yoshi389111/github-profile-3d-contrib">github-profile-3d-contrib</a> 的语言环形图、贡献雷达和数据聚合。保留原图形，补充可直接读取的数值。</p><picture><source media="(max-width:600px)" srcset="light-mobile.svg"><img src="light.svg" alt="浅色：原版贪吃蛇与语言、贡献信息图"></picture><picture><source media="(max-width:600px)" srcset="dark-mobile.svg"><img src="dark.svg" alt="深色：原版贪吃蛇与语言、贡献信息图"></picture><p>语言占比按贡献仓库的主要语言及提交次数汇总；雷达沿用原项目的对数刻度。<a href="snake-light.svg">查看独立的原版贪吃蛇 SVG</a></p></main></html>`);
// Complete API and rendering work before replacing the previous preview.
await mkdir(output, { recursive: true });
const stage = new URL('.staging/', output);
await mkdir(stage, { recursive: true });
try {
  for (const [name, content] of files) await writeFile(new URL(name, stage), content);
  for (const name of files.keys()) await rename(new URL(name, stage), new URL(name, output));
} finally {
  await rm(stage, { recursive: true, force: true });
}
console.log(`Generated ${files.size} files from both upstream implementations (${userInfo.totalContributions} contributions).`);
