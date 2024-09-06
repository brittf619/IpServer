import express from 'express';

const app = express();
const port = 1234;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi!")
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});