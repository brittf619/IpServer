import axios from "axios"
import logger from "../logger"

// TODO: move this to env var
const API_KEY: string = ""
const ipStackUrl = "http://api.ipstack.com"

async function ipStackGetCountryName(ipAddress: string): Promise<string | null>{

    /* check rate limit first */

    /* otherwise call api */
    try {
        const response = await axios.get(`${ipStackUrl}/${ipAddress}?access_key=${API_KEY}`)
        const data = response.data
        if (data && data.countryName) {
            return data.countryName;
        } else {
            return null;
        }
    } catch (error){
        logger.error(`Error occured in ipStack call: ${error}`)
        return null;
    }

}