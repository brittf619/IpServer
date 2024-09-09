import request from 'supertest';
import { app } from '../src/index';  
import assert from 'assert';
import typedConfig from '../src/config.json';
import sinon from 'sinon';

const endpoint: string = "/ip-location"

describe('GET /ip-location', function() {
    let vendorStub: any;
    beforeEach(() => {
        vendorStub = sinon.stub(typedConfig, 'vendorsOrder');
    });

    afterEach(() => {
        vendorStub.restore();
    });

    it('should return country for valid IP', async function() {
        vendorStub.value(['ipinfo', 'ipstack']);

        const ipRequestBody = {ipAddress: "134.201.250.155"}
        const res = await request(app)
            .get(endpoint)
            .send(ipRequestBody)
            .set('Accept', "application/json")
        assert.strictEqual(res.status, 200)
        assert.equal(res.text, "United States")
    });

    it('should return country for valid IP', async function() {
        vendorStub.value(['ipstack', 'ipinfo']);

        const ipRequestBody = {ipAddress: "102.38.248.1"}
        const res = await request(app)
            .get(endpoint)
            .send(ipRequestBody)
            .set('Accept', "application/json")
        assert.strictEqual(res.status, 200)
        assert.equal(res.text, "Greece")
    });

    it('should return error for missing IP', async function() {
        const res = await request(app).get(endpoint)
        assert.strictEqual(res.status, 400)
    });
});

describe("GET sanity check /", function() {
    it('calls /', async function() {
        const res = await request(app).get('/');
        assert.strictEqual(res.status, 200)
    });
});




