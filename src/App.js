import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import client from "./apollo";

import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/all" />}
            />
            <Route
              path="/:categoryName"
              element={<Categories />}
            />
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  }
};

export default App;