// tests/scannerController.test.js
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const VulnerabilityScanner = require('../models/scanner');

// Mock the VulnerabilityScanner methods
jest.mock('../models/scanner');

describe('POST /scan', () => {

  test('should return scan results for a valid URL', async () => {
    // Arrange: Mock the methods
    const mockSQLInjection = 'SQL Injection test for https://example.com completed';
    const mockXSS = 'XSS test for https://example.com completed';
    
    VulnerabilityScanner.checkSQLInjection.mockResolvedValue(mockSQLInjection);
    VulnerabilityScanner.checkXSS.mockResolvedValue(mockXSS);

    // Act: Send a POST request
    const response = await request(app)
      .post('/scan')
      .send({ url: 'https://example.com' });

    // Assert: Check the response
    expect(response.status).toBe(200);
    expect(response.text).toContain(mockSQLInjection);
    expect(response.text).toContain(mockXSS);
  });

  test('should handle errors gracefully', async () => {
    // Simulate an error in scanning
    VulnerabilityScanner.checkSQLInjection.mockRejectedValue(new Error('Scan failed'));

    const response = await request(app)
      .post('/scan')
      .send({ url: 'https://example.com' });

    expect(response.status).toBe(500); // Internal server error
    expect(response.text).toContain('Error during scan.');
  });
});

describe('GET /', () => {
  test('should render the scan form', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Web Vulnerability Scanner');
  });
});
