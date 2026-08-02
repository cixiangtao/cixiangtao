export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const messages = {
	en: {
		htmlLang: 'en',
		site: {
			title: "cixiangtao's personal workspace",
			description: "cixiangtao's personal website, open-source portfolio, and technical blog.",
		},
		sections: {
			home: 'Home',
			about: 'About',
			projects: 'Projects',
			writing: 'Writing',
		},
		nav: {
			location: 'Location:',
			externalLinks: 'External links',
			openGitHub: 'Open GitHub in a new window',
			systemStatus: 'System status',
			online: 'Online',
			languageLabel: 'Language',
		},
		workspace: {
			label: "cixiangtao's personal workspace",
			shortcuts: 'Shortcuts',
		},
		shortcut: {
			switchTo: (label: string) => `Switch to ${label} window`,
			open: (label: string) => `Open ${label} window`,
			desktopHint: (label: string) => `Double-click to open or focus “${label}”`,
			touchHint: (label: string) => `Tap to open or focus “${label}”`,
		},
		window: {
			close: (title: string) => `Close “${title}” window`,
		},
		wallpaper: {
			menuLabel: 'Desktop menu',
			skin: 'Skin',
			openMenu: 'Open desktop menu',
			current: 'Current skin:',
			changed: 'Skin changed to',
			names: {
				classic: 'Classic',
				aqua: 'Aqua',
				midnight: 'Midnight',
			},
		},
		about: {
			role: 'Open source · Technical writing',
			copy: 'I build open-source projects and turn the lessons behind them into reusable tools and articles.',
			openProfile: "Open cixiangtao's GitHub profile",
			avatarAlt: "cixiangtao's GitHub avatar",
			publicLinks: 'Public links',
			status: 'Always building',
		},
		projects: {
			count: (count: number) => `${count} projects · Open all ↗`,
			listLabel: 'Active repositories, most recently maintained first',
			noDescription: 'No description yet.',
			empty: 'No active public projects are available right now.',
			updated: (date: string) => `Maintained ${date}`,
		},
		writing: {
			files: (count: number) => `${count} ${count === 1 ? 'file' : 'files'}`,
			read: (title: string) => `Read: ${title}`,
			minutes: (count: number) => `${count} min`,
			open: 'Open',
			empty: 'The writing folder is empty for now.',
			openIssues: 'Open GitHub Issues ↗',
			source: 'Articles are built from GitHub Issues labeled blog',
			archive: 'Open writing archive ↗',
		},
		article: {
			navigation: 'Article navigation',
			back: '← Back to writing',
			openGitHub: 'Open on GitHub ↗',
			published: (date: string) => `Published ${date}`,
			readTime: (minutes: number) => `About ${minutes} min read`,
			discussions: (count: number) => `${count} ${count === 1 ? 'discussion' : 'discussions'}`,
			authorInfo: 'Author information',
			authorCopy: 'I document project practice, design decisions, and lessons learned in public.',
			format: 'Format: GitHub Issue',
			status: 'Status: Public',
			discussTitle: 'Want to continue the conversation?',
			discussCopy: 'Comments and revision history stay with the original GitHub Issue.',
			discussAction: 'Join the discussion →',
			originalChinese: 'Original language: Chinese',
		},
		footer: {
			motto: 'Stay curious. Ship thoughtfully.',
			source: 'Content comes from GitHub Issues and is built with Astro.',
		},
	},
	zh: {
		htmlLang: 'zh-CN',
		site: {
			title: 'cixiangtao 的个人工作台',
			description: '慈祥涛的个人主页、开源作品集与中文技术博客。',
		},
		sections: {
			home: '首页',
			about: '关于',
			projects: '项目',
			writing: '文章',
		},
		nav: {
			location: '当前位置：',
			externalLinks: '外部链接',
			openGitHub: '在新窗口打开 GitHub',
			systemStatus: '系统状态',
			online: '在线',
			languageLabel: '语言',
		},
		workspace: {
			label: 'cixiangtao 的个人工作台',
			shortcuts: '快捷入口',
		},
		shortcut: {
			switchTo: (label: string) => `切换到${label}窗口`,
			open: (label: string) => `打开${label}窗口`,
			desktopHint: (label: string) => `双击打开或置顶“${label}”窗口`,
			touchHint: (label: string) => `点按打开或置顶“${label}”窗口`,
		},
		window: {
			close: (title: string) => `关闭“${title}”窗口`,
		},
		wallpaper: {
			menuLabel: '桌面菜单',
			skin: '皮肤',
			openMenu: '打开桌面菜单',
			current: '当前皮肤：',
			changed: '皮肤已切换为',
			names: {
				classic: '经典紫蓝',
				aqua: '水色波纹',
				midnight: '午夜星点',
			},
		},
		about: {
			role: '开源项目 · 技术写作',
			copy: '持续构建开源项目，也把实践过程整理成可以复用的工具和文章。',
			openProfile: '打开 cixiangtao 的 GitHub 主页',
			avatarAlt: 'cixiangtao 的 GitHub 头像',
			publicLinks: '公开入口',
			status: '持续构建',
		},
		projects: {
			count: (count: number) => `${count} 项 · 全部打开 ↗`,
			listLabel: '正在维护的仓库，按最近维护时间排序',
			noDescription: '暂时没有项目说明。',
			empty: '目前没有可展示的公开维护项目。',
			updated: (date: string) => `维护于 ${date}`,
		},
		writing: {
			files: (count: number) => `${count} 个文件`,
			read: (title: string) => `阅读：${title}`,
			minutes: (count: number) => `${count} 分钟`,
			open: '打开',
			empty: '文章文件夹暂时为空。',
			openIssues: '前往 GitHub Issues ↗',
			source: '文章源自带有 blog 标签的 GitHub Issues',
			archive: '打开文章档案 ↗',
		},
		article: {
			navigation: '文章导航',
			back: '← 返回文章目录',
			openGitHub: '在 GitHub 中打开 ↗',
			published: (date: string) => `发布于 ${date}`,
			readTime: (minutes: number) => `约 ${minutes} 分钟阅读`,
			discussions: (count: number) => `${count} 条讨论`,
			authorInfo: '作者信息',
			authorCopy: '在这里公开记录项目实践、设计取舍与阶段复盘。',
			format: '格式：GitHub Issue',
			status: '状态：公开',
			discussTitle: '想继续讨论？',
			discussCopy: '评论与修订记录都保存在原始 GitHub Issue 中。',
			discussAction: '前往讨论区 →',
			originalChinese: '原文语言：中文',
		},
		footer: {
			motto: '持续好奇，认真交付。',
			source: '内容来自 GitHub Issues，由 Astro 构建。',
		},
	},
} as const;

export function getMessages(locale: Locale) {
	return messages[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
	return locale === 'en' ? 'zh' : 'en';
}

export function getLocalizedPath(base: string, locale: Locale, path = '') {
	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	const normalizedPath = path.replace(/^\/+/, '');
	const localePrefix = locale === defaultLocale ? '' : `${locale}/`;

	return `${normalizedBase}${localePrefix}${normalizedPath}`;
}

export function detectContentLanguage(content: string) {
	return /[\u3400-\u9fff]/u.test(content) ? 'zh-CN' : 'en';
}
