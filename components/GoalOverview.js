import { PropTypes } from "prop-types";
import { Title } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

import styles from "../styles/capableStyle";
import TargetIcon from "./TargetIcon";

const GoalTargetOverview = ({ goal }) => {
  const targetList = goal.targets.map((target) => {
    const targetValue =
      target.value && !goal.hasTargetType("wellness")
        ? `${target.value} ${target.name.toLowerCase()}`
        : "";
    return targetValue ? (
      <View style={styles.cardStat} key={target.name}>
        <TargetIcon target={target} style={StyleSheet.flatten(styles.cardStatIcon)} />
        <Text style={styles.cardStatLabel}>{targetValue}</Text>
      </View>
    ) : null;
  });

  const recurrence = goal.recurrence ? (
    <View style={styles.cardStat}>
      <Icon name="clock" style={styles.cardStatIcon} />
      <Text style={styles.cardStatLabel}>{goal.recurrence}</Text>
    </View>
  ) : null;

  return (
    <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap", gap: "8px" }}>
      {targetList}
      {recurrence}
    </View>
  );
};

GoalTargetOverview.propTypes = {
  goal: PropTypes.object.isRequired,
};

const GoalOverview = ({ goal }) => (
  <View style={{ width: "100%" }}>
    <View style={styles.divider}>
      <Title style={[styles.cardTitle, styles.goalTitle]}>{goal.name}</Title>
      <GoalTargetOverview goal={goal} />
    </View>
  </View>
);

GoalOverview.propTypes = {
  goal: PropTypes.object.isRequired,
};

export default GoalOverview;
export { GoalTargetOverview };
