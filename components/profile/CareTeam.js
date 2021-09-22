import { Headline, Avatar, Title } from "react-native-paper";
import { PropTypes } from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

import styles from "../../styles/capableStyle";

const CareTeam = ({ showDialog }) => {
  return (
    <View style={[styles.container, styles.noBottomPadding]}>
      <View style={styles.heading}>
        <Headline style={styles.h2}>My Care Team</Headline>
      </View>

      <View style={[styles.card, styles.cardCenterItems]}>
        <Avatar.Image size={48} source={require("../../assets/profile-member-03.png")} />
        <Title style={styles.teamTitle}>Dr. Lauren Potapova</Title>
        <Image
          style={styles.videoIcon}
          source={require("../../assets/icon-offline.png")}
          resizeMode={"contain"}
        />
      </View>

      <TouchableOpacity
        style={[styles.card, styles.cardCenterItems]}
        onPress={() =>
          showDialog(
            "Tapping this camera icon may begin a video call with a member of the patient’s care team."
          )
        }
      >
        <Avatar.Image size={48} source={require("../../assets/profile-member-02.png")} />
        <Title style={[styles.teamTitle, styles.bold]}>Floyd Miles</Title>
        <Image
          style={styles.videoIcon}
          source={require("../../assets/icon-online.png")}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
    </View>
  );
};

CareTeam.propTypes = {
  showDialog: PropTypes.func.isRequired,
};

export default CareTeam;
