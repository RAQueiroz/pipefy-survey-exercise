import React from "react";
import "./Container.css";

const Container = ({ children, ...rest }) => (
  <div {...rest} className="Container">
    {children}
  </div>
);

export default Container;
