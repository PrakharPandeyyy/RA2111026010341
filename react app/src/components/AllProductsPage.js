
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from backend API
    // Example: fetch('backend-url/categories/all/products')
    //   .then(response => response.json())
    //   .then(data => setProducts(data));
    // Replace 'backend-url' with your backend server URL
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllProductsPage;
