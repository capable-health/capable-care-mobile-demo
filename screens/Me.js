import { PropTypes } from "prop-types";
import { Snackbar } from "react-native-paper";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";

import { AppView } from "../components";
import { captureError } from "../helpers/error";
import { Patient } from "../capable/Patient";
import AdminActions from "../components/profile/AdminActions";
import CareTeam from "../components/profile/CareTeam";
import Information from "../components/profile/Information";
import ModalOverlay from "../components/profile/ModalOverlay";
import ProfileHeader from "../components/profile/ProfileHeader";
import styles from "../styles/capableStyle";

const Me = ({ route }) => {
  const [snackVisible, setSnackVisible] = useState(false);
  const [isModalVisible, setModalVisibility] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const [patient, setPatient] = useState(new Patient({}));

  useEffect(() => {
    Patient.me()
      .then((patient) => {
        setPatient(patient);
      })
      .catch((e) => captureError("Failed to fetch patient: ", e));
  }, []);

  const showDialog = (copy) => {
    setModalVisibility(true);
    setDialogContent(copy);
  };

  return (
    <AppView>
      <ProfileHeader patient={patient} />
      <CareTeam showDialog={showDialog} />
      <Information showDialog={showDialog} />
      <AdminActions route={route} setSnackVisible={setSnackVisible} />
      <ModalOverlay
        visible={isModalVisible}
        setModalVisibility={setModalVisibility}
        dialogContent={dialogContent}
      />
      <Snackbar
        style={styles.snack}
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={1600}
      >
        <Text style={styles.snackText}>Token copied to clipboard!</Text>
      </Snackbar>
    </AppView>
  );
};

Me.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Me;
