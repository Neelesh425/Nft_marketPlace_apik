// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve HTML, CSS, JS

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Route: Fetch NFTs for a collection
app.get('/api/nfts', async (req, res) => {
    const { contractAddress } = req.query;

    if (!contractAddress || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
        return res.status(400).json({ error: 'Invalid contract address' });
    }

    const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API_KEY}/getNFTsForCollection`;
    
    try {
        const response = await axios.get(ALCHEMY_URL, {
            params: {
                contractAddress,
                withMetadata: true,
                limit: 12
            }
        });

        const nfts = response.data.nfts.map(nft => ({
            name: nft.name || nft.title || `NFT #${nft.tokenId}`,
            tokenId: nft.tokenId,
            image: nft.image?.pngUrl || nft.image?.cachedUrl || nft.image?.originalUrl || '',
            description: nft.description || 'No description',
            collection: nft.collection?.name || 'Unknown Collection',
            attributes: nft.raw?.metadata?.attributes || []
        }));

        res.json({ nfts });
    } catch (error) {
        console.error('Error fetching NFTs:', error.message);
        res.status(500).json({ error: 'Failed to fetch NFTs. Check contract address or try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});