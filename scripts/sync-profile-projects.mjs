#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const START_MARKER = "<!-- recent-projects:start -->";
const END_MARKER = "<!-- recent-projects:end -->";
const PAGE_SIZE = 100;
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const CONFIG_PATH = new URL("./profile-projects.json", import.meta.url);
const CHECK_ONLY = process.argv.includes("--check");

const config = JSON.parse(await readFile(CONFIG_PATH, "utf8"));

function createHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "cixiangtao-profile-project-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchRepositories() {
  const repositories = [];

  for (let page = 1; ; page += 1) {
    const url = new URL(`/users/${config.owner}/repos`, "https://api.github.com");
    url.search = new URLSearchParams({
      type: "owner",
      sort: "pushed",
      direction: "desc",
      per_page: String(PAGE_SIZE),
      page: String(page),
    }).toString();

    // Each response page determines whether another request is required.
    // oxlint-disable-next-line no-await-in-loop
    const response = await fetch(url, { headers: createHeaders() });

    if (!response.ok) {
      throw new Error(
        `GitHub repositories request failed: ${response.status} ${response.statusText}`,
      );
    }

    // oxlint-disable-next-line no-await-in-loop
    const pageRepositories = await response.json();
    repositories.push(...pageRepositories);

    if (pageRepositories.length < PAGE_SIZE) {
      break;
    }
  }

  return repositories
    .filter(
      (repository) =>
        !repository.archived && !repository.fork && repository.name !== config.profileRepository,
    )
    .toSorted(
      (a, b) => Date.parse(b.pushed_at ?? b.updated_at) - Date.parse(a.pushed_at ?? a.updated_at),
    )
    .slice(0, config.limit);
}

function escapeCell(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("|", "\\|")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function formatLinks(repository, locale) {
  const metadata = config.repositories[repository.name] ?? {};
  const links =
    metadata.links ??
    (repository.homepage
      ? [
          {
            label: "Website",
            zhLabel: "网站",
            url: repository.homepage,
          },
        ]
      : []);

  if (links.length === 0) {
    return "—";
  }

  return links
    .map((link) => `[${escapeCell(locale === "zh" ? link.zhLabel : link.label)}](${link.url})`)
    .join(" · ");
}

function createTable(repositories, locale) {
  const isChinese = locale === "zh";
  const header = isChinese
    ? ["项目", "简介", "链接"]
    : ["Project", "What it does", "Links"];
  const separator = header.map(() => "---");
  const rows = repositories.map((repository) => {
    const metadata = config.repositories[repository.name] ?? {};
    const description = isChinese
      ? (metadata.zhDescription ?? repository.description ?? "")
      : (repository.description ?? "");

    return [
      `[${escapeCell(repository.name)}](${repository.html_url})`,
      escapeCell(description) || (isChinese ? "暂无简介" : "No description yet"),
      formatLinks(repository, locale),
    ];
  });

  return [header, separator, ...rows].map((row) => `| ${row.join(" | ")} |`).join("\n");
}

async function updateReadme(path, table) {
  const source = await readFile(path, "utf8");
  const start = source.indexOf(START_MARKER);
  const end = source.indexOf(END_MARKER);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`${path} must contain one ordered recent-projects marker pair`);
  }

  if (source.indexOf(START_MARKER, start + START_MARKER.length) !== -1) {
    throw new Error(`${path} contains more than one recent-projects start marker`);
  }

  if (source.indexOf(END_MARKER, end + END_MARKER.length) !== -1) {
    throw new Error(`${path} contains more than one recent-projects end marker`);
  }

  const next = `${source.slice(0, start + START_MARKER.length)}\n${table}\n${source.slice(end)}`;

  if (next === source) {
    return false;
  }

  if (CHECK_ONLY) {
    throw new Error(`${path} is out of date; run node scripts/sync-profile-projects.mjs`);
  }

  await writeFile(path, next);
  return true;
}

const repositories = await fetchRepositories();

if (repositories.length === 0) {
  throw new Error(
    "GitHub returned no eligible public repositories; refusing to empty the README tables",
  );
}

const results = await Promise.all([
  updateReadme(`${ROOT}README.md`, createTable(repositories, "en")),
  updateReadme(`${ROOT}README.zh-CN.md`, createTable(repositories, "zh")),
]);

const changed = results.filter(Boolean).length;
console.log(
  CHECK_ONLY
    ? `Verified ${repositories.length} recent projects in both READMEs.`
    : `Updated ${changed} README file(s) with ${repositories.length} recent projects.`,
);
