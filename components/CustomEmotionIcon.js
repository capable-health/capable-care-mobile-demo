import { PropTypes } from "prop-types";
import { StyleSheet, Image } from "react-native";
import React from "react";

export default function CustomIcon({ style, name }) {
  const assetMapping = {
    frown: require("../assets/feeling-frown.png"),
    meh: require("../assets/feeling-meh.png"),
    tired: require("../assets/feeling-tired.png"),
    smile: require("../assets/feeling-smile.png"),
    stars: require("../assets/feeling-stars.png"),
  };

  return <Image source={assetMapping[name]} style={[styles.icon, style]} resizeMode={"contain"} />;
}

CustomIcon.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
});
