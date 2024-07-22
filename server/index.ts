import "@/env";
import { GenerateUsernameApiSchema } from "@/schemas/api";
import { generateRandomUsername } from "@/services/username-generator";
import { HttpStatusCode } from "axios";
import "dotenv/config";
import express from "express";
import { ZodError } from "zod";

const app = express();

// Use built-in JSON parser
app.use(express.json());
// Use built-in URL-encoded parser
app.use(express.urlencoded({ extended: true }));

app.post("/usernames/generate", async (request, response) => {
	try {
		const { separator } = GenerateUsernameApiSchema.parse(request.body);
		const username = generateRandomUsername(separator);
		response.status(HttpStatusCode.Created).json({ username });
	} catch (error) {
		if (error instanceof ZodError) {
			// This error would come when trying to unmarshal the data received from the API according to the shape defined
			// as per the Zod schema.
			console.error("There was an error with the user details received from Google.", error);
			return response
				.status(HttpStatusCode.BadRequest)
				.json({ message: "Invalid request body.", errors: error.issues });
		}
		console.error("There was an unexpected error that occured on the server.", error);
		return response
			.status(HttpStatusCode.InternalServerError)
			.json({ message: "There was an unexpected error that occured on the server." });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on Port ${process.env.PORT}`);
});
