import express from 'express';
import logger from "./logger"
import router from "./routes"
import dotenv from 'dotenv';

/* load the api tokens */
dotenv.config();

export const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(router)

app.get("/", (req, res) => {
    res.send("Hi there!")
})

app.listen(port, () => {
	logger.info(`Server is running on http://localhost:${port}`);
});