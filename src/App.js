import React from "react";
import "./App.css";
import "@atlaskit/css-reset";
import Container from "./components/Container";
import Survey from "./Survey";
import { Provider } from "react-redux";
import store from "./store";

// Fake date
import { fetchSurveyConfig } from "./Survey/api";

const fakeData = {
  data: {
    publicForm: {
      publicFormSettings: {
        organizationName: "Pipefy Recruitment Test",
        submitButtonText: "Submit",
        title: "Recruitment Survey"
      },
      formFields: [
        {
          id: "your_name",
          label: "Your name",
          __typename: "ShortTextField"
        },
        {
          id: "your_bio",
          label: "Your Bio",
          __typename: "LongTextField"
        },
        {
          id: "primary_skill",
          label: "Primary Skill",
          options: [
            "Structured Programming",
            "Object-oriented Programming",
            "Functional Programming"
          ],
          __typename: "SelectField"
        },
        {
          id: "javascript_library_of_choice",
          label: "Javascript library of choice",
          options: ["React", "Angular", "Vue"],
          __typename: "RadioVerticalField"
        },
        {
          id: "additional_experience",
          label: "Additional Experience",
          options: ["TDD", "Heroku", "Github"],
          __typename: "ChecklistVerticalField"
        },
        {
          id: "start_date",
          label: "Start Date",
          __typename: "DateField"
        }
      ]
    }
  }
};

fetchSurveyConfig.impl = () => Promise.resolve(fakeData);

const App = () => (
  <Provider store={store}>
    <Container>
      <Survey />
    </Container>
  </Provider>
);

export default App;
