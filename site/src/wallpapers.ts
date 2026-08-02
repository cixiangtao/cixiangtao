export const wallpaperIds = ['classic', 'aqua', 'midnight'] as const;

export type Wallpaper = (typeof wallpaperIds)[number];

export const wallpaperThemeColors = {
	classic: '#6670c9',
	aqua: '#1f7f8b',
	midnight: '#152047',
} as const satisfies Record<Wallpaper, string>;
