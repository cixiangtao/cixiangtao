const REPOSITORY = 'cixiangtao/cixiangtao';
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

let postsRequest: Promise<BlogPost[]> | undefined;

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
	const headers: HeadersInit = {
		Accept: 'application/vnd.github.full+json',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	const token = import.meta.env.GITHUB_TOKEN;

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

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

		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(
				`GitHub Issues request failed: ${response.status} ${response.statusText}`,
			);
		}

		const pageIssues = (await response.json()) as GitHubIssue[];
		issues.push(...pageIssues);

		if (pageIssues.length < PAGE_SIZE) {
			break;
		}
	}

	return issues
		.filter((issue) => !issue.pull_request)
		.map(toBlogPost);
}

export function getBlogPosts() {
	postsRequest ??= fetchBlogPosts();
	return postsRequest;
}

export function formatDate(date: string) {
	return new Intl.DateTimeFormat('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(date));
}
