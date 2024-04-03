

import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const ProductDetailsPage = () => {
  const { productId } = useParams();

  // Fetch product details by productId from backend API
  // Example: fetch(`backend-url/categories/all/products/${productId}`)
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // Replace 'backend-url' with your backend server URL

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      {/* Display product details here */}
    </Container>
  );
}

export default ProductDetailsPage;
