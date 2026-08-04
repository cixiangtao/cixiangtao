import type { BlogPost } from './github';

export const HOMEPAGE_POST_LIMIT = 10;
export const ARCHIVE_PAGE_SIZE = 20;

export function getArchivePageCount(totalPosts: number) {
	return Math.max(1, Math.ceil(totalPosts / ARCHIVE_PAGE_SIZE));
}

export function getArchivePage(posts: BlogPost[], currentPage: number) {
	const start = (currentPage - 1) * ARCHIVE_PAGE_SIZE;

	return posts.slice(start, start + ARCHIVE_PAGE_SIZE);
}
