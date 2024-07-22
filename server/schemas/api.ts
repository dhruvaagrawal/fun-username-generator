import { z } from "zod";

export const GenerateUsernameApiSchema = z.object({
	separator: z.enum(["hyphen", "underscore", "space"]),
});
