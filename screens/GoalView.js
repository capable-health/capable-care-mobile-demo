import { PropTypes } from "prop-types";
import { Paragraph, Button, Title } from "react-native-paper";
import { View } from "react-native";
import React from "react";

import { AppView } from "../components";
import { Goal } from "../capable";
import { GoalTargetOverview } from "../components/GoalOverview";
import BackButton from "../components/BackButton";
import ContentfulRichText from "../components/ContentfulRichText";
import Media from "../components/Media";
import ObservationRow from "../components/ObservationRow";
import styles from "../styles/capableStyle";

const assetMapping = {
  goal_header: require("../assets/goal-header.jpg"),
  goal_header_worry_time: require("../assets/goal_header_worry_time.jpeg"),
};

const GoalHeader = ({ goal, navigation }) => {
  const backupImageFile =
    goal.tag_list.includes("anxiety-plan") && goal.name.match(/worry time/i)
      ? "goal_header_worry_time"
      : "goal_header";
  const headerImageSource = goal.imageUrl ? { uri: goal.imageUrl } : assetMapping[backupImageFile];
  const headerIsVideo = /\/\/videos/.test(goal.imageUrl);
  return (
    <View style={{ position: "relative" }}>
      <BackButton onPress={navigation.goBack} />
      <Media mediaSource={headerImageSource} isVideo={headerIsVideo} />
      <View style={styles.container}>
        <Title style={styles.headline}>{goal.name}</Title>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <GoalTargetOverview goal={goal} />
        </View>
      </View>
    </View>
  );
};

GoalHeader.propTypes = {
  goal: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const GoalDescription = ({ description }) => {
  const formattedDescription =
    description.nodeType == "document" ? <ContentfulRichText doc={description} /> : description;

  return (
    <View style={{ paddingHorizontal: 24, width: "100%" }}>
      {formattedDescription && (
        <Paragraph style={styles.paragraph}>{formattedDescription}</Paragraph>
      )}
    </View>
  );
};

GoalDescription.propTypes = {
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

const ObservationsList = ({ goal }) => {
  if (goal.realObservations().length == 0) return null;

  const observationList = Object.values(goal.observationsGroupBy("observed_date")).map(
    (singleDayObservationTargets, i) => {
      const mostRecentDailyObservations = Goal.mostRecentObservationsByDay(
        singleDayObservationTargets
      );
      return (
        <View
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <View style={styles.cardStat}>
            <ObservationRow observationTargets={mostRecentDailyObservations} />
          </View>
        </View>
      );
    }
  );

  return (
    <View style={styles.container}>
      <Title style={styles.cardSubHead}>Log</Title>
      {observationList}
    </View>
  );
};

ObservationsList.propTypes = {
  goal: PropTypes.object.isRequired,
};

const AddAnObservationButton = ({ goal, navigation }) => {
  const enterAnObservation = () => {
    navigation.navigate("EnterObservation", { goal });
  };
  return (
    <View style={[styles.container, { paddingBottom: 60 }]}>
      <Button
        uppercase={false}
        onPress={enterAnObservation}
        mode="contained"
        icon="plus"
        style={{ width: "100%", paddingVertical: 12 }}
        labelStyle={{ fontWeight: "600" }}
      >
        Add Log
      </Button>
    </View>
  );
};

AddAnObservationButton.propTypes = {
  goal: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const GoalView = ({ route, navigation }) => {
  const { goal } = route.params;

  return (
    <AppView>
      <GoalHeader goal={goal} navigation={navigation} />
      <GoalDescription description={goal.description} />
      <AddAnObservationButton goal={goal} navigation={navigation} />
      <ObservationsList goal={goal} />
    </AppView>
  );
};

GoalView.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default GoalView;
