import express from 'express';
import cors from 'cors';
// import { mainRouter } from './apis/apis';

const app = express();
const port = 5000;

/* todo - what is cors? */
app.use(cors());
app.use(express.json());

// app.use('/', mainRouter)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});