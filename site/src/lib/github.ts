const REPOSITORY = 'cixiangtao/cixiangtao';
const OWNER = 'cixiangtao';
const PROFILE_REPOSITORY = 'cixiangtao';
const PAGE_SIZE = 100;

interface GitHubLabel {
	name: string;
	color: string;
}

interface GitHubIssue {
	number: number;
	title: string;
	body_html: string | null;
	body_text: string | null;
	html_url: string;
	created_at: string;
	updated_at: string;
	comments: number;
	labels: GitHubLabel[];
	pull_request?: unknown;
}

interface GitHubRepository {
	name: string;
	description: string | null;
	html_url: string;
	archived: boolean;
	fork: boolean;
	pushed_at: string | null;
	updated_at: string;
}

export interface BlogPost {
	number: number;
	title: string;
	bodyHtml: string;
	bodyText: string;
	excerpt: string;
	githubUrl: string;
	createdAt: string;
	updatedAt: string;
	comments: number;
	labels: GitHubLabel[];
	readingMinutes: number;
}

export interface Project {
	name: string;
	description: string;
	href: string;
	maintainedAt: string;
}

let postsRequest: Promise<BlogPost[]> | undefined;
let projectsRequest: Promise<Project[]> | undefined;

function createGitHubHeaders(accept = 'application/vnd.github+json') {
	const headers: HeadersInit = {
		Accept: accept,
		'X-GitHub-Api-Version': '2022-11-28',
	};
	const token = import.meta.env.GITHUB_TOKEN;

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
}

function createExcerpt(body: string) {
	const paragraphs = body
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'));
	const excerpt = paragraphs.slice(0, 2).join(' ');

	return excerpt.length > 156 ? `${excerpt.slice(0, 153)}…` : excerpt;
}

function toBlogPost(issue: GitHubIssue): BlogPost {
	const bodyText = issue.body_text?.trim() ?? '';

	return {
		number: issue.number,
		title: issue.title,
		bodyHtml: issue.body_html ?? '',
		bodyText,
		excerpt: createExcerpt(bodyText),
		githubUrl: issue.html_url,
		createdAt: issue.created_at,
		updatedAt: issue.updated_at,
		comments: issue.comments,
		labels: issue.labels,
		readingMinutes: Math.max(1, Math.ceil(bodyText.length / 500)),
	};
}

async function fetchBlogPosts() {
	const headers = createGitHubHeaders('application/vnd.github.full+json');

	const issues: GitHubIssue[] = [];

	for (let page = 1; ; page += 1) {
		const url = new URL(`https://api.github.com/repos/${REPOSITORY}/issues`);
		url.search = new URLSearchParams({
			labels: 'blog',
			state: 'open',
			sort: 'created',
			direction: 'desc',
			per_page: String(PAGE_SIZE),
			page: String(page),
		}).toString();

		// oxlint-disable-next-line no-await-in-loop -- Each page determines whether another request is needed.
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(`GitHub Issues request failed: ${response.status} ${response.statusText}`);
		}

		// oxlint-disable-next-line no-await-in-loop -- Parse the current page before deciding whether to continue.
		const pageIssues = (await response.json()) as GitHubIssue[];
		issues.push(...pageIssues);

		if (pageIssues.length < PAGE_SIZE) {
			break;
		}
	}

	return issues.filter((issue) => !issue.pull_request).map(toBlogPost);
}

async function fetchProjects() {
	const headers = createGitHubHeaders();
	const repositories: GitHubRepository[] = [];

	for (let page = 1; ; page += 1) {
		const url = new URL(`https://api.github.com/users/${OWNER}/repos`);
		url.search = new URLSearchParams({
			type: 'owner',
			sort: 'pushed',
			direction: 'desc',
			per_page: String(PAGE_SIZE),
			page: String(page),
		}).toString();

		// oxlint-disable-next-line no-await-in-loop -- Each page determines whether another request is needed.
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(
				`GitHub repositories request failed: ${response.status} ${response.statusText}`,
			);
		}

		// oxlint-disable-next-line no-await-in-loop -- Parse the current page before deciding whether to continue.
		const pageRepositories = (await response.json()) as GitHubRepository[];
		repositories.push(...pageRepositories);

		if (pageRepositories.length < PAGE_SIZE) {
			break;
		}
	}

	return repositories
		.filter(
			(repository) =>
				!repository.archived && !repository.fork && repository.name !== PROFILE_REPOSITORY,
		)
		.map((repository) => ({
			name: repository.name,
			description: repository.description?.trim() ?? '',
			href: repository.html_url,
			maintainedAt: repository.pushed_at ?? repository.updated_at,
		}))
		.toSorted((a, b) => Date.parse(b.maintainedAt) - Date.parse(a.maintainedAt));
}

export function getBlogPosts() {
	postsRequest ??= fetchBlogPosts();
	return postsRequest;
}

export function getProjects() {
	projectsRequest ??= fetchProjects();
	return projectsRequest;
}

export function formatDate(date: string, locale: 'en' | 'zh' = 'en') {
	return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
		year: 'numeric',
		month: locale === 'zh' ? 'long' : 'short',
		day: 'numeric',
	}).format(new Date(date));
}
