import { PropTypes } from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: 300,
    backgroundColor: "#0000C7",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
