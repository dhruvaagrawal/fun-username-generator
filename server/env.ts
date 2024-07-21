import { z, type TypeOf } from "zod";

export const env = z.object({
	PORT: z.string(),
});

declare global {
	namespace NodeJS {
		interface ProcessEnv extends TypeOf<typeof env> {}
	}
}

try {
	env.parse(process.env);
} catch (err) {
	if (err instanceof z.ZodError) {
		const { fieldErrors } = err.flatten();
		const errorMessage = Object.entries(fieldErrors)
			.map(([field, errors]) => (errors ? `${field}: ${errors.join(", ")}` : field))
			.join("\n  ");
		process.on("exit", (code) => {
			console.log(
				`Exiting with code: ${code}. Missing environment variables:\n${errorMessage}`
			);
		});
		process.exit(1);
	}
}
