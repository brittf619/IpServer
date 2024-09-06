import express, {Request, Response} from 'express';
import logger from "./logger"
import router from "./routes"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

app.get("/", (req, res) => {
    res.send("Hi there!")
})

app.listen(port, () => {
	logger.info(`Server is running on http://localhost:${port}`);
});