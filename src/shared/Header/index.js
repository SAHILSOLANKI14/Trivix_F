import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

const HeaderComponent = ({ title, as, style, className }) => {
  return (
    <Header as={as} style={{ ...style }} className={className}>
      {title}
    </Header>
  );
};
HeaderComponent.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
};
export default HeaderComponent;
