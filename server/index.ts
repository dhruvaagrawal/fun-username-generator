import "dotenv/config";
import express from "express";
import "@/env";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on Port ${port}`);
});
