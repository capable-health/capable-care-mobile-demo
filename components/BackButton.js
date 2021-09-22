import { PropTypes } from "prop-types";
import { StyleSheet, Platform, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("../assets/icon-back.png")}
        style={styles.icon}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 24,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: "#FFF",
    zIndex: 10,
    ...Platform.select({
      web: {
        top: 24,
      },
      default: {
        top: 60,
      },
    }),
  },
  icon: {
    height: 15,
    width: 10,
  },
});
