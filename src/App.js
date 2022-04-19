import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import client from "./apollo";

import All from "./components/Categories/All/All";
import Clothes from "./components/Categories/Clothes/Clothes";
import Tech from "./components/Categories/Tech/Tech";
import Header from "./components/Header/Header";
import ProductPage from "./components/ProductPage/ProductPage";

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/all" />} />
            <Route
              path="/all"
              element={<All />}
            />
            <Route
              path="/clothes"
              element={<Clothes />}
            />
            <Route
              path="/tech"
              element={<Tech />}
            />
            <Route
              path="/product/:id"
              element={<ProductPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  }
}

export default App;