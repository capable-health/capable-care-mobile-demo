import { PropTypes } from "prop-types";
import { ScrollView, View } from "react-native";
import React from "react";

import styles from "../styles/capableStyle";

const AppView = ({ children }) => (
  <View style={styles.wrapper}>
    <ScrollView style={styles.lightBg}>
      <View style={styles.main}>{children}</View>
    </ScrollView>
  </View>
);

AppView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default AppView;
