import IPinfoWrapper from "node-ipinfo";
import logger from "../logger";

/* TODO: get this from env var */
const IPINFO_API_KEY = "7b8e72f2780c5e";

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