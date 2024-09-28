const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors()); 

// CoinMarketCap API Key
const CMC_API_KEY = '56f87733-313e-48c1-a2ab-4de1ec08f923'; // Your CoinMarketCap API key

// Route to fetch the latest cryptocurrency listings
app.get('/api/listings/latest', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': "56f87733-313e-48c1-a2ab-4de1ec08f923",
      },
    });
    res.json(response.data.data); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Failed to fetch data' });  
  }
});
app.get('/api/cryptocurrency/info/:slug', async (req, res) => {
  const slug = req.params.slug; // Extract slug from URL parameters
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${slug}`, {
      headers: {
        'X-CMC_PRO_API_KEY': "56f87733-313e-48c1-a2ab-4de1ec08f923", // 
      },
    });
    res.json(response.data.data); 
  } catch (error) {
    console.error(error); 
    res.status(500).send('Error retrieving cryptocurrency info');
  }
});
app.get("/api/exchange/:amount/:id",async(req,res)=>{
    const {amount, id} = req.params;
    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&id=${id}`, {
          headers: {
            'X-CMC_PRO_API_KEY': "56f87733-313e-48c1-a2ab-4de1ec08f923", 
          },
        });
        res.json(response.data.data); 
      } catch (error) {
        console.error(error); 
        res.status(500).send('Error retrieving cryptocurrency info');
      }

})

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
