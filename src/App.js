import React from "react";
import "./App.css";
import "@atlaskit/css-reset";
import Container from "./components/Container";
import Survey from "./Survey";
import { Provider } from "react-redux";
import store from "./store";

// Fake date
import { fetchSurveyConfig } from "./Survey/api";

const App = () => (
  <Provider store={store}>
    <Container>
      <Survey />
    </Container>
  </Provider>
);

export default App;
