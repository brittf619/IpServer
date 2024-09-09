import { Cache , IpCache } from '../src/cache'
import { strict as assert } from 'assert';


describe('check cach works', () => {

    it('should return the country name when the key exists in the cache', () => {
        const currentCache: IpCache = { '1.2.3.4': 'United States' };

        const cache = new Cache(currentCache);
        const result = cache.getFromCache('1.2.3.4');
        
        assert.equal(result, 'United States');
    });

    it('should return null when the key does not exist in the cache', () => {
        const currentCache: IpCache = { '1.2.3.4': 'United States' };
        const cache = new Cache(currentCache);

        const result = cache.getFromCache('1.1.1.1');
        
        assert.equal(result, null);
    });

    it('should return null when the cache is empty', () => {
        const currentCache: IpCache = {};
        const cache = new Cache(currentCache);

        const result = cache.getFromCache('8.8.8.8');
        
        assert.equal(result, null);
    });
});
