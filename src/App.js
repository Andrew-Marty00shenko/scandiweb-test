import { ApolloProvider } from "@apollo/client";
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import client from "./apollo";

import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  }
}

export default App;