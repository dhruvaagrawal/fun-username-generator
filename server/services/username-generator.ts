import { SEPARATOR_MAP, type SeparatorKeyType } from "@/lib/constants";
import { ADJECTIVES_AND_NOUNS } from "@/setup";
import { getRandomBetweenMinAndMax } from "@/utils/random";

export const generateRandomUsername = (separator: SeparatorKeyType) => {
	const adjectiveRandomNum = getRandomBetweenMinAndMax(1, ADJECTIVES_AND_NOUNS.adjectives.total);
	const nounRandomNum = getRandomBetweenMinAndMax(1, ADJECTIVES_AND_NOUNS.nouns.total);

	const adjective =
		ADJECTIVES_AND_NOUNS.adjectives.words[
			adjectiveRandomNum.toString() as keyof typeof ADJECTIVES_AND_NOUNS.adjectives.words
		];
	const noun =
		ADJECTIVES_AND_NOUNS.nouns.words[
			nounRandomNum.toString() as keyof typeof ADJECTIVES_AND_NOUNS.nouns.words
		];

	const sep = SEPARATOR_MAP[separator];

	return adjective + sep + noun;
};
