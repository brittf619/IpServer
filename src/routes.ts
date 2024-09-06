
import  {Router, Request, Response} from 'express';
import logger from "./logger"
import GetCountryName from "./vendors";

interface IpRequestBody {
    ipAddress: string;
}
/* Our naive cache. for the assignment scope this in enough */
interface IpCache {
    [ipAddress: string]: string;
}
const cache: IpCache = {};
  
const router = Router()


router.get("/ip-location", (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    const { ipAddress} = req.body;
    var countryName: string = ""
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }

    logger.debug("recieved ip: ", ipAddress)


    if (ipAddress in cache) { 
        countryName = cache[ipAddress];
    } else {
        countryName = GetCountryName(ipAddress);

        /* add to cache */
        logger.debug(`adding ${ipAddress}:${countryName} to cache`)
        cache[ipAddress] = countryName;

    }

    res.send(countryName);
})

export default router;