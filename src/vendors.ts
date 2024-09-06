import config from "./config.json"

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


function getCountryName(ipADdress: string){
    const defaultVendor: string = typedConfig.defaultVendor;
    const limit = typedConfig.vendors[defaultVendor].rateLimit;
    return "";
}

export default getCountryName;