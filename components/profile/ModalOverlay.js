import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import { Image } from "react-native";
import { PropTypes } from "prop-types";
import React from "react";

import styles from "../../styles/capableStyle";

const ModalOverlay = ({ visible, setModalVisibility, dialogContent }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setModalVisibility(false)} style={styles.dialog}>
        <Image
          source={require("../../assets/icon-rocket.png")}
          style={{ height: 24, width: 24, marginBottom: 10, opacity: 0.5 }}
          resizeMode={"contain"}
        />
        <Dialog.Content style={styles.dialogContent}>
          <Paragraph style={{ textAlign: "center" }}>{dialogContent}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setModalVisibility(false)} mode="contained" style={{ width: 100 }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

ModalOverlay.propTypes = {
  visible: PropTypes.bool,
  setModalVisibility: PropTypes.func,
  dialogContent: PropTypes.string,
};

export default ModalOverlay;
