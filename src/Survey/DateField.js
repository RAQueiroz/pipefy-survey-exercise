import React from "react";
import { Label } from "@atlaskit/field-base";
import { DatePicker } from "@atlaskit/datetime-picker";

const DateField = ({ onChange, label, ...rest }) => (
  <div>
    <Label label={label} htmlFor={rest.id} />
    <DatePicker onChange={value => onChange(rest.id, value)} {...rest} />
  </div>
);

export default DateField;
