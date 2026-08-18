# cixiangtao blog

An Astro-powered personal blog that uses the repository's GitHub Issues as its
content source.

## Content model

- Every open Issue with the `blog` label is a published post.
- The Issue title becomes the post title.
- The Issue body is rendered using GitHub-flavored Markdown.
- Labels are available as post metadata.
- Discussion continues in the original GitHub Issue.

Astro fetches the Issues during the build and generates static HTML. The
published site does not call the GitHub API at runtime.

The projects window is generated from the owner's public GitHub repositories.
Archived repositories, forks, and the `cixiangtao` profile repository are
excluded. The remaining projects are ordered by their most recent push.

## Profile project synchronization

The root English and Chinese READMEs contain generated recent-project tables
between `recent-projects` markers. Run the generator from the repository root:

```sh
node scripts/sync-profile-projects.mjs
```

The generator uses the same public-repository filters as the website, keeps the
12 most recently pushed repositories, and reads Chinese descriptions and custom
links from `scripts/profile-projects.json`. New repositories fall back to their
GitHub descriptions and homepage fields.

`Sync profile projects` runs every day at 04:37 Asia/Shanghai. It safely skips
when the `PROFILE_SYNC_TOKEN` repository secret is absent. To activate automatic
updates, set that secret to a fine-grained personal access token restricted to
this repository with `Contents: Read and write`, `Pull requests: Read and write`,
and `Actions: Read-only` permissions. The workflow updates its owned
`automation/recent-projects` branch, waits for the protected branch's required
checks, and squash-merges the generated PR. Rotate the secret when the token
expires.

## Localization

English is served from the default routes, while the complete Chinese interface
is available under `/zh/`. The language selector displays the active language
and preserves the current home, window anchor, or post route when changed.
Language navigation bypasses stale route HTML and removes its temporary cache
parameter after the destination loads.
Desktop shortcuts, window titles, and navigation context share one localized
module-name source: About, Projects, and Writing in English; 关于、项目、文章 in Chinese.
GitHub Issue titles and article bodies remain in their original authored language
instead of being machine-translated.

## Desktop skins

On viewports at least 1024px wide, right-clicking empty desktop space or using
the system-bar monitor opens the same context menu. Skin is the first-level item,
with Classic, Aqua, and Midnight as checked second-level choices. Classic remains
the default, and the selection is stored only in the visitor's browser. Mobile
layouts expose no skin controls; window and content colors do not change.

## Deployment

GitHub Actions builds and deploys the site to GitHub Pages when:

- a commit is pushed to `main`;
- an Issue is opened, edited, deleted, closed, reopened, labeled, or unlabeled;
- an Issue comment is created, edited, or deleted;
- the deployment workflow is started manually.

The build receives the workflow's short-lived `GITHUB_TOKEN`, fetches the
current open Issues carrying the `blog` label, and packages them into the
static site. No long-lived personal access token is required.

## Commands

Run these commands from this directory:

| Command        | Action                                                  |
| -------------- | ------------------------------------------------------- |
| `pnpm install` | Install dependencies                                    |
| `pnpm dev`     | Start the development server                            |
| `pnpm check`   | Run formatting, lint, Astro, and TypeScript checks      |
| `pnpm lint`    | Lint scripts, including scripts embedded in Astro files |
| `pnpm format`  | Format supported source and configuration files         |
| `pnpm build`   | Generate the production site in `dist/`                 |
| `pnpm preview` | Preview the production build                            |
