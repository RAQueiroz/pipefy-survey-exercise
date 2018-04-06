import React, { Component } from "react";
import PropTypes from "prop-types";
import { FieldTextStateless } from "@atlaskit/field-text";
import { FieldTextAreaStateless } from "@atlaskit/field-text-area";
import SelectField from "./SelectField";
import RadioGroupField from "./RadioGroupField";
import ChecklistField from "./ChecklistField";
import DateField from "./DateField";
import { connect } from "react-redux";
import * as actions from "./actions";

export class Survey extends Component {
  static propTypes = {
    survey: PropTypes.array.isRequired,
    surveyData: PropTypes.object.isRequired,
    fetchSurveyConfig: PropTypes.func.isRequired,
    updateSurveyData: PropTypes.func.isRequired,
    submitSurvey: PropTypes.func.isRequired
  };

  static defaultProps = {
    survey: [],
    surveyData: {},
    fetchSurveyConfig: () => {},
    updateSurveyData: () => {},
    submitSurvey: () => {}
  };

  constructor(props) {
    super(props);
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSurveyConfig();
  }

  render() {
    // Dynamically creates the form fields based on the formFields property
    const { surveyConfig, surveyData } = this.props;

    if (surveyConfig.status === null) return null;
    if (surveyConfig.status === "fail") return "Fail";
    if (surveyConfig.status === "loading") return "Loading";

    const formFields = surveyConfig.data.data.publicForm.formFields;
    const fields = formFields.map(({ __typename: type, ...props }) => {
      const FormField = getFormField(type);
      return (
        <FormField
          key={props.id}
          value={surveyData[props.id]}
          onChange={this.onInputFieldChange}
          {...props}
        />
      );
    });
    return <form>{fields}</form>;
  }

  onInputFieldChange(fieldId, fieldValue) {
    this.props.updateSurveyData(fieldId, fieldValue);
  }

  onSubmitForm() {
    this.props.submitSurvey();
  }
}

function getFormField(type) {
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

export const ShortTextField = ({ onChange, value, ...rest }) => (
  <FieldTextStateless
    {...rest}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

export const LongTextField = ({ onChange, value, ...rest }) => (
  <FieldTextAreaStateless
    {...rest}
    value={value}
    onChange={e => onChange(rest.id, e.target.value)}
  />
);

function mapStateToProps(state) {
  return {
    surveyConfig: state.survey.config,
    surveyData: state.survey.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSurveyConfig: () => dispatch(actions.fetchSurveyConfig()),
    updateSurveyData: (fieldId, fieldValue) =>
      dispatch(actions.updateSurveyData(fieldId, fieldValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);

export { default as Select } from "./SelectField";
export { default as RadioGroupField } from "./RadioGroupField";
export { default as ChecklistField } from "./ChecklistField";
export { default as DateField } from "./DateField";
