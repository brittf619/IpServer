import  {Router, Request, Response} from 'express';
import logger from "./logger"
import {getCountryName}  from "./ip-vendors/index";

interface IpRequestBody {
    ipAddress: string;
}
/* Our naive cache. for the assignment scope this in enough */
interface IpCache {
    [ipAddress: string]: string;
}
const cache: IpCache = {};
  
const router = Router();


router.get("/ip-location", async (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    var countryName: string | null = "";

    const { ipAddress} = req.body;
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }
    logger.debug("recieved ip: ", ipAddress);


    if (ipAddress in cache) { 
        countryName = cache[ipAddress];
    } else {
        try { 
            countryName = await getCountryName(ipAddress);

            if (countryName != null){
                logger.debug(`adding ${ipAddress}:${countryName} to cache`)
                cache[ipAddress] = countryName;
            } 
        } catch (error) {
            res.status(500).json({error: `Problem with getting country name`})
        }
    }

    res.send(countryName);
})

export default router;