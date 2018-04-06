import React, { Component } from "react";
import { Label } from "@atlaskit/field-base";
import { CheckboxStateless, CheckboxGroup } from "@atlaskit/checkbox";

class ChecklistField extends Component {
  state = {
    items: []
  };

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const checkedValues = nextProps.value || [];
    const items = nextProps.options.map(option => ({
      value: option,
      label: option,
      name: option,
      isChecked: checkedValues.includes(option)
    }));

    return {
      items
    };
  }

  render() {
    return (
      <div>
        <Label label={this.props.label} htmlFor={this.props.id} />
        <CheckboxGroup label={this.props.label} id={this.props.id}>
          {this.state.items.map(item => (
            <CheckboxStateless
              key={item.value}
              {...item}
              onChange={this._handleChange}
            />
          ))}
        </CheckboxGroup>
      </div>
    );
  }

  _handleChange(e) {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const items = this.state.items.map(item => {
      if (item.value === value) {
        return {
          ...item,
          isChecked
        };
      }
      return item;
    });

    this.setState({
      items
    });

    // Calls on change
    this.props.onChange(
      this.props.id,
      ChecklistField._getSelectedValues(items)
    );
  }

  static _getSelectedValues(items) {
    return items.filter(item => item.isChecked).map(item => item.value);
  }
}

export default ChecklistField;
