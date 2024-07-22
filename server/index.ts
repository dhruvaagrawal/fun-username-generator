import "dotenv/config";
import express from "express";
import "@/env";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on Port ${process.env.PORT}`);
});
