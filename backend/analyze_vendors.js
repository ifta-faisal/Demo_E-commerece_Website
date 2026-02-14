const fs = require('fs');
const csv = require('csv-parser');

const potentialVendors = {};
let total = 0;

console.log("Analyzing potential vendors...");

fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (data) => {
        total++;
        let candidates = new Set();

        // 1. From Tags
        if (data['Tags']) {
            const parts = data['Tags'].split(',');
            if (parts.length > 0) candidates.add(parts[0].trim());
        }

        // 2. From Name (First word)
        if (data['Name']) {
            const firstWord = data['Name'].trim().split(' ')[0];
            // Clean up common prefixes that aren't brands if necessary, but keep it simple
            if (firstWord.length > 2) candidates.add(firstWord);
        }

        candidates.forEach(v => {
            if (!potentialVendors[v]) potentialVendors[v] = 0;
            potentialVendors[v]++;
        });
    })
    .on('end', () => {
        const sorted = Object.entries(potentialVendors).sort((a, b) => b[1] - a[1]);
        console.log('Top 100 Potential Vendors:');
        console.log(sorted.slice(0, 100));
        const top100 = sorted.slice(0, 100).map(e => `${e[0]}: ${e[1]}`).join('\n');
        fs.writeFileSync('vendor_analysis.txt', top100);
        console.log('Analysis of top 100 vendors saved to vendor_analysis.txt');
    });
