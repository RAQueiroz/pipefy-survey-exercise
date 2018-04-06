import React, { Component } from "react";
import { AkFieldRadioGroup } from "@atlaskit/field-radio-group";

class RadioGroupField extends Component {
  state = {
    items: []
  };

  constructor(props) {
    super(props);
    this._handleRadioChange = this._handleRadioChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const items = nextProps.options.map(option => ({
      name: option,
      value: option,
      label: option,
      isSelected: nextProps.value === option
    }));

    return {
      items
    };
  }

  render() {
    return (
      <AkFieldRadioGroup
        id={this.props.id}
        label={this.props.label}
        items={this.state.items}
        onRadioChange={this._handleRadioChange}
      />
    );
  }

  _handleRadioChange(e) {
    const selectedItem = e.target.value;
    this.props.onChange(this.props.id, selectedItem);
    this.setState({
      selectedItem
    });
  }
}

export default RadioGroupField;
