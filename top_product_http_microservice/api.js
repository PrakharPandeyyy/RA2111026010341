const express = require('express');
const axios = require('axios'); // For making HTTP requests

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

// In-memory cache for product data (replace with a proper caching solution)
const productCache = {};

async function getProductsFromCompany(company, category, params) {
  const url = `http://20.244.56.144/test/companies/<span class="math-inline">\{company\}/categories/</span>{category}/products`;
  const response = await axios.get(url, { params });
  return response.data;
}

// Function to merge product data from all companies
async function getProducts(category, top, page, sort, order, minPrice, maxPrice) {
  const allProducts = [];
  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

  for (const company of companies) {
    const params = { top, minPrice, maxPrice };
    if (sort) params.sort = sort;
    if (order) params.order = order;
    if (page) params.page = page;

    const cacheKey = `<span class="math-inline">{company}-</span>{category}-${JSON.stringify(params)}`;
    let products;

    if (productCache[cacheKey]) {
      products = productCache[cacheKey];
    } else {
      products = await getProductsFromCompany(company, category, params);
      productCache[cacheKey] = products;
    }

    allProducts.push(...products);
  }

  return allProducts;
}

function generateProductId(product) {
  const { company, category, ...rest } = product;
  return `<span class="math-inline">\{company\}\-</span>{category}-${JSON.stringify(rest)}`;
}
function findProductById(productId) {
  for (const product of Object.values(productCache)) {
    if (generateProductId(product) === productId) {
      return product;
    }
  }
  return null;
}

app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const top = parseInt(req.query.top) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort;
  const order = req.query.order;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  try {
    const products = await getProducts(categoryname, top, page, sort, order, minPrice, maxPrice);

    if (top > 10) {
      const startIndex = (page - 1) * top;
      const endIndex = Math.min(startIndex + top, products.length);
      const paginatedProducts = products.slice(startIndex, endIndex);

      res.json({
        products: paginatedProducts.map(product => ({ ...product, id: generateProductId(product) })),
        pagination: {
          page,
          totalPages: Math.ceil(products.length / top),
        },
      });
    } else {
      res.json({ products: products.map(product => ({ ...product, id: generateProductId(product) })) });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for specific product details
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  const product = findProductById(productid);

  if (product) {
    res.json({ ...product, id: productid });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));