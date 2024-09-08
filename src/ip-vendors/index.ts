import config from "../config.json"
import logger from "../logger"
import { ipStackGetCountryName } from "./ipstack";
import { ipInfoGetCountryName } from "./ipinfo";

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

export interface VendorRate {
    counter: number;
    resetTime: number; 
}

const vendorLimits: { [vendor: string]: VendorRate } = {
    "ipstack": {counter: 0, resetTime: Date.now() + 3600 * 1000},
    "ipinfo": {counter: 0, resetTime: Date.now() + 3600 * 1000}
}

const vendorFunctions: { [key: string]: (ip: string) => Promise<string | null> } = {
    ipstack: ipStackGetCountryName,
    ipinfo: ipInfoGetCountryName
  };


export async function getCountryName(ipADdress: string): Promise<string | null>{
    const vendors = typedConfig.vendorsOrder;

    for (let vendor of vendors) {
        const maxReqPerHour: number = typedConfig.vendors[vendor].rateLimit;

        if (isInLimit(vendor, maxReqPerHour,  vendorLimits)){
            return await useVendor(vendor, ipADdress);
        } else {
            logger.warn(`vendor ${vendor} has exceeded rate limit. moving on to next`)
        }

    }
    throw new Error("all vendors exceeded rate limit")
}

export function isInLimit(vendor: string, maxReqPerHour: number, currentVendorLimits: {[vendor: string]: VendorRate} ): boolean {
    const currentTime = Date.now();
    const vendorLimit = currentVendorLimits[vendor];

  if (currentTime > vendorLimit.resetTime) {
    vendorLimit.counter = 0;
    vendorLimit.resetTime = currentTime + 3600 * 1000; 
  }

  if (vendorLimit.counter < maxReqPerHour) { 
    vendorLimit.counter++;
    return true;  
  }
    return false;
}

async function useVendor(vendor: string, ipAddress: string): Promise<string | null> {
      const fn = vendorFunctions[vendor];
      if (!fn) throw new Error(`Vendor ${vendor} is not supported.`);
      return await fn(ipAddress);
}
