import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Read the entire text file into memory -> Maybe use streams, maybe not -> Read it as JSON -> Then write it back to a
// JSON fil -> If the file is `adjectives`, then write the data against that key -> If the file is `nouns`, then write
// the data against that key

try {
	// `__dirname` resolves to `/fun-username-generator/server/scripts` and that is why we have to go up a directory
	// to the `/data` directory to access the `adjectives.txt` and `nouns.txt` files.
	const adjectivesFilePath = join(__dirname, "../data/adjectives.txt");
	const nounsFilePath = join(__dirname, "../data/nouns.txt");
	const results = await Promise.allSettled([
		readFile(adjectivesFilePath, { encoding: "utf8" }),
		readFile(nounsFilePath, { encoding: "utf8" }),
	]);
	const processResult = (result: PromiseRejectedResult | PromiseFulfilledResult<string>) =>
		result.status === "fulfilled" ? result.value : "";
	// Extract results for each call, returning empty array in case of any rejections
	const adjectives = processResult(results[0]);
	const nouns = processResult(results[1]);

	const adjectivesList = adjectives.split("\n");
	const nounsList = nouns.split("\n");

	const adjectivesMap: { [key: number]: string } = {};
	const nounsMap: { [key: number]: string } = {};
	adjectivesList.forEach((adjective, index) => {
		if (!adjective) return;
		adjectivesMap[index + 1] = adjective;
	});
	nounsList.forEach((noun, index) => {
		if (!noun) return;
		nounsMap[index + 1] = noun;
	});

	const outputFilePath = join(__dirname, "../data/output.json");
	writeFile(
		outputFilePath,
		JSON.stringify({ adjectives: adjectivesMap, nouns: nounsMap }),
		"utf-8"
	);
	console.log("Successfully written to the file.");
} catch (err) {
	console.log(err);
}
