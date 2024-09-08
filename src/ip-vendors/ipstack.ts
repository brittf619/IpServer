import axios from "axios"
import logger from "../logger"

const ipStackUrl = "http://api.ipstack.com"

export async function ipStackGetCountryName(ipAddress: string): Promise<string | null>{
    try {
        const api_key: string = process.env.IPSTACK_API_KEY || "";
        const response = await axios.get(`${ipStackUrl}/${ipAddress}?access_key=${api_key}`)
        const data = response.data
        if (data && data["country_name"]) {
            return data["country_name"];
        } else {
            return null;
        }
    } catch (error){
        logger.error(`Error occured in ipStack call: ${error}`)
        return null;
    }

}