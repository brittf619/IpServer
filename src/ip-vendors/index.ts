import config from "../config.json"
import logger from "../logger"

interface VendorConfig {
  rateLimit: number;
}

interface Config {
  vendors: {
    [key: string]: VendorConfig;
  };
  defaultVendor: string;
}

const typedConfig: Config = config;

const validVendors: string[] = ["ipstack", "callme"];

function isValidVendor(vendor: string): boolean {
    if (!validVendors.includes(vendor)){
        return false;
    }
    return vendor in typedConfig.vendors;
};
  
function getDefaultVendor(): string{
    let defaultVendor: string = typedConfig.defaultVendor;
    if (!isValidVendor(defaultVendor)) {
        /* TODO - check this in a test */
        logger.error(`Invalid default vendor: ${defaultVendor}. Using fallback.`);
        defaultVendor = Object.keys(typedConfig.vendors)[0];
    }

    return defaultVendor;
};

function getCountryName(ipADdress: string): string{
    const defaultVendor: string = getDefaultVendor();
    const limit: number = typedConfig.vendors[defaultVendor].rateLimit;
    let countryName: string = "";

    if (defaultVendor == "ipstack") {
        const s = "";
    } else if (defaultVendor == "callme") {
        const d = "";
    } else {
        /* TODO: what to do here? */
        logger.error("error")
    }
    return countryName;
}

export default getCountryName;