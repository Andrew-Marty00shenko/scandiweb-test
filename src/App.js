import { Component } from "react";

import Header from "./components/Header/Header";

import { Wrapper } from "./Styled";

class App extends Component {
  render() {
    return <Wrapper>
      <Header />
    </Wrapper>
  }
}

export default App;