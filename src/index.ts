import config from "./config.json"
import express, {Request, Response} from 'express';
import logger from "./logger"

const app = express();
const port = 1234;

interface IpRequestBody {
    ipAddress: string;
}

app.use(express.json());

/* Our naive cache. for the assignment scope this in enough */
interface IpCache {
    [ipAddress: string]: string;
}
  
const cache: IpCache = {};

app.get("/", (req, res) => {
    res.send("Hi there!")
})

app.get("/ip-location", (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    const { ipAddress} = req.body;
    var country: string = ""
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }

    logger.debug("recieved ip: ", ipAddress)

    var limit = config.vendors["first_vendor"].rateLimit;

    /* check if is in cache */
    if (ipAddress in cache) { 
        country = cache[ipAddress];
    } else {
        /* access vendor randomly */

        /* if we hit the rate limit - set only aaccessing other vendor */



        /* add to cache */
        logger.debug(`adding ${ipAddress}:${country} to cache`)
        cache[ipAddress] = country;

    }

    res.send(country);
})

app.listen(port, () => {
	logger.info(`Server is running on http://localhost:${port}`);
});