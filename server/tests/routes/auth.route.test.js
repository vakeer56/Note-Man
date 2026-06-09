import request from 'supertest';
import app from '../../app.js';

describe('Auth Routes', () => {
  it('GET /auth/google should redirect to Google OAuth', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.status).toBe(302);
    expect(res.header.location).toMatch(/accounts\.google\.com/);
  });

  it('GET /auth/logout should redirect to /', async () => {
    const res = await request(app).get('/auth/logout');
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('/');
  });
});
