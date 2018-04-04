export const fetchSurveyConfig = () => {
  if (fetchSurveyConfig.impl) {
    return fetchSurveyConfig.impl();
  }

  // TODO: implement real api call
  return Promise.resolve(null);
};
