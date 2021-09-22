import { PropTypes } from "prop-types";
import { Title } from "react-native-paper";
import { View, Image, TouchableOpacity } from "react-native";
import Logger from "js-logger";
import React, { useContext } from "react";

import { AUTH_ERRORS } from "../../constants/auth";
import { AuthContext } from "../../contexts/auth";
import { CapableAuth } from "../../capable";
import { captureError } from "../../helpers/error";
import { getAccessToken } from "../../capable";
import styles from "../../styles/capableStyle";

const AdminActions = ({ setSnackVisible }) => {
  const { setCognitoUser } = useContext(AuthContext);

  const copyToClipboard = () => {
    getAccessToken()
      .then((jwtToken) => {
        // TODO: what happens in mobile?
        navigator.clipboard.writeText(jwtToken);
        Logger.info("token copied");
        setSnackVisible(true);
      })
      .catch((e) => captureError("Failed to fetch access token: ", e));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileList}>
        <TouchableOpacity style={styles.profileNavItem} onPress={copyToClipboard}>
          <Title style={[styles.teamTitle, styles.bold]}>Copy Token</Title>
          <Image
            style={styles.arrowIcon}
            source={require("../../assets/icon-arrow.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.profileNavItem, styles.lastProfileNavItem]}
          onPress={() => {
            CapableAuth.signOut()
              .then(() => setCognitoUser({}))
              .catch((err) => captureError(AUTH_ERRORS.ERROR_SIGNING_OUT, err));
          }}
        >
          <Title style={[styles.teamTitle, styles.bold, { color: "#DA114D" }]}>Logout</Title>
          <Image
            style={styles.arrowIcon}
            source={require("../../assets/icon-arrow.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

AdminActions.propTypes = {
  setSnackVisible: PropTypes.func.isRequired,
};

export default AdminActions;
