import "@/env";
import { ADJECTIVES_AND_NOUNS } from "@/setup";
import { getRandomBetweenMinAndMax } from "@/utils/random";
import { HttpStatusCode } from "axios";
import "dotenv/config";
import express from "express";

const app = express();
app.get("/", (req, res) => {
	const adjectiveRandomNum = getRandomBetweenMinAndMax(1, ADJECTIVES_AND_NOUNS.adjectives.total);
	const nounRandomNum = getRandomBetweenMinAndMax(1, ADJECTIVES_AND_NOUNS.nouns.total);
	res.status(HttpStatusCode.Ok).json({ adjectiveRandomNum, nounRandomNum });
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on Port ${process.env.PORT}`);
});
