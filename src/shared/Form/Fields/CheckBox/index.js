import React from "react";
import { Checkbox } from "semantic-ui-react";

const CheckBoxComponent = ({ slider, toggle, label, radio, disabled }) => {
  return (
    <Checkbox
      slider={slider}
      toggle={toggle}
      label={label}
      radio={radio}
      disabled={disabled}
    />
  );
};

export default CheckBoxComponent;
