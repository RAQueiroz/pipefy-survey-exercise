import { request } from "graphql-request";
import { FETCH_SURVEY_CONFIG_FAILURE } from "./actionsTypes";

const ENTRY_POINT = "https://app.pipefy.com/public_api";

export const fetchSurveyConfig = () => {
  if (fetchSurveyConfig.impl) {
    return fetchSurveyConfig.impl();
  }

  const query = `
    {
      publicForm(formId: "1lf_E0x4") {
        publicFormSettings {
          organizationName
          submitButtonText
          title
        }
    
        formFields {
          ...on ShortTextField {
            id
            label
          }
          ...on LongTextField {
            id
            label
          }
          ...on SelectField {
            id
            label
            options
          }
          ...on RadioVerticalField {
            id
            label
            options
          }
          ...on ChecklistVerticalField {
            id
            label
            options
          }
          ...on DateField {
            id
            label
          }
          __typename
        }
      }
    }
  `;

  return request(ENTRY_POINT, query);
};

export const submitSurvey = fields => {
  if (submitSurvey.impl) {
    return submitSurvey.impl(fields);
  }

  const query = `
    mutation submitSurvey($filledFields: [FilledField]!) {
      submitPublicForm(input: {
        formId: "1lf_E0x4",
        filledFields: $filledFields
      }) {
        repoItem {
          id
          title
        }
      }
    }
  `;

  return request(ENTRY_POINT, query, {
    filledFields: fields
  });
};
