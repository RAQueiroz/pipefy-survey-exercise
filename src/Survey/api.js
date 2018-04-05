export const fetchSurveyConfig = () => {
  if (fetchSurveyConfig.impl) {
    return fetchSurveyConfig.impl();
  }

  // TODO: implement real api call
  return Promise.resolve(null);
};

export const submitSurvey = fields => {
  if (submitSurvey.impl) {
    return submitSurvey.impl(fields);
  }

  // TODO: call graphql api for survey submitting
  return Promise.resolve(null);
};
