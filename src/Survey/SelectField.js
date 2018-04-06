import React, { Component } from "react";
import { StatelessSelect } from "@atlaskit/single-select";

class SelectField extends Component {
  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);
    this._handleOpenChange = this._handleOpenChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { options, value } = nextProps;

    const parseOption = option => ({
      content: option,
      value: option,
      label: option
    });

    const items = options.map(parseOption);
    const selectedItem = items.find(item => item.value === value);

    return {
      items,
      selectedItem
    };
  }

  render() {
    return (
      <StatelessSelect
        id={this.props.id}
        label={this.props.label}
        isOpen={this.state.isOpen}
        items={[{ items: this.state.items }]}
        selectedItem={this.state.selectedItem}
        onOpenChange={this._handleOpenChange}
        onSelected={this._handleSelect}
      />
    );
  }

  _handleOpenChange({ isOpen }) {
    this.setState({
      isOpen
    });
  }

  _handleSelect(selectedItem) {
    this.setState({
      selectedItem
    });

    this.props.onChange(this.props.id, selectedItem.value);
  }
}

export default SelectField;
