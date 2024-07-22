import words from "@/data/words.json";

// Doing this since Node.js caches a JSON file read in this format, and the only time the cache is refreshed is if the
// server restarts. This means that in our case, where the file does not changes, barely if at all, the caching
// behaviour ensures even greater performance.
export const ADJECTIVES_AND_NOUNS = {
	adjectives: { words: words.adjectives, total: Object.keys(words.adjectives).length },
	nouns: { words: words.nouns, total: Object.keys(words.nouns).length },
} as const;
