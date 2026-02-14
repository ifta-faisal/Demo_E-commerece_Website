const fs = require('fs');
const csv = require('csv-parser');

const vendors = {};
let totalProducts = 0;
let productsWithNoVendor = 0;

console.log("Checking vendor coverage...");

const getValue = (data, candidates) => {
    const keys = Object.keys(data);
    const key = keys.find(k => candidates.includes(k.toLowerCase().trim()));
    return key ? data[key] : null;
}

fs.createReadStream('backend/products.csv')
    .pipe(csv())
    .on('data', (data) => {
        totalProducts++;

        // Simulate the Backend Logic
        let vendor = getValue(data, ['brands', 'brand', 'vendor', 'manufacturer']);
        if (!vendor) {
            const tags = getValue(data, ['tags', 'tag']);
            if (tags) {
                const parts = tags.split(',').map(s => s.trim()).filter(s => s.length > 0);
                if (parts.length > 0) vendor = parts[0];
            }
        }

        if (vendor) {
            if (!vendors[vendor]) vendors[vendor] = 0;
            vendors[vendor]++;
        } else {
            productsWithNoVendor++;
        }
    })
    .on('end', () => {
        console.log(`Total Products: ${totalProducts}`);
        console.log(`Products with NO Vendor: ${productsWithNoVendor}`);
        console.log(`Unique Vendors Found: ${Object.keys(vendors).length}`);

        // Check against predefined list (simulated)
        const PREDEFINED_VENDORS = [
            "3BHobby", "3DR", "Amass", "Antigravity", "Anycubic", "Aokoda", "Arduino", "Axisflying", "Bambu Lab", "BetaFPV", "BrotherHobby", "Caddx", "Creality", "CUAV", "Dalprop", "DarwinFPV", "Diatone", "DJI", "Emax", "Fat Shark", "FlyFishRC", "Flysky", "Flywoo", "Foxeer", "FrSky", "Gemfan", "Gens Ace", "GEPRC", "Happymodel", "Hawkeye", "HDZero", "HGLRC", "Hobbywing", "Holybro", "HQProp", "iFlight", "ImmersionRC", "ISDT", "Jumper", "Lumenier", "Matek", "Mechanic", "RadioLink", "RadioMaster", "Raspberry Pi", "RCINPOWER", "Runcam", "RushFPV", "SIYI", "Sony", "SpeedyBee", "STP", "Sunlu", "T-Motor", "Tattu", "TBS", "Team BlackSheep", "ToolkitRC", "Turnigy", "Video Aerial Systems", "Walksnail"
        ];

        let coveredCount = 0;
        const missingVendors = {};

        Object.entries(vendors).forEach(([v, count]) => {
            // Simple fuzzy match check as per frontend
            let matched = false;
            // The frontend checks if PRODUCT vendor contains PREDEFINED vendor.
            // Or if PRODUCT name contains PREDEFINED.

            // Let's emulate the React "vendorCounts" logic
            // It iterates PREDEFINED and increments if product.vendor includes it.
            // So we need to reverse check: Does this 'v' include any 'p'?

            const pVendor = v.toLowerCase();
            for (const targetVendor of PREDEFINED_VENDORS) {
                const t = targetVendor.toLowerCase();
                if (pVendor.includes(t)) {
                    matched = true;
                    break;
                }
            }

            if (matched) {
                coveredCount += count;
            } else {
                missingVendors[v] = count;
            }
        });

        console.log(`Products Covered by Predefined List: ${coveredCount}`);
        console.log(`Products NOT Covered: ${totalProducts - coveredCount - productsWithNoVendor} (excluding no-vendor items)`);

        console.log('Top Missing Vendors:');
        const sortedMissing = Object.entries(missingVendors).sort((a, b) => b[1] - a[1]);
        console.log(sortedMissing.slice(0, 20));
    });
