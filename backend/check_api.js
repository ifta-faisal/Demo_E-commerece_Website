const axios = require('axios');

async function checkApi() {
    try {
        console.log('Fetching products from API...');
        const res = await axios.get('http://localhost:5000/api/products');
        const products = res.data;
        console.log(`Received ${products.length} products.`);

        if (products.length > 0) {
            console.log('--- First Product ---');
            console.log('Name:', products[0].name);
            console.log('Image URL:', products[0].imageUrl);
            console.log('Price:', products[0].price);
            console.log('---------------------');

            const withImages = products.filter(p => p.imageUrl && p.imageUrl.length > 0);
            console.log(`Products with non-empty imageUrl: ${withImages.length} / ${products.length}`);
        }
    } catch (e) {
        console.error('API Check Failed:', e.message);
    }
}

checkApi();
