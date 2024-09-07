import request from 'supertest';
import { app } from '../src/index';  // Assuming your app is exported from index.ts
import { expect } from 'chai';

describe('GET /ip-to-country', function() {
    it('should return country for valid IP', async function() {
        const res = await request(app)
            .get('/ip-to-country')
            .query({ ip: '134.201.250.155' });  // Example IP
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('country');
    });

    it('should return error for missing IP', async function() {
        const res = await request(app).get('/ip-to-country');
        expect(res.status).to.equal(400);
    });
});