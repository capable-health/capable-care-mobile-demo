import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

import { findOneTagByType } from "../helpers/tagging";

const TargetIcon = ({ target, style }) => {
  const iconValue = findOneTagByType(target.tag_list, "icon") || "square";
  return <Icon name={iconValue} style={[style, { color: "#000" }]} />;
};

TargetIcon.propTypes = {
  target: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default TargetIcon;
