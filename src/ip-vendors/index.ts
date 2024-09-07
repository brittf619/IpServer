import config from "../config.json"
import logger from "../logger"
import { ipStackGetCountryName } from "./ipstack";

interface VendorConfig {
  rateLimit: number;
}

interface Config {
  vendors: {
    [key: string]: VendorConfig;
  };
  vendorsOrder: string[];
}

const typedConfig: Config = config;


export async function getCountryName(ipADdress: string): Promise<string | null>{
    const vendors = typedConfig.vendorsOrder;

    for (let vendor in vendors) {
        const maxReqPerHour: number = typedConfig.vendors[vendor].rateLimit;

        if (isInLimit(vendor, maxReqPerHour)){
            return await useVendor(vendor, ipADdress);
        } else {
            logger.warn(`vendor ${vendor} has exceeded rate limit. moving on to next`)
        }

    }
    throw new Error("all vendors exceeded rate limit")
}


function isInLimit(vendor: string, maxReqPerHour: number): boolean {

    return true;
}

async function useVendor(vendor: string, ipAddress: string): Promise<string | null> {
    if (vendor === 'ipstack') {
        return await ipStackGetCountryName(ipAddress);
      } else if (vendor === 'second_vendor') {
        /* TODO: change this to other vendor */
        return await ipStackGetCountryName(ipAddress);
      } else {
        throw new Error(`Vendor ${vendor} is not supported.`);
      }
}
