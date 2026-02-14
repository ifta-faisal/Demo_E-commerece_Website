const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const text = fs.readFileSync('backend/products.csv', 'utf8');

// We can't use the simple sync read if we want to use the streaming csv-parser easily without setup, 
// but we can just use the stream approach.

const vendors = {};
let total = 0;

fs.createReadStream('backend/products.csv')
    .pipe(csv())
    .on('data', (data) => {
        total++;
        // flexible get
        const keys = Object.keys(data);
        const getVal = (candidates) => {
            const k = keys.find(key => candidates.includes(key.toLowerCase().trim()));
            return k ? data[k] : null;
        }

        let v = getVal(['brands', 'brand', 'vendor', 'manufacturer']);
        // Clean string
        if (v) v = v.trim();

        if (v) {
            if (!vendors[v]) vendors[v] = 0;
            vendors[v]++;
        } else {
            if (!vendors['Comparing_NULL']) vendors['Comparing_NULL'] = 0;
            vendors['Comparing_NULL']++;
        }
    })
    .on('end', () => {
        console.log('Total Rows:', total);
        console.log('Top 50 Vendors found in CSV:');
        const sorted = Object.entries(vendors).sort((a, b) => b[1] - a[1]);
        console.log(sorted.slice(0, 50));
    });
