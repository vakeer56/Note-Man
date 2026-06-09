import request from 'supertest';
import app from '../../app.js';

describe('App Routes', () => {
  it('GET / should return 200 and "Test API is working..."', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Test API is working...');
  });

  it('GET /coffee should return 418', async () => {
    const res = await request(app).get('/coffee');
    expect(res.status).toBe(418);
    expect(res.body).toHaveProperty('message', 'We cannot brew coffee because we are a teapot');
    expect(res.body).toHaveProperty('statusCode', 418);
  });

  it('GET /api/profile should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Not authenticated');
  });
});
