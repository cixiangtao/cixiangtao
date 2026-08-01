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
