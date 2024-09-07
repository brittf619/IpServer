import request from 'supertest';
import { app } from '../src/index';  // Assuming your app is exported from index.ts
import assert from 'assert';

describe('GET /ip-to-country', function() {
    it('should return country for valid IP', async function() {
        const res = await request(app)
            .get('/ip-to-country')
            .query({ ip: '134.201.250.155' });  // Example IP
        assert.strictEqual(res.status, 200)
        assert.ok(res.body.hasOwnProperty('country'));
    });

    it('should return error for missing IP', async function() {
        const res = await request(app).get('/ip-to-country');
        assert.strictEqual(res.status, 400)
    });
});