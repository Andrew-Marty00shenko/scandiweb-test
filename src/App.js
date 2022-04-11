import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./apollo";

import All from "./components/Categories/All/All";
import Clothes from "./components/Categories/Clothes/Clothes";
import Tech from "./components/Categories/Tech/Tech";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
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
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  }
}

export default App;