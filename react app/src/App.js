import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllProductsPage from "./components/AllProductsPage";
import ProductDetailsPage from "./components/ProductDetailsPage";

const App = () => {
  return (
    <Router>
        <Route exact path="/" component={AllProductsPage} />
        <Route path="/product/:productId" component={ProductDetailsPage} />
    </Router>
  );
};

export default App;
