import { PropTypes } from "prop-types";
import { Headline, Paragraph } from "react-native-paper";
import { View } from "react-native";
import React from "react";

import Gravatar from "../gravatar";
import styles from "../../styles/capableStyle";

const ProfileHeader = ({ patient }) => {
  return (
    <View style={styles.profileHeader}>
      {patient && (
        <>
          <Gravatar style={styles.profileImage} size={224} email={patient.email_strip_plus} />
          <Headline style={styles.profileName}>{patient.name ? patient.name : ""}</Headline>
          <Paragraph style={styles.memberSince}>Member Since 2021</Paragraph>
        </>
      )}
    </View>
  );
};

ProfileHeader.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default ProfileHeader;
