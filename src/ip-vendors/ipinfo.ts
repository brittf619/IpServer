import IPinfoWrapper from "node-ipinfo";
import logger from "../logger";

/* TODO: get this from env var */
const IPINFO_API_KEY = '';

const ipinfoWrapper = new IPinfoWrapper(IPINFO_API_KEY);

export async function ipInfoGetCountryName(ipAddress: string): Promise<string | null> {
    try {
        const response = await ipinfoWrapper.lookupIp(ipAddress);
        return response.country;
    } catch (error) {
        logger.error('Error fetching from IPinfo:', error);
        return null;
    }
}