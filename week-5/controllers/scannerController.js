// controllers/scannerController.js
const express = require('express');
const router = express.Router();
const VulnerabilityScanner = require('../models/scanner');
const ScanResults = require('../models/results');

// Handle POST request to start scanning
router.post('/scan', (req, res) => {
    const url = req.body.url;
    const results = new ScanResults();

    // Perform vulnerability checks
    results.addResult(VulnerabilityScanner.checkSQLInjection(url));
    results.addResult(VulnerabilityScanner.checkXSS(url));

    // Render the results page with the scan results
    res.render('results', { results: results.getResults() });
});

// Serve the scan form
router.get('/', (req, res) => {
    res.render('scanForm');
});

module.exports = router;
