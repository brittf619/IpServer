import request from 'supertest';
import { app } from '../src/index';  
import assert from 'assert';

const endpoint: string = "/ip-location"

describe('GET /ip-location', function() {
    it('should return country for valid IP', async function() {
        const ipRequestBody = {ipAddress: "134.201.250.155"}
        const res = await request(app)
            .get(endpoint)
            .send(ipRequestBody)
            .set('Accept', "application/json")
        assert.strictEqual(res.status, 200)
        assert.equal(res.text, "United States")
    });

    it('should return error for missing IP', async function() {
        const res = await request(app).get(endpoint)
        assert.strictEqual(res.status, 400)
    });
});

describe('GET /ip-location with second vendor', function() {
    xit('should return country for valid IP ipstack', async function() {
        const ipRequestBody = {ipAddress: "134.201.250.155"}
        const res = await request(app)
            .get(endpoint)
            .send(ipRequestBody)
            .set('Accept', "application/json")
        assert.strictEqual(res.status, 200)
        assert.equal(res.text, "United States")
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