import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./apollo";

import Categories from "./components/Categories/Categories";
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
              element={<Categories />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  }
}

export default App;