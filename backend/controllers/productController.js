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
            // Helper to get case-insensitive value, prioritizing specific column names
            const keys = Object.keys(data);
            const getValue = (candidates) => {
                for (const candidate of candidates) {
                    const key = keys.find(k => k.toLowerCase().trim() === candidate);
                    if (key && data[key] && data[key].trim() !== '') return data[key];
                }
                return null;
            }

            const name = getValue(['name', 'title', 'product name', 'item name']);
            let priceVal = getValue(['sale price']);
            if (!priceVal || isNaN(parseFloat(priceVal))) {
                priceVal = getValue(['price', 'regular price', 'amount', 'cost']);
            }
            // Prioritize main description over short description
            const description = getValue(['description', 'desc', 'details', 'short description']);
            const stock = getValue(['stock', 'quantity', 'inventory']);
            const sku = getValue(['sku', 'id', 'product id']);

            // INTELLIGENT DETECTION
            const vendor = detectVendor(data, getValue);
            const category = detectCategory(data, getValue);

            // Intelligent Image Detection
            // Common CSV headers: 'Image Src', 'Variant Image', 'Featured Image', 'Image', 'Photo'
            let image = getValue(['image src', 'variant image', 'featured image', 'images', 'image', 'photo', 'img', 'picture']);

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
                // Determine split char (comma, semicolon, pipe, space if multiple urls?)
                if (/[,\n;|]/.test(image)) {
                    allImages = image.split(/[,\n;|]/).map(i => i.trim()).filter(i => i.length > 0 && (i.startsWith('http') || i.startsWith('/')));
                    if (allImages.length > 0) mainImage = allImages[0];
                    else mainImage = image; // fallback
                } else {
                    mainImage = image;
                    allImages = [image];
                }
            }

            // Image Fallback: If still empty, use placeholder
            if (!mainImage || mainImage.length < 5) {
                const shortName = name ? name.split(' ').slice(0, 3).join('+') : 'Product';
                mainImage = `https://placehold.co/600x400/EEE/31343C?font=lora&text=${shortName}`;
                allImages = [mainImage];
            }

            // CLEAN AND FORMAT DESCRIPTION
            let cleanDescription = description || '';

            // Helper to clean and format text
            const formatDescription = (desc) => {
                if (!desc) return '';
                let d = desc.trim();

                // 1. GLOBAL CLEANUP (Fixes \n artifacts and duplicate titles)
                d = d.replace(/&nbsp;ass="[^"]*">/g, '');
                d = d.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
                d = d.replace(/\\\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '');

                // Remove duplicate title if it appears at the start (ignoring case)
                // Remove duplicate title if it appears at the start (ignoring case)
                // We handle potential HTML tags wrapping the title as well.
                let cleanName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars

                // Regex: Matches start of string, optional whitespace/newlines/tags, then the Name, then optional closing tags/newlines
                // We make it loop twice to check for double headers.
                for (let i = 0; i < 3; i++) {
                    const titleRegex = new RegExp(`^\\s*(?:<(?:div|h[1-6]|p|b|strong|span)[^>]*>\\s*)*${cleanName}\\s*(?:<\/(?:div|h[1-6]|p|b|strong|span)>\\s*)*(?:<br\\s*\/?>|\\n)*`, 'i');
                    if (titleRegex.test(d)) {
                        d = d.replace(titleRegex, '').trim();
                    } else {
                        break;
                    }
                }

                // If mostly HTML already, just return as is (but maybe strip title if present)
                if (d.includes('<ul') || d.includes('<div') || d.includes('<table') || d.includes('<h')) {
                    return d;
                }

                // If it looks like plain text or partial HTML
                // Remove initial garbage like "&nbsp;ass=..."
                d = d.replace(/&nbsp;ass="[^"]*">/g, '');
                d = d.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');

                // Decode literal "\n" and "\\n" to actual newlines
                // Handle multiple variations of escaped newlines common in CSVs
                d = d.replace(/\\\\n/g, '\n'); // Double backslash n
                d = d.replace(/\\n/g, '\n');   // Single backslash n
                d = d.replace(/\\r/g, '');     // Remove literal \r

                // Splitlines
                let lines = d.split(/\n|<br>|<br\/>/).map(l => l.trim()).filter(l => l);

                // Remove lines if they match the product name (duplicate title)
                // Use while to remove MULTIPLE duplicate headers if present
                cleanName = name.trim().toLowerCase();
                while (lines.length > 0) {
                    const lineLower = lines[0].toLowerCase();
                    // Check if line is roughly equal to name, or contained in name, or name contains line (if line is long enough)
                    if (lineLower === cleanName || (lineLower.length > 10 && cleanName.includes(lineLower)) || (lineLower.length > 10 && lineLower.includes(cleanName))) {
                        lines.shift();
                    } else if (lineLower === '\\n' || lineLower === '"' || lineLower.replace(/\\/g, '') === 'n') {
                        // Also remove lines that are just artifacts like "\n" or quotes
                        lines.shift();
                    } else {
                        break;
                    }
                }

                let formatted = '';
                let inList = false;
                let hasFeaturesHeader = false;
                let hasDetailsHeader = false;

                lines.forEach((line, index) => {
                    // Check common "Features" headers in text
                    if (line.toLowerCase() === 'features' || line.toLowerCase() === 'features:') {
                        if (inList) { formatted += '</ul>'; inList = false; }
                        if (!hasFeaturesHeader) {
                            formatted += '<h3>Features</h3>';
                            hasFeaturesHeader = true;
                        }
                        return; // Skip adding the line itself
                    }

                    // Check for bullet points
                    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
                        if (!inList) {
                            if (!hasFeaturesHeader) {
                                formatted += '<h3>Features</h3>';
                                hasFeaturesHeader = true;
                            }
                            formatted += '<ul>';
                            inList = true;
                        }
                        // Remove the bullet char
                        let listContent = line.substring(1).trim();
                        if (listContent) formatted += `<li>${listContent}</li>`;
                    }
                    // Check for Key: Value patterns (Specifications)
                    else if (line.includes(':') && line.length < 100 && !line.includes('http') && !line.endsWith(':')) {
                        if (inList) {
                            formatted += '</ul>';
                            inList = false;
                        }

                        if (!hasDetailsHeader) {
                            formatted += '<h3>Product Details</h3>';
                            hasDetailsHeader = true;
                        }

                        const parts = line.split(':');
                        const key = parts[0].trim();
                        const val = parts.slice(1).join(':').trim();

                        formatted += `<div class="spec-row"><strong>${key}:</strong> ${val}</div>`;
                    }
                    // Normal text paragraph
                    else {
                        if (inList) {
                            formatted += '</ul>';
                            inList = false;
                        }
                        // If line is just "Product Details" or similar
                        if (line.toLowerCase().includes('product details') || line.toLowerCase().includes('specifications')) {
                            // Treat as header check
                            if (!hasDetailsHeader) {
                                formatted += '<h3>Product Details</h3>';
                                hasDetailsHeader = true;
                            }
                        } else {
                            // avoid printing just "\n"
                            if (line.trim() !== '\\n') {
                                formatted += `<p>${line}</p>`;
                            }
                        }
                    }
                });

                if (inList) formatted += '</ul>';
                return formatted;
            };

            cleanDescription = formatDescription(cleanDescription);


            // PARSE SPECIFICATIONS (Attributes)
            const specifications = {};
            // Look for "Attribute X name" and "Attribute X value(s)"
            // We'll scan up to 20 attributes to be safe
            for (let i = 1; i <= 20; i++) {
                const nameKey = getValue([`attribute ${i} name`]);
                const valKey = getValue([`attribute ${i} value(s)`]);

                if (nameKey && valKey && nameKey.trim() && valKey.trim()) {
                    specifications[nameKey.trim()] = valKey.trim();
                }
            }

            if (name && priceVal && !isNaN(parseFloat(priceVal))) {
                let stockCount = parseInt(stock);
                if (isNaN(stockCount)) stockCount = 0;

                results.push({
                    name: name,
                    price: parseFloat(priceVal),
                    description: cleanDescription,
                    category: category || 'Uncategorized',
                    vendor: vendor || '',
                    stock: stockCount,
                    sku: sku || `SKU-${Date.now()}-${Math.random()}`,
                    imageUrl: mainImage || '',
                    images: allImages,
                    specifications: specifications
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
            // Helper to get case-insensitive value, prioritizing specific column names
            const keys = Object.keys(data);
            const getValue = (candidates) => {
                for (const candidate of candidates) {
                    const key = keys.find(k => k.toLowerCase().trim() === candidate);
                    if (key && data[key] && data[key].trim() !== '') return data[key];
                }
                return null;
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
            const image = getValue(['image src', 'variant image', 'featured image', 'images', 'image', 'photo', 'img', 'picture']);

            // CLEAN AND FORMAT DESCRIPTION
            let cleanDescription = description || '';

            // Helper to clean and format text
            const formatDescription = (desc) => {
                if (!desc) return '';
                let d = desc.trim();

                // If mostly HTML already, just return as is (but maybe strip title if present)
                if (d.includes('<ul') || d.includes('<div') || d.includes('<table') || d.includes('<h')) {
                    // Check if the title is embedded at the start (common in some exports)
                    const titleRegex = new RegExp(`^<h[1-6]>${name}</h[1-6]>`, 'i');
                    d = d.replace(titleRegex, '');
                    return d;
                }

                // If it looks like plain text or partial HTML
                // Remove initial garbage like "&nbsp;ass=..."
                d = d.replace(/&nbsp;ass="[^"]*">/g, '');
                d = d.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');

                // Decode literal "\n" to actual newlines if present
                d = d.replace(/\\n/g, '\n');

                // Splitlines
                let lines = d.split(/\n|<br>|<br\/>/).map(l => l.trim()).filter(l => l);

                // Remove line if it matches the product name (duplicate title)
                if (lines.length > 0 && lines[0].toLowerCase() === name.toLowerCase()) {
                    lines.shift();
                }

                let formatted = '';
                let inList = false;
                let hasFeaturesHeader = false;
                let hasDetailsHeader = false;

                lines.forEach((line, index) => {
                    // Check common "Features" headers in text
                    if (line.toLowerCase() === 'features' || line.toLowerCase() === 'features:') {
                        if (inList) { formatted += '</ul>'; inList = false; }
                        if (!hasFeaturesHeader) {
                            formatted += '<h3>Features</h3>';
                            hasFeaturesHeader = true;
                        }
                        return; // Skip adding the line itself
                    }

                    // Check for bullet points
                    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
                        if (!inList) {
                            if (!hasFeaturesHeader) {
                                formatted += '<h3>Features</h3>';
                                hasFeaturesHeader = true;
                            }
                            formatted += '<ul>';
                            inList = true;
                        }
                        // Remove the bullet char
                        let listContent = line.substring(1).trim();
                        if (listContent) formatted += `<li>${listContent}</li>`;
                    }
                    // Check for Key: Value patterns (Specifications)
                    else if (line.includes(':') && line.length < 100 && !line.includes('http') && !line.endsWith(':')) {
                        if (inList) {
                            formatted += '</ul>';
                            inList = false;
                        }

                        if (!hasDetailsHeader) {
                            formatted += '<h3>Product Details</h3>';
                            hasDetailsHeader = true;
                        }

                        const parts = line.split(':');
                        const key = parts[0].trim();
                        const val = parts.slice(1).join(':').trim();

                        formatted += `<div class="spec-row"><strong>${key}:</strong> ${val}</div>`;
                    }
                    // Normal text paragraph
                    else {
                        if (inList) {
                            formatted += '</ul>';
                            inList = false;
                        }
                        // If line is just "Product Details" or similar
                        if (line.toLowerCase().includes('product details') || line.toLowerCase().includes('specifications')) {
                            // Treat as header check
                            if (!hasDetailsHeader) {
                                formatted += '<h3>Product Details</h3>';
                                hasDetailsHeader = true;
                            }
                        } else {
                            formatted += `<p>${line}</p>`;
                        }
                    }
                });

                if (inList) formatted += '</ul>';
                return formatted;
            };

            cleanDescription = formatDescription(cleanDescription);

            // PARSE SPECIFICATIONS (Attributes) when uploading via CSV
            const specifications = {};
            // Look for "Attribute X name" and "Attribute X value(s)"
            // We'll scan up to 20 attributes to be safe
            for (let i = 1; i <= 20; i++) {
                const nameKey = getValue([`attribute ${i} name`]);
                const valKey = getValue([`attribute ${i} value(s)`]);

                if (nameKey && valKey && nameKey.trim() && valKey.trim()) {
                    specifications[nameKey.trim()] = valKey.trim();
                }
            }

            if (name && priceVal && !isNaN(parseFloat(priceVal))) {
                // Handle "In Stock?" column which might say "10" or "In stock"
                let stockCount = parseInt(stock);
                if (isNaN(stockCount)) stockCount = 0;

                // Image Fallback:
                // 1. Try to find valid image in CSV columns
                let finalImage = image ? image.split(/[,\n;|]/)[0].trim() : '';

                // 2. If no image found, generate a dynamic placeholder with the product name
                if (!finalImage || finalImage.length < 5) { // <5 to filter out "N/A" or garbage
                    const shortName = name.split(' ').slice(0, 3).join('+'); // First 3 words
                    finalImage = `https://placehold.co/600x400/EEE/31343C?font=lora&text=${shortName}`;
                }

                results.push({
                    name: name,
                    price: parseFloat(priceVal),
                    description: cleanDescription,
                    stock: stockCount,
                    sku: sku || `SKU-${Date.now()}-${Math.random()}`,
                    imageUrl: finalImage,
                    specifications: specifications
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
