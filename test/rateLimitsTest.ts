import assert from 'assert';
import { isInLimit, VendorRate } from'../src/ip-vendors/index'


describe('isInLimit', () => {
    let currentVendorLimits: {[vendor: string]: VendorRate};

    beforeEach(() => {
        currentVendorLimits = {
            'bla': { counter: 0, resetTime: Date.now() + 3600 * 1000 }, // 1 hour ahead
        };
    });

    it('should return true if the vendor is within the rate limit', () => {
        const result = isInLimit('bla', 5, currentVendorLimits);
        assert.strictEqual(result, true);
        assert.strictEqual(currentVendorLimits['bla'].counter, 1);
    });

    it('should return false if the vendor has exceeded the rate limit', () => {
        currentVendorLimits['bla'].counter = 5; 
        const result = isInLimit('bla', 5, currentVendorLimits);
        assert.strictEqual(result, false);
    });

    it('should reset the limit if the reset time has passed', () => {
        currentVendorLimits['bla'].resetTime = Date.now() - 1000; 
        const result = isInLimit('bla', 5, currentVendorLimits);
        assert.strictEqual(result, true);
        assert.strictEqual(currentVendorLimits['bla'].counter, 1);
        assert(currentVendorLimits['bla'].resetTime > Date.now());
    });
});

