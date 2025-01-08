// models/results.js
class ScanResults {
    constructor() {
        this.results = [];
    }

    addResult(vulnerability) {
        this.results.push(vulnerability);
    }

    getResults() {
        return this.results;
    }
}

module.exports = ScanResults;
