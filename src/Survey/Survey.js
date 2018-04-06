import React, { Component } from "react";
import "./Survey.css";
import PropTypes from "prop-types";
import { FieldTextStateless } from "@atlaskit/field-text";
import { FieldTextAreaStateless } from "@atlaskit/field-text-area";
import SelectField from "./SelectField";
import RadioGroupField from "./RadioGroupField";
import ChecklistField from "./ChecklistField";
import DateField from "./DateField";
import Button from "@atlaskit/button";
import { connect } from "react-redux";
import * as actions from "./actions";

export class Survey extends Component {
  static propTypes = {
    survey: PropTypes.array.isRequired,
    surveyData: PropTypes.object.isRequired,
    surveySubmit: PropTypes.object.isRequired,
    fetchSurveyConfig: PropTypes.func.isRequired,
    updateSurveyData: PropTypes.func.isRequired,
    resetSurveyData: PropTypes.func.isRequired,
    submitSurvey: PropTypes.func.isRequired,
    resetSubmitStatus: PropTypes.func.isRequired
  };

  static defaultProps = {
    survey: [],
    surveyData: {},
    surveySubmit: {},
    fetchSurveyConfig: () => {},
    updateSurveyData: () => {},
    resetSurveyData: () => {},
    submitSurvey: () => {},
    resetSubmitStatus: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this._handleCloseSubmitSuccess = this._handleCloseSubmitSuccess.bind(this);
    this._handleCloseSubmitFail = this._handleCloseSubmitFail.bind(this);
  }

  componentDidMount() {
    this.props.fetchSurveyConfig();
  }

  render() {
    // Dynamically creates the form fields based on the formFields property
    const { surveyConfig, surveyData, surveySubmit } = this.props;

    if (surveyConfig.status === "loading") return <LoadingContainer />;
    if (surveyConfig.status === "fail") return <LoadingFailContainer />;

    if (surveyConfig.status === "success") {
      if (surveySubmit.status === "submitting")
        return <SurveySubmittingContainer />;

      if (surveySubmit.status === "fail")
        return (
          <SurveySubmitFailContainer
            onRequestClose={this._handleCloseSubmitFail}
          />
        );

      if (surveySubmit.status === "success")
        return (
          <SurveySubmitSuccessContainer
            onRequestClose={this._handleCloseSubmitSuccess}
          />
        );

      const publicForm = surveyConfig.data.publicForm;
      return (
        <section className="Survey">
          <SurveyDescription
            organizationName={publicForm.publicFormSettings.organizationName}
            title={publicForm.publicFormSettings.title}
          />
          <SurveyForm
            formFields={publicForm.formFields}
            surveyData={surveyData}
            submitButtonText={publicForm.publicFormSettings.submitButtonText}
            onInputFieldChange={this.onInputFieldChange}
            onSubmitSurvey={this.onSubmitForm}
          />
        </section>
      );
    }

    return null;
  }

  _handleCloseSubmitSuccess() {
    this.props.resetSurveyData();
    this.props.resetSubmitStatus();
  }

  _handleCloseSubmitFail() {
    this.props.resetSubmitStatus();
  }

  onInputFieldChange(fieldId, fieldValue) {
    this.props.updateSurveyData(fieldId, fieldValue);
  }

  onSubmitForm() {
    this.props.submitSurvey();
  }
}

function buildFormField(type) {
  switch (type) {
    case "ShortTextField":
      return ShortTextField;
    case "LongTextField":
      return LongTextField;
    case "SelectField":
      return SelectField;
    case "RadioVerticalField":
      return RadioGroupField;
    case "ChecklistVerticalField":
      return ChecklistField;
    case "DateField":
      return DateField;
    default:
      return null;
  }
}

export const SurveyDescription = ({ organizationName, title }) => (
  <div className="SurveyDescription">
    <h1>{organizationName}</h1>
    <h2>{title}</h2>
  </div>
);

export const SurveyForm = ({
  formFields,
  surveyData,
  submitButtonText,
  onInputFieldChange,
  onSubmitSurvey
}) => {
  const submitForm = e => {
    e.preventDefault();
    onSubmitSurvey();
  };

  const fields = formFields.map(({ __typename: type, ...props }) => {
    const FormField = buildFormField(type);
    return (
      <FormField
        key={props.id}
        value={surveyData[props.id]}
        onChange={onInputFieldChange}
        {...props}
      />
    );
  });
  return (
    <form onSubmit={submitForm} className="SurveyForm">
      {fields}
      <Button className="SubmitButton" appearance={"primary"} type="submit">
        {submitButtonText}
      </Button>
    </form>
  );
};

export const LoadingContainer = () => (
  <div className="LoadingContainer">Fetching survey data...</div>
);

export const LoadingFailContainer = () => (
  <div className="FailContainer">
    An error ocurred during the survey data fetching!
  </div>
);

export const SurveySubmittingContainer = () => (
  <div className="SurveySubmittingContainer">
    <h1>Submitting your survey...</h1>
  </div>
);

export const SurveySubmitSuccessContainer = ({ onRequestClose }) => (
  <div className="SurveySubmitSuccessContainer">
    <h1>Survey submitted with success!</h1>
    <Button onClick={onRequestClose}>Close</Button>
  </div>
);

export const SurveySubmitFailContainer = ({ onRequestClose }) => (
  <div className="SurveySubmitFailContainer">
    <h1>An error ocurred during your submission.</h1>
    <Button onClick={onRequestClose}>Try again!</Button>
  </div>
);

export const ShortTextField = ({ onChange, value, ...rest }) => (
  <FieldTextStateless
    {...rest}
    shouldFitContainer={true}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

export const LongTextField = ({ onChange, value, ...rest }) => (
  <FieldTextAreaStateless
    {...rest}
    shouldFitContainer={true}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

function mapStateToProps(state) {
  return {
    surveyConfig: state.survey.config,
    surveyData: state.survey.data,
    surveySubmit: state.survey.submit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSurveyConfig: () => dispatch(actions.fetchSurveyConfig()),
    updateSurveyData: (fieldId, fieldValue) =>
      dispatch(actions.updateSurveyData(fieldId, fieldValue)),
    resetSurveyData: () => dispatch(actions.resetSurveyData()),
    submitSurvey: fields => dispatch(actions.submitSurvey(fields)),
    resetSubmitStatus: () => dispatch(actions.resetSubmitStatus())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);

export { default as Select } from "./SelectField";
export { default as RadioGroupField } from "./RadioGroupField";
export { default as ChecklistField } from "./ChecklistField";
export { default as DateField } from "./DateField";
