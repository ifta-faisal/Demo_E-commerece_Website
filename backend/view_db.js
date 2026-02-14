const mongoose = require('mongoose');
require('dotenv').config();

const viewData = async () => {
    try {
        console.log('Connecting to database...');
        // Try connecting
        try {
            await mongoose.connect(process.env.MONGO_URI);
        } catch (e) {
            const newUri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
            await mongoose.connect(newUri);
        }

        console.log('Connected! Fetching collections...');

        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections fund:', collections.map(c => c.name).join(', '));

        // Check Products
        const productCollection = mongoose.connection.db.collection('products');
        const count = await productCollection.countDocuments();
        console.log(`\nTotal Products: ${count}`);

        if (count > 0) {
            console.log('--- First 3 Products ---');
            const samples = await productCollection.find().limit(3).toArray();
            samples.forEach((p, i) => {
                console.log(`\nProduct #${i + 1}:`);
                console.log(`  Name: ${p.name}`);
                console.log(`  Price: $${p.price}`);
                console.log(`  SKU: ${p.sku}`);
                console.log(`  Image: ${p.imageUrl ? p.imageUrl.substring(0, 40) + '...' : 'None'}`);
                console.log(`  Images Array: ${p.images ? p.images.length : 0} items`);
            });
        }

        mongoose.disconnect();

    } catch (err) {
        console.error('Error viewing data:', err);
    }
};

viewData();
