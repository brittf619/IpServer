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

/* Our naive cache. for the assignment scope this in enough */
interface IpCache {
    [ipAddress: string]: string;
}
  
const cache: IpCache = {};

app.get("/ip-location", (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    const { ipAddress} = req.body;
    var country: string = ""
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }

    var limit = config.vendors["first_vendor"].rateLimit;

    /* check if is in cache */
    if (ipAddress in cache) { 
        country = cache[ipAddress];
    } else {
        /* access vendor randomly */

        /* if we hit the rate limit - set only aaccessing other vendor */


        console.log("recieved ip: ", ipAddress)

        /* add to cache */

    }

    res.send(country);
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});