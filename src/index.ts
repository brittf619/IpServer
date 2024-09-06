import config from "./config.json"
import express, {Request, Response} from 'express';

const app = express();
const port = 1234;

interface IpRequestBody {
    ipAddress: string;
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi!")
})

app.get("/ip-location", (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    const { ipAddress} = req.body;
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }

    var limit = config.vendors["first_vendor"].rateLimit;

    /* check if is in cache */

    /* access vendor randomly */

    /* if we hit the rate limit - set only aaccessing other vendor */


    console.log("recieved ip: ", ipAddress)

    /* add to cache */

    res.send("Italy!")
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});