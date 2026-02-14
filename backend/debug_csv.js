const fs = require('fs');
const csv = require('csv-parser');

const filePath = './products.csv';
const results = [];

console.log('Testing CSV parsing...');

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        if (results.length === 0) {
            console.log('--- FIRST ROW RAW KEYS ---');
            console.log(Object.keys(data));
            // console.log('--- FIRST ROW RAW DATA ---');
            // console.log(data);

            const keys = Object.keys(data);
            const getValue = (candidates) => {
                const key = keys.find(k => candidates.includes(k.toLowerCase().trim()));
                console.log(`Looking for ${candidates}, matched key: ${key}, value: ${data[key] ? data[key].substring(0, 50) + '...' : 'null'}`);
                return key ? data[key] : null;
            }

            let image = getValue(['images', 'image', 'photo']);
            console.log('Extracted Image:', image);

            if (!image) {
                const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp)/i;
                for (const val of Object.values(data)) {
                    if (val && typeof val === 'string' && urlRegex.test(val)) {
                        console.log('Regex Fallback Found:', val.substring(0, 50));
                    }
                }
            }
        }
        results.push(data);
    })
    .on('end', () => {
        console.log(`Done. Processed ${results.length} rows.`);
    });
