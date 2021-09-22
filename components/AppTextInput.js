import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PropTypes } from "prop-types";
import { View, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function AppTextInput({ leftIcon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <MaterialCommunityIcons name={leftIcon} size={20} color="#6e6869" style={styles.icon} />
      )}
      <TextInput style={styles.input} placeholderTextColor="#6e6869" {...otherProps} />
    </View>
  );
}

AppTextInput.propTypes = {
  leftIcon: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    flexDirection: "row",
    padding: 10,
    marginVertical: 4,
    borderColor: "#E2E2E6",
    borderWidth: 1,
    width: 300,
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
    marginLeft: 6,
  },
  input: {
    color: "#101010",
    fontSize: 16,
    padding: 6,
    width: 245,
  },
});
