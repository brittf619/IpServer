import IPinfoWrapper from "node-ipinfo";
import logger from "../logger";


const ipinfoToken = process.env.IPINFO_API_TOKEN || "";

const ipinfoWrapper = new IPinfoWrapper(ipinfoToken);

export async function ipInfoGetCountryName(ipAddress: string): Promise<string | null> {
    logger.info("using ipinfo vendor!")
    try {
        const response = await ipinfoWrapper.lookupIp(ipAddress);
        return response.country;
    } catch (error) {
        logger.error('Error fetching from IPinfo:', error);
        return null;
    }
}