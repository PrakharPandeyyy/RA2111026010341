import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      {/* Display product details here */}
    </Container>
  );
};

export default ProductDetailsPage;
