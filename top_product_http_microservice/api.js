const express = require('express');
const axios = require('axios');

const app = express();
const TEST_SERVER_BASE_URL = 'http://20.244.56.144/test';


app.use(express.json());

app.get('companies/:companyname/categories/:categoryName/products', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const { companyname } = req.params;

    const testServerUrl = `${TEST_SERVER_BASE_URL}/companies/${companyname}/categories/${categoryName}`;
    
    const response = await axios.get(testServerUrl);
    const products = response.data;

    products.forEach(product => {
      product.customId = Math.random().toString(36).substring(7);
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
