import  {Router, Request, Response} from 'express';
import logger from "./logger"
import {getCountryName}  from "./ip-vendors/index";
import { Cache } from './cache';

interface IpRequestBody {
    ipAddress: string;
}
  
const router = Router();
const cache = new Cache();


router.get("/ip-location", async (req: Request<{}, {}, IpRequestBody>, res: Response) => {
    var countryName: string | null = "";

    const { ipAddress} = req.body;
    if (!ipAddress) {
        return res.status(400).json({error: "IP address is required for translation!"})
    }
    logger.info(`recieved ip: ${ipAddress}`)

    countryName = cache.getFromCache(ipAddress);


    if (!countryName){
        try { 
            countryName = await getCountryName(ipAddress);

            if (countryName != null){
                logger.debug(`adding ${ipAddress}:${countryName} to cache`)
                cache.insertCache(ipAddress, countryName);
            } else {
                res.status(404).json({error: "Country name not found!"})
            }
        } catch (error) {
            res.status(500).json({error: `Problem with getting country name: ${error}`})
        }
    }

    res.send(countryName);
})


export default router;