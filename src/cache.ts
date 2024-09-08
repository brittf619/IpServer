import logger from "./logger";

/* Our naive cache. for the assignment scope this in enough */
export interface IpCache {
    [ipAddress: string]: string;
}

export class Cache {
    private cache: IpCache = {};

    constructor(initialCache?: IpCache) {
        if (initialCache) {
            this.cache = initialCache;
        }
    }

    public getFromCache(key: string): string | null {
        if (key in this.cache) {
            const countryName = this.cache[key];
            logger.info(`Got ${countryName} for key: ${key}`);
            return countryName;
        }
        return null;
    }

    public insertCache(key: string, value: string): void {
        this.cache[key] = value;
        logger.info(`Inserted ${key}:${value} into cache`);
    }

    public getCache(): IpCache {
        return this.cache;
    }
}
