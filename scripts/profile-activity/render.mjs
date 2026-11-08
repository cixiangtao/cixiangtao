import * as d3 from 'd3';
import { JSDOM } from 'jsdom';

const number = (n) => n.toLocaleString('en-US');
const ns = 'http://www.w3.org/2000/svg';

/** Compose upstream SVGs; enhancements are labels, layout, and reduced motion. */
export function renderProfile({ username, userInfo, snakeSvg, charts, settings, compact = false }) {
  const width = compact ? 480 : 900;
  const height = compact ? 1130 : 810;
  const dom = new JSDOM('<!doctype html><body></body>');
  const doc = dom.window.document;
  const svg = d3.select(doc.body).append('svg')
    .attr('xmlns', ns).attr('width', width).attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`).attr('role', 'img').attr('aria-labelledby', 'title desc');
  svg.append('title').attr('id', 'title').text(`${username} · GitHub contributions`);
  svg.append('desc').attr('id', 'desc').text(`${number(userInfo.totalContributions)} contributions. Original Platane/snk animation with language and contribution charts from github-profile-3d-contrib.`);
  svg.append('style').text(`
    text { font-family: Ubuntu, Helvetica, Arial, sans-serif; }
    ${charts.createCssColors(settings)}
    .metric { font-size: 30px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .section { font-size: 20px; font-weight: 600; }
    .note { font-size: 14px; }
    @media (prefers-reduced-motion: reduce) {
      .s, .u { display: none; }
      .c { animation: none !important; }
    }
  `);
  svg.append('rect').attr('width', width).attr('height', height).attr('rx', 10).attr('class', 'fill-bg');
  const label = (x, y, value, klass = 'fill-fg', size = 16, anchor = 'start') =>
    svg.append('text').attr('x', x).attr('y', y).attr('class', klass).attr('font-size', size).attr('text-anchor', anchor).text(value);
  const first = userInfo.contributionCalendar[0].date.toISOString().slice(0, 10);
  const last = userInfo.contributionCalendar.at(-1).date.toISOString().slice(0, 10);
  label(28, 40, `@${username}`, 'fill-fg', 24).attr('font-weight', 600);
  label(compact ? 28 : width - 28, compact ? 68 : 39, `${first} — ${last}`, 'fill-weak', 14, compact ? 'start' : 'end');
  const stats = [[userInfo.totalContributions, 'Contributions · past year'], [userInfo.totalStargazerCount, 'Stars · public repos'], [userInfo.totalForkCount, 'Forks · public repos']];
  stats.forEach(([value, name], i) => {
    const x = 28 + i * ((width - 56) / 3);
    label(x, 111, compact ? ['Contributions', 'Stars', 'Forks'][i] : name, 'fill-weak', compact ? 16 : 15);
    label(x, 150, number(value), 'metric fill-strong');
  });
  if (compact) label(28, 176, 'Past year contributions · stars and forks from public repos', 'fill-weak', 12);

  label(28, 198, 'Contributions', 'section fill-fg');
  const map = new JSDOM(snakeSvg, { contentType: 'image/svg+xml' }).window.document.documentElement;
  const nativeWidth = Number(map.getAttribute('width'));
  const nativeHeight = Number(map.getAttribute('height'));
  const mapWidth = width - 56;
  const mapY = 222;
  const imported = doc.importNode(map, true);
  imported.setAttribute('x', '28');
  imported.setAttribute('y', String(mapY));
  imported.setAttribute('width', String(mapWidth));
  imported.setAttribute('height', String(mapWidth * nativeHeight / nativeWidth));
  imported.setAttribute('data-source', 'Platane/snk');
  svg.node().appendChild(imported);
  // Match month labels to snk's own cell pitch and viewBox padding.
  const cellPitch = 16 * mapWidth / nativeWidth;
  let previousMonth = '', lastLabel = -Infinity;
  for (let i = 0; i < userInfo.contributionCalendar.length; i++) {
    const day = userInfo.contributionCalendar[i];
    const month = day.date.toISOString().slice(0, 7);
    if (month === previousMonth) continue;
    previousMonth = month;
    const firstDay = userInfo.contributionCalendar[0].date.getUTCDay();
    const col = Math.floor((i + firstDay) / 7);
    const x = 28 + (col + 1) * cellPitch;
    if (x - lastLabel < (compact ? 32 : 38)) continue;
    lastLabel = x;
    label(x, mapY - 6, day.date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }), 'fill-weak', compact ? 10 : 13);
  }

  const pieY = compact ? 410 : 461;
  const pieX = 24, pieWidth = compact ? 432 : 420, pieHeight = pieWidth / 2;
  label(28, compact ? 382 : 433, 'Languages', 'section fill-fg');
  const pie = svg.append('g').attr('data-source', 'github-profile-3d-contrib/pie');
  charts.createPieLanguage(pie, userInfo, pieX, pieY, pieWidth, pieHeight, settings, false);
  // The original pie shows language names; expose its existing slice values.
  pie.selectAll('text').text((datum) => `${datum.data.language}  ${(100 * datum.data.contributions / Math.max(1, userInfo.totalCommitContributions)).toFixed(1)}%`);
  if (!userInfo.totalCommitContributions || !userInfo.contributesLanguage.length) {
    pie.selectAll('*').remove();
    label(28, pieY + 55, 'No language-attributed commits', 'fill-weak', 16);
  }
  label(28, compact ? 676 : 722, 'Commit share by repository primary language', 'fill-weak note');
  label(28, compact ? 697 : 743, 'Unclassified commits are grouped as other.', 'fill-weak note');

  const radarX = compact ? 20 : 440;
  const radarY = compact ? 757 : 444;
  const radarWidth = 440, radarHeight = 330;
  label(compact ? 28 : 478, compact ? 733 : 433, 'Contribution types', 'section fill-fg');
  const radar = svg.append('g').attr('data-source', 'github-profile-3d-contrib/radar');
  charts.createRadarContrib(radar, userInfo, radarX, radarY, radarWidth, radarHeight, settings, false);
  // Preserve the original radar geometry, but do not hide counts in hover titles.
  radar.selectAll('.axis text').text((datum) => `${datum.name} · ${number(datum.value)}`);
  label(compact ? 28 : 478, compact ? 1110 : 790, 'Log scale · exact counts on each axis', 'fill-weak note');
  return svg.node().outerHTML;
}
