const Product = require('../models/Product');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

let localProducts = [];
const isDbConnected = () => mongoose.connection.readyState === 1;

exports.getProducts = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(200).json(localProducts);
        }
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.seedProductsFromCsv = (filePath) => {
    if (!fs.existsSync(filePath)) {
        console.log('Seed file not found:', filePath);
        return;
    }

    // ---- ROBUST DATA DETECTION LOGIC ----
    const KNOWN_VENDORS = [
        "3BHobby", "3DR", "Amass", "Antigravity", "Anycubic", "Aokoda", "Arduino", "Axisflying", "Bambu Lab", "BetaFPV", "BrotherHobby", "Caddx", "Cobra", "Creality", "CUAV", "Dalprop", "DarwinFPV", "Diatone", "DJI", "Emax", "Fat Shark", "FlyFishRC", "Flysky", "Flywoo", "Foxeer", "FrSky", "Gartt", "Gemfan", "Gens Ace", "GEPRC", "GNB", "Happymodel", "Hawkeye", "HDZero", "HGLRC", "Hobbywing", "Holybro", "Hota", "HQProp", "iFlight", "ImmersionRC", "ISDT", "Jumper", "Lumenier", "Matek", "Mechanic", "PandaRC", "RadioLink", "RadioMaster", "Raspberry Pi", "RCINPOWER", "Runcam", "RushFPV", "SkyRC", "Skystars", "SIYI", "Sony", "SpeedyBee", "STP", "Sunlu", "SunnySky", "T-Motor", "Tattu", "TBS", "Team BlackSheep", "ToolkitRC", "Turnigy", "Video Aerial Systems", "Walksnail", "X-Nova", "ZOHD"
    ];

    // Ordered rules for detection - Priority matters!
    // Ordered rules for detection - Priority matters!
    const CATEGORY_RULES = [
        { name: 'Consumer Drones', keywords: ['dji mini', 'mavic', 'avata', 'air 3', 'cine', 'cinewhoop', 'rtf', 'bnf', 'pnp', 'drone'] },
        { name: 'Chargers', keywords: ['charger', 'charging', 'q6', 'p6', 'k4', 'hota', 'toolkit', 'toolkit', 'toolkitrc', 'isdt', 'skyrc', 'balance charger', 'idst'] },
        { name: 'Batteries', keywords: ['lipo', 'li-po', 'lihv', 'battery', 'mah', '1s', '2s', '3s', '4s', '5s', '6s', 'lion', '18650', '21700'] },
        { name: '3D Printing Lab', keywords: ['filament', 'pla', 'petg', 'tpu', 'resin', '3d printer', 'creality', 'anycubic', 'bambu', 'nozzle', 'extruder'] },
        { name: 'Action Camera & Accessories', keywords: ['action 2', 'action 3', 'action 4', 'gopro', 'hero', 'insta360', 'caddx walnut', 'runcam thumb', 'naked', 'nd filter', 'camera mount', 'action cam', 'caddx polar'] },
        { name: 'Radios & Tx Rx', keywords: ['radio', 'transmitter', 'receiver', 'rx', 'tx', 'elrs', 'crossfire', 'tracer', 'remote controller', 'frsky', 'flysky', 'radiomaster', 'jumper'] },
        { name: 'Controller External Module', keywords: ['elrs module', 'crossfire module', 'tracer module', 'ranger', 'bandit', 'nano tx', 'micro tx', 'external module'] },
        { name: 'Controller Accessories', keywords: ['gimbal stick', 'neck strap', 'lanyard', 'screen protector', 'remote case', 'transmitter case'] },
        { name: 'Drone FC+ESC', keywords: ['flight controller', 'fc', 'stack', 'aio', 'f405', 'f722', 'h743', 'blheli', 'speed controller', 'esc'] },
        { name: 'Electronics', keywords: ['motor driver', 'arduino', 'raspberry pi', 'sensor', 'module', 'breadboard', 'bec', 'cap'] },
        { name: 'Motors', keywords: ['brushless', 'stator', 'kv', 'motor', 'xing'] },
        { name: 'Propellers', keywords: ['propeller', '5040', '5140', '5030', 'tri-blade', 'dalprop', 'gemfan', 'hqprop', 'props'] },
        { name: 'VTX', keywords: ['vtx', 'video transmitter', 'air unit', 'vista', 'link', 'o3', 'walksnail'] },
        { name: 'Antennas', keywords: ['antenna', 'lollipop', 'pagoda', 'rhcp', 'lhcp', 'sma', 'mmcx', 'u.fl', 'ipex'] },
        { name: 'Batteries Accessories', keywords: ['battery strap', 'lipo strap', 'voltage checker', 'balance lead', 'xt60 connector', 'xt30 connector', 'charge cable', 'parallel board', 'battgo', 'connector'] },
        { name: 'Frames', keywords: ['frame', 'carbon fiber', 'arm', 'wheelbase', 'quadcopter kit', 'bottom plate', 'top plate'] },
        { name: 'Bags & Cases', keywords: ['backpack', 'carrying case', 'bag', 'pouch', 'tool case'] },
        { name: 'Tools', keywords: ['tool', 'soldering', 'iron', 'driver', 'wrench', 'plier', 'tweezer', 'hex'] },
        { name: 'Drone Cables', keywords: ['silicone wire', 'awg', 'cable', 'wire', 'adapter cable', 'extension'] },
        { name: 'Accessories', keywords: ['screw', 'standoff', 'nut', 'bolt', 'hardware', 'misc'] }
    ];

    const detectVendor = (data, getValue) => {
        // 1. Explicit Columns
        let v = getValue(['brands', 'brand', 'vendor', 'manufacturer']);
        if (v && v.trim().length > 1) return v.trim();

        // 2. Tags
        const tags = getValue(['tags', 'tag']);
        if (tags) {
            const parts = tags.split(',').map(s => s.trim());
            const match = parts.find(t => KNOWN_VENDORS.some(kv => kv.toLowerCase() === t.toLowerCase()));
            if (match) {
                return KNOWN_VENDORS.find(kv => kv.toLowerCase() === match.toLowerCase()) || match;
            }
        }

        // 3. Name Search (Most reliable fallback)
        const name = getValue(['name', 'title', 'product name']);
        if (name) {
            const nameLower = name.toLowerCase();
            // Sort by length desc
            const match = KNOWN_VENDORS.sort((a, b) => b.length - a.length).find(kv => nameLower.includes(kv.toLowerCase()));
            if (match) return match;
        }

        return 'Generic';
    };

    const detectCategory = (data, getValue) => {
        // 1. Explicit Column - DISABLED to force validation against rules
        /*
        let c = getValue(['categories', 'category', 'type']);
        if (c) {
            // Check if it matches any known category name EXACTLY
            const rule = CATEGORY_RULES.find(r => r.name.toLowerCase() === c.toLowerCase().trim());
            if (rule) return rule.name;
        }
        */

        // 2. Inference from Name/Tags
        const name = getValue(['name', 'title', 'product name']) || "";
        const tags = getValue(['tags', 'tag']) || "";
        const searchStr = (name + " " + tags).toLowerCase();

        for (const rule of CATEGORY_RULES) {
            // Use word boundary check to avoid partial matches (e.g. "sma" in "smart")
            const hasMatch = rule.keywords.some(k => {
                // Escape special regex chars
                const safeK = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Create regex for "whole word" match
                const regex = new RegExp(`(?:^|\\s|\\W)${safeK}(?:$|\\s|\\W)`, 'i');
                return regex.test(searchStr);
            });

            if (hasMatch) {
                return rule.name;
            }
        }

        return 'Accessories'; // Default fallback if nothing detected
    };

    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            // Helper to get case-insensitive value
            const keys = Object.keys(data);
            const getValue = (candidates) => {
                const key = keys.find(k => candidates.includes(k.toLowerCase().trim()));
                return key ? data[key] : null;
            }

            const name = getValue(['name', 'title', 'product name', 'item name']);
            let priceVal = getValue(['sale price']);
            if (!priceVal || isNaN(parseFloat(priceVal))) {
                priceVal = getValue(['price', 'regular price', 'amount', 'cost']);
            }
            const description = getValue(['description', 'desc', 'details', 'short description']);
            const stock = getValue(['stock', 'quantity', 'inventory']);
            const sku = getValue(['sku', 'id', 'product id']);

            // INTELLIGENT DETECTION
            const vendor = detectVendor(data, getValue);
            const category = detectCategory(data, getValue);

            let image = getValue(['images', 'image', 'photo']);

            // Fallback: Scan ALL values for an image URL if column lookup failed
            if (!image) {
                const values = Object.values(data);
                for (const val of values) {
                    if (val && typeof val === 'string' && val.includes('http') && (val.includes('.jpg') || val.includes('.png') || val.includes('.jpeg') || val.includes('.webp'))) {
                        // Found a candidate!
                        image = val;
                        break;
                    }
                }
            }

            // Clean up: If multiple images in the string, take the first one
            let mainImage = '';
            let allImages = [];

            if (image) {
                // Determine split char (comma is standard)
                if (image.includes(',')) {
                    allImages = image.split(',').map(i => i.trim()).filter(i => i.length > 0);
                    mainImage = allImages[0];
                } else {
                    mainImage = image;
                    allImages = [image];
                }
            }

            if (name && priceVal && !isNaN(parseFloat(priceVal))) {
                let stockCount = parseInt(stock);
                if (isNaN(stockCount)) stockCount = 0;

                results.push({
                    name: name,
                    price: parseFloat(priceVal),
                    description: description || '',
                    category: category || 'Uncategorized',
                    vendor: vendor || '',
                    stock: stockCount,
                    sku: sku || `SKU-${Date.now()}-${Math.random()}`,
                    imageUrl: mainImage || '',
                    images: allImages
                });
            }
        })
        .on('end', async () => {
            if (!isDbConnected()) {
                localProducts = results;
                console.log(`✅ Loaded ${results.length} products into Memory from ${filePath}`);
            } else {
                // Optional: Check duplication before insert
                try {
                    // FORCE CLEAR DB to ensure new parsing logic applies (images)
                    await Product.deleteMany({});
                    console.log('Cleared existing products for fresh seed.');

                    await Product.insertMany(results);
                    console.log(`✅ Seeded ${results.length} products into DB from ${filePath}`);
                } catch (e) { console.error('Seeding error:', e.message); }
            }
        });
};

exports.uploadProducts = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            // Helper to get case-insensitive value
            const keys = Object.keys(data);
            const getValue = (candidates) => {
                const key = keys.find(k => candidates.includes(k.toLowerCase().trim()));
                return key ? data[key] : null;
            }

            const name = getValue(['name', 'title', 'product name', 'item name']);

            // Try specific price columns in order of preference
            let priceVal = getValue(['sale price']);
            if (!priceVal || isNaN(parseFloat(priceVal))) {
                priceVal = getValue(['price', 'regular price', 'amount', 'cost']);
            }

            const description = getValue(['description', 'desc', 'details', 'short description']);
            const stock = getValue(['stock', 'quantity', 'inventory', 'in stock?']);
            const sku = getValue(['sku', 'id', 'product id']);
            const image = getValue(['images', 'image', 'photo']);

            if (name && priceVal && !isNaN(parseFloat(priceVal))) {
                // Handle "In Stock?" column which might say "10" or "In stock"
                let stockCount = parseInt(stock);
                if (isNaN(stockCount)) stockCount = 0;

                results.push({
                    name: name,
                    price: parseFloat(priceVal),
                    description: description || '',
                    stock: stockCount,
                    sku: sku || `SKU-${Date.now()}-${Math.random()}`,
                    imageUrl: image ? image.split(',')[0].trim() : '' // Take first image if comma separated
                });
            }
        })
        .on('end', async () => {
            try {
                if (!isDbConnected()) {
                    console.log('Using In-Memory Product Store');
                    localProducts.push(...results);
                    fs.unlinkSync(req.file.path);
                    return res.status(200).json({ message: 'Products uploaded (Memory)', count: results.length });
                }

                await Product.insertMany(results);
                fs.unlinkSync(req.file.path);
                res.status(200).json({ message: 'Products uploaded successfully', count: results.length });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error saving products', error: error.message });
            }
        })
        .on('error', (error) => {
            console.error(error);
            res.status(500).json({ message: 'Error processing csv' });
        });
};
