export const SEPARATOR_MAP = {
	hyphen: "-",
	underscore: "_",
	space: " ",
} as const;

export type SeparatorKeyType = keyof typeof SEPARATOR_MAP;
