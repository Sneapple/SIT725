// tests/scanner.test.js
const VulnerabilityScanner = require('../models/scanner');

describe('VulnerabilityScanner', () => {
  
  test('checkSQLInjection should return the correct message', () => {
    const url = 'https://example.com';
    const result = VulnerabilityScanner.checkSQLInjection(url);
    expect(result).toBe(`SQL Injection test for ${url} completed`);
  });
  
  test('checkXSS should return the correct message', () => {
    const url = 'https://example.com';
    const result = VulnerabilityScanner.checkXSS(url);
    expect(result).toBe(`XSS test for ${url} completed`);
  });
});
